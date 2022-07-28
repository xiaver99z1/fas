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
  async ({ updatedData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("items/vendor/", updatedData);
      //toast.success("Added Successfully");
      navigate("/vendor");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.request._response);
    }
  }
);

export const updateVendor = createAsyncThunk(
  "vendor/updateVendor", 
  async ({ id, updatedData, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`items/vendor/${id}`, updatedData);
      //toast.success("Tour Updated Successfully");
      navigate("/dashboard");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.request._response);
    }
  }
);

export const getVendorsByCompanyId = createAsyncThunk(
  "vendor/getVendorsByCompanyId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`items/vendor/${id}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.request._response);
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "vendor/deleteVendor",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`items/vendor/${id}`);
      //toast.success("Vendor Deleted Successfully");
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.request._response);
    }
  }
);

export const getVendors = createAsyncThunk(
  'vendor/getVendors', 
  async () => {
    return await axiosInstance.get('/items/vendor/')
    .then((res) => res.data.data)
    .catch((error) => error.message)
  }
);

export const getVendorById = createAsyncThunk(
  "vendor/getVendorById", 
  async (id) => {
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
      state.data = [payload];
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
    [updateVendor.fulfilled]: (state, payload) => {
      state.isLoading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateVendor.rejected]: (state, payload) => {
      state.isLoading = false;
      state.message = payload;
    },
    [getVendorsByCompanyId.pending]: (state) => {
      state.isLoading = true;
    },
    [getVendorsByCompanyId.fulfilled]: (state, payload) => {
      state.isLoading = false;
      state.vendorsByCompanyId = [payload];
    },
    [getVendorsByCompanyId.rejected]: (state, payload) => {
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
        state.vendorsByCompanyId = state.vendorsByCompanyId.filter((item) => item._id !== id);
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