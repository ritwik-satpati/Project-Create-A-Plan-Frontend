import { apiSlice } from "../slices/api.slice";
import { PLAN_V1_URL } from "../apiRoutes";

export const planApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // *** Create A Plan ***
    createPlan: builder.mutation({
      query: (data) => ({
        url: `${PLAN_V1_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Plans", "Plan", "Itinerary"],
      // providesTags: ["Plans", "Plan", "Itinerary"],
    }),

    // *** Delete A Plan ***
    deletePlan: builder.mutation({
      query: (planId) => ({
        url: `${PLAN_V1_URL}/${planId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Plans", "Plan", "Itinerary"],
      // providesTags: ["Plans", "Plan", "Itinerary"],
    }),

    // *** Update A Plan ***
    updatePlan: builder.mutation({
      query: ({ planId: planId, data: data }) => ({
        url: `${PLAN_V1_URL}/${planId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Plans", "Plan", "Itinerary"],
      // providesTags: ["Plans", "Plan", "Itinerary"],
    }),

    // *** Get Multiple Plans ***
    getPlans: builder.query({
      query: () => ({
        url: `${PLAN_V1_URL}`,
        // method: "GET",
        credentials: "include",
      }),
      providesTags: ["Plans"],
    }),

    // *** Get Multiple Bookmarked Plans ***
    getBookmarkedPlans: builder.query({
      query: () => ({
        url: `${PLAN_V1_URL}/bookmark`,
        // method: "GET",
        // credentials: "include",
      }),
      providesTags: ["Bookmarks"],
    }),

    // *** Get A Bookmarked Plan by its PlanId ***
    getBookmarkedPlanByPlanId: builder.query({
      query: (planId) => ({
        url: `${PLAN_V1_URL}/bookmark?planId=${planId}`,
        // method: "GET",
        credentials: "include",
      }),
      providesTags: ["Bookmark"],
    }),

    // *** Bookmark / Unbookmark A Plan ***
    bookmark: builder.mutation({
      query: (data) => ({
        url: `${PLAN_V1_URL}/bookmark`,
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Bookmarks", "Bookmark"],
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useDeletePlanMutation,
  useUpdatePlanMutation,
  useGetPlansQuery,
  useBookmarkMutation,
  useGetBookmarkedPlansQuery,
  useGetBookmarkedPlanByPlanIdQuery,
  useLazyGetBookmarkedPlanByPlanIdQuery,
} = planApiSlice;
