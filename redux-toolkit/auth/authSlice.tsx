import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Asyncs
import API from "../../utils/api/auth";
import { TOKEN_COOKIE } from "@/utils/constant";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  errorSignin: null,
  errorSignup: null,
};

export const loadToken = createAsyncThunk(
  "auth/loadToken",
  async (_,{rejectWithValue})=>{
    try {
      const token = await AsyncStorage.getItem(TOKEN_COOKIE);
      return { token };
    } catch (error) {
      console.error("Failed to load token from storage", error);
      return rejectWithValue(error);
    }
  }

)
export const signIn = createAsyncThunk(
  "auth/signIn",
  async (signInForm, { rejectWithValue }) => {
    try {
      console.log("Signin with " + signInForm);
      if (!signInForm.email || !signInForm.password) {
        throw new Error("Email and password are required");
      }

      const { data } = await API.auth.signIn(signInForm);
      console.log("Received data on signIn:", data);

      if (data.token) {
        await AsyncStorage.setItem(TOKEN_COOKIE, data.token);
      } else {
        throw new Error("Invalid data received from API");
      }

      return { token: data.token, userId: data.userId };
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      const errMsg = error.response?.data?.message || error.message;
      console.error("Sign in error:", errMsg);
      return rejectWithValue({ message: errMsg, status });
    }
  }
);
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (signUpForm, { rejectWithValue }) => {
    try {
      const { data } = await API.auth.signUp(signUpForm);
      console.log("Signup successful, received data:", data);
      await AsyncStorage.setItem(TOKEN_COOKIE, data.token);
      return { token: data.token };
    } catch (error) {
      const status = error.response ? error.response.status : 500;
      const errMsg = error.response?.data?.message || error.message;
      return rejectWithValue({ message: errMsg, status });
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    resetLoginError: (state)=>{
      state.errorSignin = null
    },
    resetSignupError: (state) => {
      state.errorSignup = null;
    },
    clearAuthState: (state) => {
      state.token = null;
      state.userId = null;
      state.loading = false;
      state.errorSignin = null;
      state.errorSignup = null;
    
    },
    
  }
  extraReducers: (builder) => {
    builder
      .addCase(loadToken.fulfilled, (state, action)=>{
        state.token = action.payload.token
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.errorSignin = action.payload.message;  // Handle the error message
        state.loading = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        state.loading = false;
      });
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.errorSignup = action.payload;
        state.loading = false;
      })
  },
});

export const {
  resetLoginError,
  resetSignupError,
  clearAuthState
} = authSlice.actions

export const selectToken = (state) => state.auth.token;
export const selectUserId = (state) => state.auth.userId;
export const selectErrorSignIn = (state) => state.auth.errorSignin;
export const selectErrorSignUp = (state) => state.auth.errorSignup;
export const selectLoading = (state) => state.auth.loading
export default authSlice.reducer;
