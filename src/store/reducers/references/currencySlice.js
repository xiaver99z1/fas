import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

export const getCurrencies = createAsyncThunk('currency/getCurrencies', async () => {
  try {
      const response = await axiosInstance.get(`items/currency/`)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
})

export const createCurrency = createAsyncThunk('currency/createCurrency', async (initialPost) => {
  try {
      const response = await axiosInstance.post(`items/currency/`, initialPost)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const updateCurrency = createAsyncThunk('currency/updateCurrency', async (initialPost) => {
  const { currency_code } = initialPost;
  try {
      const response = await axiosInstance.patch(`/items/currency/${currency_code}`, initialPost)
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


export const deleteCurrency = createAsyncThunk('currency/deleteCurrency', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axiosInstance.delete(`items/currency//${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})

//Initial State
const initialState = {
  currencies: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: {
    [createCurrency.pending]: (state) => {
      state.status = 'loading';
    },
    [createCurrency.fulfilled]: (state, action) => {
      state.status = 'success';
      state.currencies = [action.payload];
    },
    [createCurrency.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [updateCurrency.pending]: (state) => {
      state.status = 'loading';
    },
    [updateCurrency.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.currency_code) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      action.payload.date_updated = new Date().toISOString();
      const currencies = state.currencies.filter(post => post.currency_code !== id);
      state.currencies = [...currencies, action.payload];
      
    },
    [updateCurrency.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getCurrencies.pending]: (state) => {
      state.status = 'loading';
    },
    [getCurrencies.fulfilled]: (state, action) => {
      state.status = 'success';
      state.currencies = action.payload;
    },
    [getCurrencies.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [deleteCurrency.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteCurrency.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.currency_code) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const currency = state.posts.filter(post => post.currency_code !== id);
      state.currencies = currency;
    },
    [deleteCurrency.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})

export default currencySlice.reducer;

export const selectAllCurrency = (state) => state.currency.currencies;
export const selectCurrencyByCode = (state, code) => state.currency.currencies.find(post => post.currency_code === code);
