import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

/*
export const getVendors = createAsyncThunk(
  'vendor/getVendors', 
  async () => {
    return await axiosInstance
      .get(`/items/vendor/`)
      .then((res) => res.data.data)
      .catch((error) => error.response.request._response)
  }
);

export const createVendor = createAsyncThunk(
  "vendor/createVendor", 
  async ({ updatedData, navigate }) => {
    return await axiosInstance
      .post(`/items/vendor/`, updatedData)
      .then((res) =>  res.data.data)
      .then(navigate('/vendors'))
      .catch((error) => error.response.request._response)
  }
);

export const updateVendor = createAsyncThunk(
  "vendor/updateVendor", 
  async (id, updatedData) => {
    return await axiosInstance
      .patch(`/items/vendor/${id}`, updatedData)
      .then((res) =>res.data.data)
      .catch((error) => error.response.request._response)
  }
);
*/

export const getVendors = createAsyncThunk('vendor/getVendors', async () => {
  try {
      const response = await axiosInstance.get(`items/vendor/`)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
})

export const createVendor = createAsyncThunk('vendor/createVendor', async (initialPost) => {
  try {
      const response = await axiosInstance.post(`items/vendor/`, initialPost)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const updateVendor = createAsyncThunk('vendor/updateVendor', async (initialPost) => {
  const { vendor_id } = initialPost;
  try {
      const response = await axiosInstance.patch(`/items/vendor/${vendor_id}`, initialPost)
      console.log(response.data.data)
      if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;

      
        
  } catch (err) {
      //return err.response.data;
      console.error("Error response:");
      console.error(err.response.data);    // ***
      console.error(err.response.status);  // ***
      console.error(err.response.headers); // ***
      return initialPost; // only for testing Redux!
  }
});


export const deletePost = createAsyncThunk('vendor/deleteVendor', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axiosInstance.delete(`/items/vendor//${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})

export const deleteVendor = createAsyncThunk(
  "vendor/deleteVendor",
  async ({ id }) => {
    return await axiosInstance
    .delete(`/items/vendor/${id}`, updatedData)
    .then((res) =>  res.data.data)
    .then(navigate('/vendors'))
    .catch((error) => error.response.request._response)
  }
);

//Initial State
const initialState = {
  vendors: [],
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    updateRecord: (state, action) => {
      state.vendors.map((vendor, index) => {
        if (vendor.vendor_id === action.payload.index) {
          vendor.vendor_name = action.payload.vendor_name;
          state.vendors
        }
      })
    }

  },
  extraReducers: {
    [createVendor.pending]: (state) => {
      state.status = 'loading';
    },
    [createVendor.fulfilled]: (state, action) => {
      state.vendors = [action.payload];
      state.status = 'success';
    },
    [createVendor.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [updateVendor.pending]: (state) => {
      state.status = 'loading';
    },
    [updateVendor.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.id) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      action.payload.date = new Date().toISOString();
      const vendors = state.vendors.filter(post => post.vendor_id !== id);
      state.vendors = [...vendors, action.payload];
      
    },
    [updateVendor.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getVendors.pending]: (state) => {
      state.status = 'loading';
    },
    [getVendors.fulfilled]: (state, action) => {
      state.status = 'success';
      state.vendors = action.payload;
    },
    [getVendors.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [deleteVendor.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteVendor.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.vendor_id) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const vendors = state.posts.filter(post => post.id !== id);
      state.vendors = vendors;
    },
    [deleteVendor.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})


export const {updateRecord} = vendorSlice.actions;

export default vendorSlice.reducer;


export const selectAllVendors = (state) => state.vendor.vendors;
export const vendorStatus = (state) => state.vendor.status;
export const vendorError = (state) => state.vendor.error;
export const selectVendorById = (state, id) => state.vendor.vendors.find(post => post.vendor_id === id);

/*export const selectVendorById = (state, id) => {
  if (Array.isArray(state.vendor.vendors)) {
    const r3 = state.vendor.vendors.find(post => post.vendor_id === id);
    console.log(r3);
    return r3;
  } else {
    console.log('arr is not an array', state.vendor.vendors);
  }
}*/
