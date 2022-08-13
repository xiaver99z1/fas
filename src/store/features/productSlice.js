import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

//Methods for Entities
const productAdapter = createEntityAdapter();

//Initial State
const initialState = {
  data: [],
  isSuccess: false,
  isLoading: false,
  message: null,
  isUpdate: false,
  id: null,
}

export const getProducts = createAsyncThunk(
  'product/getProducts', 
  async () => {
    return await axiosInstance.get('/items/product/')
    .then((res) => res.data.data)
    .catch((error)=>console.log( error.response.request._response))
});


export const getProductById = createAsyncThunk(
  "product/getProductById", 
  async ({id}) => {
    //Fetch product by ID
    return await axiosInstance
      .get(`/items/product/${id}`)
      .then((res) => res.data.data)
      .catch((error)=>console.log( error.response.request._response))
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct", 
  async (payload) => {
    return await axiosInstance
      .post(`items/product/`, payload)
      .then((res)=>res.data.data)
      .catch((error)=>console.log( error.response.request._response))
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct", 
  async (payload) => {
    return await axiosInstance
      .post(`items/product/`, payload)
      .then((res)=>res.data.data)
      .catch((error)=>console.log( error.response.request._response))
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, { payload } ) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [getProductById.pending]: (state) => {
      state.isLoading = true;
    },
    [getProductById.fulfilled]: (state, { payload }) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getProductById.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [createProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.data = [payload];
      state.isSuccess = true;
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.data = [payload];
      state.isSuccess = true;
    },
    [updateProduct.rejected]: (state, { payload } ) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
  }
})

export default productSlice.reducer;

export const selectAllProducts = (state) => state.product.data
export const getProductStatus = (state) => state.product.isSuccess
export const getProductError = (state) => state.product.message