import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const InitialState = {
  token: null,
  user:[],
  signing_up: false,
  errors_sign_up:undefined,
  success_sign_up:false,

  signing_in: false,
  errors_sign_in:undefined,
  success_sign_in:false,

  signing_out: false,
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
        const { email:emailParams } = payload
        try {
            const responseAuth = await api.post('/auth/login', payload)
            const responseMe = await api.get(`/users?filter[email][_eq]=${emailParams}`)
            const { id, first_name, last_name, email, role, status, last_access, email_notifications } = responseMe.data.data[0];
            const { access_token, refresh_token } = responseAuth.data.data;
            const res = {
                id, 
                first_name, 
                last_name, 
                email, 
                role,
                status, 
                last_access, 
                email_notifications,
                access_token,
                refresh_token
            }
            return res;
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const SignOut = createAsyncThunk(
    'user/sign_out',
    async (payload, { rejectWithValue, _ }) => {
        try {
            const response = await api.post('/auth/logout', payload)
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
          state.token = null
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
        if (action.payload) {
            state.success_sign_up = true
        }
    })
    builder.addCase(SignUp.rejected, (state, action) => {
        state.signing_up = false
        state.success_sign_up = false
        state.errors_sign_up = 'Signup failed!, Something went wrong.'
    })

     /* SIGN-IN */
     builder.addCase(SignIn.pending, (state, _) => {
        state.signing_in = true
      })
      builder.addCase(SignIn.fulfilled, (state, action) => {
          state.signing_in = false
          state.errors_sign_in = undefined
          state.success_sign_in = true
          state.user = action.payload;
          state.token = action.payload.access_token
          localStorage.setItem('token', action.payload.access_token)
      })
      builder.addCase(SignIn.rejected, (state, action) => {
          state.token = null
          state.signing_in = false
          state.success_sign_in = false
          state.errors_sign_in = 'Signin failed!, Something went wrong.'
      })

       /* SIGN-OUT */
      builder.addCase(SignOut.pending, (state, _) => {
        state.signing_out = true
      })
      builder.addCase(SignOut.fulfilled, (state, action) => {
          state.signing_out = false
          state.user = null;
          state.token = null
          localStorage.removeItem("token");
      })
      builder.addCase(SignOut.rejected, (state, action) => {
          state.token = null
          state.user = null;
          state.signing_out = false
      })

 
  },

  
})

export const selectUser = (state) => state.user;
export default users.reducer;