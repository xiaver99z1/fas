import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

//Methods for Entities
const companyAdapter = createEntityAdapter();

//Initial State
const initialState = {
  data: [],
  isSuccess: false,
  isLoading: false,
  message: null,
  isUpdate: false,
  id: null,
}

export const getCompanies = createAsyncThunk(
  'company/getCompanies', 
  async () => {
    return await axiosInstance.get('/items/company/')
    .then((res) => res.data.data)
    .catch((error) => error.message)
});


export const getCompanyById = createAsyncThunk(
  "company/getCompanyById", 
  async ({id}) => {
    //Fetch company by ID
    return await axiosInstance
      .get(`/items/company/${id}`)
      .then((res) => res.data.data)
      .catch((error) => error.message)
  }
);

export const createCompany = createAsyncThunk(
  "company/createCompany", 
  async (payload) => {
    return await axiosInstance
      .post(`items/company/`, payload)
      .then((res)=>res.data.data)
      .catch((error)=>console.log( error.response.request._response))
  }
);

/*
export const updateCompanyById = createAsyncThunk(
  "company/updateCompanyById", 
  async ({id}, {payload}) => {
    //Fetch all customers
    return await axiosInstance
      .put(`/items/company/${id}`, {payload})
      .then((res) => res.data.data)
      .catch((error) => error.message)
  }
);
*/

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: {
    [getCompanies.pending]: (state) => {
      state.isLoading = true;
    },
    [getCompanies.fulfilled]: (state, { payload } ) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCompanies.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [getCompanyById.pending]: (state) => {
      state.isLoading = true;
    },
    [getCompanyById.fulfilled]: (state, { payload } ) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCompanyById.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [createCompany.pending]: (state) => {
      state.isLoading = true;
    },
    [createCompany.fulfilled]: (state, { payload } ) => {
      state.data = [payload];
      state.isSuccess = true;
    },
    [createCompany.rejected]: (state, { payload } ) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
  }
})

export const { addCompany, updateCompany, postUpdated } = companySlice.actions
export default companySlice.reducer;

export const selectAllCompanies = (state) => state.company.data
export const getCompanyStatus = (state) => state.company.isSuccess
export const getCompanyError = (state) => state.company.message