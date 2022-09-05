import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const SignUp = createAsyncThunk(
    'user/sign_up',
    async (values, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.post('/users', values)
            const id = response.data.data.id
            const { role, status } = values
            const payload = {
                userid:id,
                company_id: "1",
                department: "Operation",
                app_module: "UAT",
                task_description: "1",
                user_role: null,
                user_role_id: role,
                status,
                user_activity_id: "1",
                created_by: "MW",
                updated_by: "MW",
                date_created: new Date().toISOString(),
                date_updated: new Date().toISOString()
            }
            if(response.data.data){
                dispatch(RegisterUserProfile(payload))
            }
            return response.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const SignIn = createAsyncThunk(
    'user/sign_in',
    async (payload, { rejectWithValue, _ }) => {
        const { email:emailParams } = payload
        const emailURI = encodeURIComponent(emailParams)
        try {
            const responseAuth = await api.post('/auth/login', payload)
            const responseMe = await api.get(`/users?filter[email][_eq]=${emailURI}`)
            const { id, first_name, last_name, email, role, status, last_access, email_notifications } = responseMe.data.data[0];
            const { access_token, refresh_token } = responseAuth.data.data;
            const res = {
                id, 
                first_name, 
                last_name, 
                email, 
                role,
                status, 
                last_access, 
                email_notifications,
                access_token,
                refresh_token
            }
            return res;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)


export const getVendorPrices = createAsyncThunk(
   'vendorprice/getVendorPrices', 
   async () => {
   try {
       const response = await api.get(`/items/vendor_price/`)
       return response.data.data;
   } catch (err) {
     if (!err.response) {
       throw err
     }
     console.error(err.response.data);
     console.error(err.response.status);
     console.error(err.response.headers);
   }
 });
 
 export const createVendorPrice = createAsyncThunk(
   'vendorprice/createVendorPrice', 
   async (initialPost) => {
   try {
       const response = await api.post(`/items/vendor_price/`, initialPost)
       return response.data.data
   } catch (err) {
       console.error(err.response.data);
       console.error(err.response.status);
       console.error(err.response.headers);
       return err.response.data;
   }
 });
 
 export const updateVendorPrice = createAsyncThunk(
   'vendorprice/updateVendorPrice', 
   async (initialPost) => {
   const { vendor_id } = initialPost;
   try {
       const response = await api.patch(`/items/vendor_price/${vendor_id}`, initialPost)
       console.log('update vendor: ' + response.data.data)
       if (response?.status === 200) return initialPost;
         return `${response?.status}: ${response?.statusText}`;
   } catch (err) {
       console.error("Error response:");
       console.error(err.response.data); 
       console.error(err.response.status);
       console.error(err.response.headers);
       return err.response.data;
       //return initialPost; // only for testing Redux!
   }
 });
 
 export const deleteVendorPrice = createAsyncThunk(
   'vendorprice/deleteVendorPrice', 
   async (initialPost) => {
   const { id } = initialPost;
   try {
       const response = await api.delete(`/items/vendor_price/${id}`)
       if (response?.status === 200) return initialPost;
       return `${response?.status}: ${response?.statusText}`;
   } catch (err) {
       return err.message;
   }
 });
 
 
 //Initial State
 const initialState = {
   prices:[],
   vendors: [],
   products: [],
   status: 'idle',
   error: null,
 }

export const vendorpriceSlice = createSlice({
  name: "vendorprice",
  initialState,
  reducers: {},
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getVendorPrices.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getVendorPrices.fulfilled, (state, action) => {
        state.status = 'success';
        state.prices = action.payload;
    });
    builder.addCase(getVendorPrices.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createVendorPrice.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createVendorPrice.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(createVendorPrice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updateVendorPrice.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateVendorPrice.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.vendor_price_id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const vendorprices = state.data.filter(post => post.vendor_price_id !== id);
        state.data = [...vendorprices, action.payload];
    });
    builder.addCase(updateVendorPrice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deleteVendorPrice.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteVendorPrice.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.vendor_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const vendors = state.posts.filter(post => post.vendor_id !== id);
      state.data = vendors;
    });
    builder.addCase(deleteVendorPrice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});


export const selectVendorPrices = (state) => state.vendorprice;
export const selectVendorPriceId = (state, id) => state.vendorprice.prices.find(post => post.vendor_price_id === id);

export default vendorpriceSlice.reducer;