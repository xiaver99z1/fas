import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

export const getPaymentTerms = createAsyncThunk('paymentterm/getPaymentTerms', async () => {
  try {
      const response = await axiosInstance.get(`items/payment_terms/`)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
})

export const createPaymentTerm = createAsyncThunk('paymentterm/createPaymentTerm', async (initialPost) => {
  try {
      const response = await axiosInstance.post(`items/payment_terms/`, initialPost)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const updatePaymentTerm = createAsyncThunk('paymentterm/updatePaymentTerm', async (initialPost) => {
  const { payment_terms } = initialPost;
  try {
      const response = await axiosInstance.patch(`/items/paymentterm/${payment_terms}`, initialPost)
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


export const deletePaymentTerm = createAsyncThunk('paymentterm/deletePaymentTerm', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axiosInstance.delete(`items/paymentterm//${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})

//Initial State
const initialState = {
  paymentterms: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const paymenttermSlice = createSlice({
  name: 'paymentterm',
  initialState,
  reducers: {},
  extraReducers: {
    [createPaymentTerm.pending]: (state) => {
      state.status = 'loading';
    },
    [createPaymentTerm.fulfilled]: (state, action) => {
      state.status = 'success';
      state.paymentterms = [action.payload];
    },
    [createPaymentTerm.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [updatePaymentTerm.pending]: (state) => {
      state.status = 'loading';
    },
    [updatePaymentTerm.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.payment_terms) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      action.payload.date_updated = new Date().toISOString();
      const paymentterms = state.paymentterms.filter(post => post.payment_terms !== id);
      state.paymentterms = [...paymentterms, action.payload];
      
    },
    [updatePaymentTerm.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getPaymentTerms.pending]: (state) => {
      state.status = 'loading';
    },
    [getPaymentTerms.fulfilled]: (state, action) => {
      state.status = 'success';
      state.paymentterms = action.payload;
    },
    [getPaymentTerms.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [deletePaymentTerm.pending]: (state) => {
      state.status = 'loading';
    },
    [deletePaymentTerm.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.payment_term) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const paymentterm = state.posts.filter(post => post.payment_terms !== id);
      state.paymentterms = paymentterm;
    },
    [deletePaymentTerm.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})

export default paymenttermSlice.reducer;

export const selectAllPaymentTerm = (state) => state.paymentterm.paymentterms;
export const selectAllPaymentTermByCode = (state, code) => state.paymentterm.paymentterms.find(post => post.payment_term === code);
