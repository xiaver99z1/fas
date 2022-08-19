import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

export const getPaymentModes = createAsyncThunk('paymentmode/getPaymentModes', async () => {
  try {
      const response = await axiosInstance.get(`items/payment_mode/`)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
})

export const createPaymentMode = createAsyncThunk('paymentmode/createPaymentMode', async (initialPost) => {
  try {
      const response = await axiosInstance.post(`items/payment_mode/`, initialPost)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const updatePaymentMode = createAsyncThunk('paymentmode/updatePaymentMode', async (initialPost) => {
  const { payment_mode } = initialPost;
  try {
      const response = await axiosInstance.patch(`/items/paymentmode/${payment_mode}`, initialPost)
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


export const deletePaymentMode = createAsyncThunk('paymentmode/deletePaymentMode', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axiosInstance.delete(`items/paymentmode//${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})

//Initial State
const initialState = {
  paymentmodes: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const paymentmodeSlice = createSlice({
  name: 'paymentmode',
  initialState,
  reducers: {},
  extraReducers: {
    [createPaymentMode.pending]: (state) => {
      state.status = 'loading';
    },
    [createPaymentMode.fulfilled]: (state, action) => {
      state.status = 'success';
      state.paymentmodes = [action.payload];
    },
    [createPaymentMode.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [updatePaymentMode.pending]: (state) => {
      state.status = 'loading';
    },
    [updatePaymentMode.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.posting_group_type) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      action.payload.date_updated = new Date().toISOString();
      const paymentmodes = state.paymentmodes.filter(post => post.payment_mode !== id);
      state.paymentmodes = [...paymentmodes, action.payload];
      
    },
    [updatePaymentMode.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getPaymentModes.pending]: (state) => {
      state.status = 'loading';
    },
    [getPaymentModes.fulfilled]: (state, action) => {
      state.status = 'success';
      state.paymentmodes = action.payload;
    },
    [getPaymentModes.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [deletePaymentMode.pending]: (state) => {
      state.status = 'loading';
    },
    [deletePaymentMode.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.payment_mode) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const paymentmode = state.posts.filter(post => post.payment_mode !== id);
      state.paymentmodes = paymentmode;
    },
    [deletePaymentMode.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})

export default paymentmodeSlice.reducer;

export const selectAllPaymentMode = (state) => state.paymentmode.paymentmodes;
export const selectPaymentMode = (state, code) => state.paymentmode.paymentmodes.find(post => post.payment_mode === code);
