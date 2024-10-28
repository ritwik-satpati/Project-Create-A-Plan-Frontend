import { apiSlice } from "../slices/api.slice";
import { AUTH_V1_URL } from "../apiRoutes";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // *** User Login ***
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_V1_URL}/login`,
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
      invalidatesTags: ["Plans", "Plan", "Itinerary", "Bookmarks", "Bookmark"],
    }),
    // *** User Logout ***
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_V1_URL}/logout`,
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [
        "User",
        "Plans",
        "Plan",
        "Itinerary",
        "Bookmarks",
        "Bookmark",
      ],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
