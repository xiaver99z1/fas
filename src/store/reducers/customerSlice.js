import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { axiosInstance } from 'src/store/middleware/directus'
import api from '../../services/api';


//Initial State
const initialState = {
  data: [],
  isSuccess: false,
  isLoading: false,
  message: null,
  isUpdate: false,
  id: null,
}

export const getCustomers = createAsyncThunk(
  'customer/getCustomers', 
  async () => {
    return await api.get('/items/customer/')
    .then((res) => res.data.data)
    .catch((error) => error.message)
});


export const getCustomerById = createAsyncThunk(
  "customer/getCustomerById", 
  async ({id}) => {
    //Fetch customer by ID
    return await axiosInstance
      .get(`/items/customer/${id}`)
      .then((res) => res.data.data)
      .catch((error) => error.message)
  }
);

export const createCustomer = createAsyncThunk(
  "customer/createCustomer", 
  async (payload) => {
    return await axiosInstance
      .post(`items/customer/`, payload)
      .then((res)=>res.data.data)
      .catch((error)=>console.log( error.response.request._response))
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: {
    [getCustomers.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomers.fulfilled]: (state, { payload } ) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCustomers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [getCustomerById.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomerById.fulfilled]: (state, { payload } ) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCustomerById.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [createCustomer.pending]: (state) => {
      state.isLoading = true;
    },
    [createCustomer.fulfilled]: (state, { payload } ) => {
      state.data = [payload];
      state.isSuccess = true;
    },
    [createCustomer.rejected]: (state, { payload } ) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
  }
})

export default customerSlice.reducer;

export const selectCustomers = (state) => state.customer;