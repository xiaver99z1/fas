import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

export const getCountries = createAsyncThunk('countries/getCountries', async () => {
  try {
      const response = await axiosInstance.get(`items/country/`)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
})

export const createCountry = createAsyncThunk('countries/createCountry', async (initialPost) => {
  try {
      const response = await axiosInstance.post(`items/country/`, initialPost)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const updateCountry = createAsyncThunk('countries/updateCountry', async (initialPost) => {
  const { country_abbr } = initialPost;
  try {
      const response = await axiosInstance.patch(`/items/country/${country_abbr}`, initialPost)
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


export const deleteCountry = createAsyncThunk('countries/deleteCountry', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axiosInstance.delete(`items/country//${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})

//Initial State
const initialState = {
  countries: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: {
    [createCountry.pending]: (state) => {
      state.status = 'loading';
    },
    [createCountry.fulfilled]: (state, action) => {
      state.status = 'success';
      state.countries = [action.payload];
    },
    [createCountry.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [updateCountry.pending]: (state) => {
      state.status = 'loading';
    },
    [updateCountry.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.country_abbr) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      action.payload.date_updated = new Date().toISOString();
      const countries = state.countries.filter(post => post.country_abbr !== id);
      state.countries = [...countries, action.payload];
      
    },
    [updateCountry.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getCountries.pending]: (state) => {
      state.status = 'loading';
    },
    [getCountries.fulfilled]: (state, action) => {
      state.status = 'success';
      state.countries = action.payload;
    },
    [getCountries.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [deleteCountry.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteCountry.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.country_abbr) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const country = state.posts.filter(post => post.country_abbr !== id);
      state.countries = country;
    },
    [deleteCountry.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})

export default countrySlice.reducer;

export const selectAllCountries = (state) => state.countries.countries;
export const selectCurrencyByCode = (state, code) => state.currency.currencies.find(post => post.currency_code === code);
