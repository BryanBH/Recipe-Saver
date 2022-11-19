import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUser = createAsyncThunk(
  "/auth/signUpUser",
  async (user, { rejectWithValue }) => {
    try {
      const newUser = await axios.post("/auth/signUp", {
        data: user,
      });
      return newUser.data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/signIn", {
        data: user,
      });
      localStorage.setItem("USER-TOKEN", data.token);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

/** Get users details via Bearer authorization header */
export const getUserDetails = createAsyncThunk(
  "/auth/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.get("/auth/profile", config);

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
