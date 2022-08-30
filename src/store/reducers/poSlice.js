import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getPo = createAsyncThunk(
  'po/getPo', 
  async () => {
  try {
      const response = await api.get(`/items/po_header/`)
      return response.data.data;
  } catch (err) {
    if (!err.response) {
      throw err
    }
    console.error(err.response.data);
    console.error(err.response.status);
    console.error(err.response.headers);
  }
});

export const createPo = createAsyncThunk(
  'po/createPo', 
  async (initialPost) => {
  try {
      const response = await api.post(`/items/po_header/`, initialPost)
      return response.data.data
  } catch (err) {
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
  }
});

export const updatePo = createAsyncThunk(
  'po/updatePo', 
  async (initialPost) => {
  const { po_header_id } = initialPost;
  try {
      const response = await api.patch(`/items/po_header/${po_header_id}`, initialPost)
      console.log('update po: ' + response.data.data)
      if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      console.error("Error response:");
      console.error(err.response.data); 
      console.error(err.response.status);
      console.error(err.response.headers);
      return err.response.data;
      //return initialPost; // only for testing Redux!
  }
});

export const deletePo = createAsyncThunk(
  'po/deletePo', 
  async (initialPost) => {
  const { id } = initialPost;
  try {
      const response = await api.delete(`/items/po_header/${id}`)
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


//Initial State
const initialState = {
  data: [],
  status: 'idle', //'idle' | 'loading' | 'success' | 'failed'
  error: null,
}

export const poSlice = createSlice({
  name: "po",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* GET */
    builder.addCase(getPo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPo.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
    });
    builder.addCase(getPo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload
    });

    /* CREATE */
    builder.addCase(createPo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createPo.fulfilled, (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    });
    builder.addCase(createPo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* UPDATE */
    builder.addCase(updatePo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePo.fulfilled, (state, action) => {
        state.status = 'success';
        if (!action.payload?.po_number) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date_updated = new Date().toISOString();
        const pos = state.data.filter(post => post.po_header_id !== id);
        state.data = [...pos, action.payload];
    });
    builder.addCase(updatePo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });

    /* DELETE */
    builder.addCase(deletePo.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deletePo.fulfilled, (state, action) => {
      state.status = 'success';
      if (!action.payload?.po_header_id) {
        console.log('Delete could not complete')
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const pos = state.posts.filter(post => post.po_header_id !== id);
      state.data = pos;
    });
    builder.addCase(deletePo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const selectPos = (state) => state.po;
export const selectPoId = (state, id) => state.po.data.find(post => post.po_number === id);


export default poSlice.reducer;