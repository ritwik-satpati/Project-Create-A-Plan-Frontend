import { apiSlice } from "../slices/api.slice";
import { ITINERARY_V1_URL } from "../../constants/apiRoutes";

export const itineraryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // *** Create A Itinerary ***
    createItinerary: builder.mutation({
      query: (planId) => ({
        url: `${ITINERARY_V1_URL}/${planId}`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["Itinerary", "Plan"],
    }),

    // *** Update A Itinerary ***
    updateItinerary: builder.mutation({
      query: ({ planId: planId, data: data }) => ({
        url: `${ITINERARY_V1_URL}/${planId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Itinerary", "Plan"],
    }),

    // *** Get A Itinerary ***
    getItinerary: builder.query({
      query: (planId) => ({
        url: `${ITINERARY_V1_URL}/${planId}`,
        // method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Itinerary", "Plan"],
    }),
  }),
});

export const {
  useCreateItineraryMutation,
  useUpdateItineraryMutation,
  useGetItineraryQuery,
} = itineraryApiSlice;
