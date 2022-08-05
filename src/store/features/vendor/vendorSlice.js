import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';


//Methods for Entities
const vendorAdapter = createEntityAdapter();

//Initial State
const initialState = {
  //data: {},
  data: [],
  vendorsByCompanyId: [],
  currentCompanyId: 1,
  message: "",
  isLoading: false,
  isSuccess: false,
}

export const createVendor = createAsyncThunk(
  "vendor/createVendor", 
  async ({ updatedData, navigate }) => {
    return await axiosInstance
      .post(`items/vendor/`, updatedData)
      .then((res) =>  res.data.data)
      .then(navigate('/vendors'))
      .catch((error) => error.response.request._response)
  }
);

export const updateVendor = createAsyncThunk(
  "vendor/updateVendor", 
  async ({ id, updatedData, navigate }) => {
    return await axiosInstance
      .patch(`items/vendor/${id}`, updatedData)
      .then((res) =>  res.data.data)
      .then(navigate('/vendors'))
      .catch((error) => error.response.request._response)
  }
);

export const deleteVendor = createAsyncThunk(
  "vendor/deleteVendor",
  async ({ id }) => {
    return await axiosInstance
    .delete(`items/vendor/${id}`, updatedData)
    .then((res) =>  res.data.data)
    .then(navigate('/vendors'))
    .catch((error) => error.response.request._response)
  }
);

export const getVendors = createAsyncThunk(
  'vendor/getVendors', 
  async () => {
    return await axiosInstance
      .get(`/items/vendor/`)
      .then((res) => res.data.data)
      .catch((error) => error.response.request._response)
  }
);

export const getVendorById = createAsyncThunk(
  "vendor/getVendorById", 
  async ({id}) => {
    //Fetch vendor by ID
    return await axiosInstance
      .get(`/items/vendor/${id}`)
      .then((res) => res.data.data)
      .catch((error)=>console.log(error.response.request._response))
  }
);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {},
  extraReducers: {
    [createVendor.pending]: (state) => {
      state.isLoading = true;
    },
    [createVendor.fulfilled]: (state, payload) => {
      state.data = payload;
      state.isSuccess = true;
    },
    [createVendor.rejected]: (state, payload) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.message = payload;
    },
    [updateVendor.pending]: (state, payload) => {
      state.loading = true;
    },
    [updateVendor.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.data = state.data.map((item) =>
          item.vendor_id === id ? payload : item
        );
      }
    },
    [updateVendor.rejected]: (state, payload) => {
      state.isLoading = false;
      state.message = payload;
    },
    [getVendors.pending]: (state) => {
      state.isLoading = true;
    },
    [getVendors.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getVendors.rejected]: (state, payload) => {
      state.isLoading = false;
      state.message = payload;
    },
    [getVendorById.pending]: (state) => {
      state.isLoading = true;
    },
    [getVendorById.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    },
    [getVendorById.rejected]: (state, payload) => {
      state.isLoading = false;
      state.message = payload;
    },
    [deleteVendor.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteVendor.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
       // state.vendorsByCompanyId = state.vendorsByCompanyId.filter((item) => item._id !== id);
        state.data = state.data.filter((item) => item._id !== id);
      }
    },
    [deleteVendor.rejected]: (state, payload) => {
      state.isLoading = false;
      state.message = payload;
    },
  }
})


export default vendorSlice.reducer;

/*
export const selectAllVendors = (state) => state.vendor.data
export const getVendorStatus = (state) => state.vendor.isSuccess
export const getVendorError = (state) => state.vendor.message
*/