import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const InitialState = {
  signing_up: false,
  signup:[],
  errors_sign_up:undefined,
  success_sign_up:false,

  signing_in: false,
  signin:[],
  errors_sign_in:undefined,
  success_sign_in:false
}

export const SignUp = createAsyncThunk(
    'user/sign_up',
    async (payload, { rejectWithValue, _ }) => {
        try {
            const response = await api.post('/users', payload)
            return response.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const SignIn = createAsyncThunk(
    'user/sign_in',
    async (payload, { rejectWithValue, _ }) => {
        try {
            const response = await api.post('/auth/login', payload)
            return response.data;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const ClearSignUp = createAsyncThunk(
    'user/clear_sign_up',
    async (value, { rejectWithValue, dispatch }) => {
        return true;
    }
)

export const ClearSignIn = createAsyncThunk(
    'user/clear_sign_in',
    async (value, { rejectWithValue, dispatch }) => {
        return true;
    }
)


export const users = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    /* CLEAR SIGN-UP */ 
    builder.addCase(ClearSignUp.fulfilled, (state, action) => {
        if (action.payload == true) {
          state.signing_up = false
          state.errors_sign_up = undefined;
          state.success_sign_up = false
        }
    });

    /* CLEAR SIGN-IN*/ 
    builder.addCase(ClearSignIn.fulfilled, (state, action) => {
        if (action.payload == true) {
          state.signing_in = false
          state.errors_sign_in = undefined;
          state.success_sign_in = false
        }
    });

    /* SIGN-UP */
    builder.addCase(SignUp.pending, (state, _) => {
      state.signing_up = true
    })
    builder.addCase(SignUp.fulfilled, (state, action) => {
        state.signing_up = false
        state.errors_sign_up = undefined
        console.log('~~',action.payload);
        if (action.payload) {
            state.success_sign_up = true
        }
    })
    builder.addCase(SignUp.rejected, (state, action) => {
        state.signing_up = false
        state.success_sign_up = false
        state.errors_sign_up = action.payload.errors
    })

     /* SIGN-IN */
     builder.addCase(SignIn.pending, (state, _) => {
        state.signing_in = true
      })
      builder.addCase(SignIn.fulfilled, (state, action) => {
          state.signing_in = false
          state.errors_sign_in = undefined
          if (action.payload.success) {
              state.success_sign_in = true
          }
      })
      builder.addCase(SignIn.rejected, (state, action) => {
          state.signing_in = false
          state.success_sign_in = false
          state.errors_sign_in = action.payload.errors
      })
  },
})

export const selectUser = (state) => state.user;
export default users.reducer;