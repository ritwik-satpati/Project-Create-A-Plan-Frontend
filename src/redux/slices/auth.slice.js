import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // *** User Registration ***
    registerUserRequest: (state) => {
      state.isLoading = true;
    },
    registerUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerUserFail: (state) => {
      state.user = state.user;
      state.isLoading = false;
    },

    // *** User Login ***
    loginUserRequest: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginUserFail: (state) => {
      state.user = state.user;
      state.isLoading = false;
    },

    // *** User Get ***
    getUserRequest: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    getUserFail: (state) => {
      state.user = state.user;
      state.isLoading = false;
    },

    // *** User Logout ***
    logoutUserRequest: (state) => {
      state.isLoading = true;
    },
    logoutUserSuccess: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isLoading = false;
    },
    logoutUserFail: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  // *** User Registration ***
  registerUserRequest,
  registerUserSuccess,
  registerUserFail,
  // *** User Login ***
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  // *** User Get ***
  getUserRequest,
  getUserSuccess,
  getUserFail,
  // *** User Logout ***
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFail,
} = authSlice.actions;

export default authSlice.reducer;
