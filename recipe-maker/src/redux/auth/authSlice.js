import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { signUpUser, loginUser, getUserDetails } from "./authActions";
export const isValidToken = (token) => {
  let decoded = jwt_decode(token);
  return new Date(decoded.exp * 1000) > new Date() ? decoded : null;
};

const initialState = {
  currentUser: null,
  token: localStorage.getItem("USER-TOKEN")
    ? localStorage.getItem("USER-TOKEN")
    : null,
  error: null,
  loading: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("USER-TOKEN");
      state.currentUser = null;
      state.error = null;
      state.success = false;
    },
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; //registration succesful
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.token = payload.token;
        state.currentUser = payload.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.currentUser = payload;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout, updateError} = authSlice.actions;
export const getCurrentUser = (state) => state.auth.currentUser;
export default authSlice.reducer;
