import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: localStorage.getItem("account")
    ? JSON.parse(localStorage.getItem("account"))
    : null,
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
      state.isLoading = false;
    },
    registerUserFail: (state) => {
      state.isLoading = false;
    },

    // *** User Activation ***
    activeUserRequest: (state) => {
      state.isLoading = true;
    },
    activeUserSuccess: (state, action) => {
      state.account = action.payload.account;
      state.user = action.payload.user;
      state.isLoading = false;
      localStorage.setItem("account", JSON.stringify(action.payload.account));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    activeUserFail: (state) => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      state.account = null;
      state.user = null;
      state.isLoading = false;
    },

    // *** User Login ***
    loginUserRequest: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.account = action.payload.account;
      state.user = action.payload.user;
      state.isLoading = false;
      localStorage.setItem("account", JSON.stringify(action.payload.account));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    loginUserFail: (state) => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      state.account = null;
      state.user = null;
      state.isLoading = false;
    },

    // *** User Create ***
    createUserRequest: (state) => {
      state.isLoading = true;
    },
    createUserSuccess: (state, action) => {
      state.account = action.payload.account;
      state.user = action.payload.user;
      state.isLoading = false;
      localStorage.setItem("account", JSON.stringify(action.payload.account));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    createUserFail: (state) => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      state.account = null;
      state.user = null;
      state.isLoading = false;
    },

    // *** User Get ***
    getUserRequest: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.account = action.payload.account;
      state.user = action.payload.user;
      state.isLoading = false;
      localStorage.setItem("account", JSON.stringify(action.payload.account));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    getUserFail: (state) => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      state.account = null;
      state.user = null;
      state.isLoading = false;
    },

    // *** User Logout ***
    logoutUserRequest: (state) => {
      state.isLoading = true;
    },
    logoutUserSuccess: (state) => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      state.account = null;
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
  // *** User Activation ***
  activeUserRequest,
  activeUserSuccess,
  activeUserFail,
  // *** User Login ***
  loginUserRequest,
  loginUserSuccess,
  loginUserFail,
  // *** User Create ***
  createUserRequest,
  createUserSuccess,
  createUserFail,
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
