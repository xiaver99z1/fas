import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

//Methods for Entities
const userAdapter = createEntityAdapter();

//Initial State
const initialState = {
  data: [],
  isSuccess: false,
  isLoading: false,
  message: null,
  isUpdate: false,
  id: null,
}

export const getUsers = createAsyncThunk(
  'user/getUsers', 
  async () => {
    return await axiosInstance.get('/users/')
    .then((res) => res.data.data)
    .catch((error)=>console.log(error.response.request._response))
});


export const getUserById = createAsyncThunk(
  "user/getUserById", 
  async ({id}) => {
    //Fetch user by ID
    return await axiosInstance
      .get(`/users/${id}`)
      .then((res) => res.data.data)
      .catch((error) => error.message)
  }
);

export const createUser = createAsyncThunk(
  "user/createUser", 
  async (payload) => {
    return await axiosInstance
      .post(`/users`, payload)
      .then((res)=>res.data.data)
      .catch((error)=>console.log(error.response.request._response))
  }
);

/*
export const updateCompanyById = createAsyncThunk(
  "user/updateCompanyById", 
  async ({id}, {payload}) => {
    //Fetch all customers
    return await axiosInstance
      .put(`/items/user/${id}`, {payload})
      .then((res) => res.data.data)
      .catch((error) => error.message)
  }
);
*/

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, { payload } ) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [getUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled]: (state, { payload } ) => {
      state.isLoading = true;
      state.data = payload;
      state.isSuccess = true;
    },
    [getUserById.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
    [createUser.pending]: (state) => {
      state.isLoading = true;
    },
    [createUser.fulfilled]: (state, { payload } ) => {
      state.data = [payload];
      state.isSuccess = true;
    },
    [createUser.rejected]: (state, { payload } ) => {
      state.isLoading = false;
      state.message = payload;
      state.isSuccess = false;
    },
  }
})

export default userSlice.reducer;

export const selectAllUsers = (state) => state.user.data
export const getUserStatus = (state) => state.user.isSuccess
export const getUserError = (state) => state.user.message