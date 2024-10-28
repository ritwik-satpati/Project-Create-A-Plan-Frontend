import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: null,
  itinerary: null,
  isLoading: false,
};

const planDetailsSlice = createSlice({
  name: "planDetails",
  initialState,
  reducers: {
    // *** Get A Itinerary ***
    getItineraryRequest: (state) => {
      state.isLoading = true;
    },
    getItinerarySuccess: (state, action) => {
      state.plan = action.payload.plan;
      state.itinerary = action.payload.itinerary;
      state.isLoading = false;
    },
    getItineraryFail: (state) => {
      state.user = null;
      state.isLoading = false;
    },

    // *** Create A Itinerary ***
    createItineraryRequest: (state) => {
      state.isLoading = true;
    },
    createItinerarySuccess: (state, action) => {
      state.itinerary = action.payload.itinerary;
      state.isLoading = false;
    },
    createItineraryFail: (state) => {
      state.itinerary = null;
      state.isLoading = false;
    },

    // *** Delete A Plan ***
    deletePlanRequest: (state) => {
      state.isLoading = true;
    },
    deletePlanSuccess: (state, action) => {
      state.plan = null;
      state.itinerary = null;
      state.isLoading = false;
    },
    deletePlanFail: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  // *** Get A Itinerary ***
  getItineraryRequest,
  getItinerarySuccess,
  getItineraryFail,
  // *** Create A Itinerary ***
  createItineraryRequest,
  createItinerarySuccess,
  createItineraryFail,
  // *** Delete A Plan ***
  deletePlanRequest,
  deletePlanSuccess,
  deletePlanFail,
} = planDetailsSlice.actions;

export default planDetailsSlice.reducer;
