import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'src/store/middleware/directus';

export const getPostingGroups = createAsyncThunk('postinggroup/getPostingGroups', async () => {
  try {
      const response = await axiosInstance.get(`items/payment_terms/`)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
})

export const createPostingGroup = createAsyncThunk('postinggroup/createPostingGroup', async (initialPost) => {
  try {
      const response = await axiosInstance.post(`items/payment_terms/`, initialPost)
      return response.data.data
  } catch (err) {
      //err.response.data;
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
  }
});

export const updatePostingGroup = createAsyncThunk('postinggroup/updatePostingGroup', async (initialPost) => {
  const { posting_group_type } = initialPost;
  try {
      const response = await axiosInstance.patch(`/items/postinggroup/${posting_group_type}`, initialPost)
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


export const deletePostingGroup = createAsyncThunk('postinggroup/deletePostingGroup', async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await axiosInstance.delete(`items/postinggroup//${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
})

//Initial State
const initialState = {
  postinggroups: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

const postinggroupSlice = createSlice({
  name: 'postinggroup',
  initialState,
  reducers: {},
  extraReducers: {
    [createPostingGroup.pending]: (state) => {
      state.status = 'loading';
    },
    [createPostingGroup.fulfilled]: (state, action) => {
      state.status = 'success';
      state.postinggroups = [action.payload];
    },
    [createPostingGroup.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [updatePostingGroup.pending]: (state) => {
      state.status = 'loading';
    },
    [updatePostingGroup.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.posting_group_type) {
        console.log('Update could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      action.payload.date_updated = new Date().toISOString();
      const postinggroups = state.postinggroups.filter(post => post.posting_group_type !== id);
      state.postinggroups = [...postinggroups, action.payload];
      
    },
    [updatePostingGroup.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [getPostingGroups.pending]: (state) => {
      state.status = 'loading';
    },
    [getPostingGroups.fulfilled]: (state, action) => {
      state.status = 'success';
      state.postinggroups = action.payload;
    },
    [getPostingGroups.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
    [deletePostingGroup.pending]: (state) => {
      state.status = 'loading';
    },
    [deletePostingGroup.fulfilled]: (state, action) => {
      state.status = 'success';
      if (!action.payload?.posting_group_type) {
        console.log('Delete could not complete')
        console.log(action.payload)
        return;
      }
      const { id } = action.payload;
      const postinggroups = state.posts.filter(post => post.posting_group_type !== id);
      state.postinggroups = postinggroups;
    },
    [deletePostingGroup.rejected]: (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    },
  }
})

export default postinggroupSlice.reducer;

export const selectAllPostingGroup = (state) => state.postinggroup.postinggroups;
export const selectAllPostingGroupByCode = (state, code) => state.postinggroup.postinggroups.find(post => post.posting_group_type === code);
