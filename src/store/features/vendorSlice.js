import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

export const getVendors = createAsyncThunk(
  'vendor/getVendors', 
  async (id, {arg}) => {
    return await axiosInstance
      .get(`/items/vendor/${id}`, { arg })
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
  async (id, { updatedData }) => {
    return await axiosInstance
      .patch(`/items/vendor/${id}`, {updatedData})
      .then((res) =>res.data.data)
      .catch((error) => error.response.request._response)
  }
);

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
  reducers: {},
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
      state.vendors.map((v) => {
        if(v.vendor_id === action.payload.vendor_id) {
          
        }
      })

      //const { arg: id } = action.meta;     
      //if (id === state.vendors.filter((v) => v.vendor_id !== id)) {
        //state.vendors = action.payload;
      //}

      /*
      if(!action.payload?.vendor_id) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { vendor_id } = action.payload;
      
      const updatedvendors = state.vendors.filter((v) => v.vendor_id !== vendor_id);
      state.vendors = [...updatedvendors, action.payload];
      */
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
      const { arg: id } = action.meta;
      if (id) {
        //state.vendorsByCompanyId = state.vendorsByCompanyId.filter((item) => item._id !== id);
        state.vendors = state.vendors.filter((item) => item._id !== id);
      }
    },
    [deleteVendor.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})


export default vendorSlice.reducer;


export const selectAllVendors = (state) => state.vendor.vendors;
export const vendorStatus = (state) => state.vendor.status;
export const vendorError = (state) => state.vendor.error;
export const selectVendorById = (state, id) => state.vendor.vendors.find(post => post.vendor_id === id);