import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import { apiSlice } from "./slices/api.slice";
import planDetailsSlice from "./slices/planDetails.slice";

const store = configureStore({
  reducer: {
    // [authSlice.name]: authSlice.reducer,
    auth: authSlice,
    planDetails: planDetailsSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
