import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

export const getProducts = createAsyncThunk(
  'product/getProducts', 
  async () => {
  try {
      const response = await axiosInstance.get(`items/product/`)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const getProductId = createAsyncThunk(
  'product/getProductId', 
  async (initialPost, { rejectWithValue, _ }) => {
  const { product_id } = initialPost;
  try {
      const response = await axiosInstance.get(`items/product/${product_id}`, initialPost)
      return response.data.data
  } catch (err) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
      //console.error(err.response.data);
      //console.error(err.response.status);
      //console.error(err.response.headers);
  }
});

export const createProduct = createAsyncThunk(
  'product/createProduct', 
  async (initialPost) => {
  try {
      const response = await axiosInstance.post(`items/product/`, initialPost)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const updateProduct = createAsyncThunk(
  'product/updateProduct', 
  async (initialPost) => {
  const { product_id } = initialPost;
  try {
      const response = await axiosInstance.patch(`/items/product/${product_id}`, initialPost)
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


export const deleteProduct = createAsyncThunk(
  'product/deleteProduct', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axiosInstance.delete(`/items/vendor//${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})

//Initial State
const initialState = {
  products: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.status = 'loading';
    },
    [createProduct.fulfilled]: (state, action) => {
      state.status = 'success';
      state.products = [action.payload];
    },
    [createProduct.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [updateProduct.pending]: (state) => {
      state.status = 'loading';
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.product_id) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      action.payload.date_updated = new Date().toISOString();
      const products = state.products.filter(post => post.product_id !== id);
      state.products = [...products, action.payload];
      
    },
    [updateProduct.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getProductId.pending]: (state) => {
      state.status = 'loading';
    },
    [getProductId.fulfilled]: (state, action) => {
      state.status = 'success';
      state.products = action.payload;
    },
    [getProductId.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getProducts.pending]: (state) => {
      state.status = 'loading';
    },
    [getProducts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [deleteProduct.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.product_id) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const products = state.posts.filter(post => post.product_id !== id);
      state.products = products;
    },
    [deleteProduct.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})


export default productSlice.reducer;

export const selectProducts = (state) => state.product.products;
export const selectProductId = (state, id) => state.product.products.find(post => post.product_id === id);