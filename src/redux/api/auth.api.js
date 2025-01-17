import { apiSlice } from "../slices/api.slice";
import { AUTH_V1_URL } from "../../constants/apiRoutes";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // *** User Register ***
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_V1_URL}/register`,
        method: "POST",
        body: data,
      }),
      // providesTags: ["User"],
      // invalidatesTags: [
      //     "Plans",
      //     "Plan",
      //     "Itinerary",
      //     "Bookmarks",
      //     "Bookmark",
      // ],
    }),
    // *** User Activation ***
    activation: builder.mutation({
      query: ({ activationToken, queryString }) => ({
        url: `${AUTH_V1_URL}/active/${activationToken}`,
        method: "POST",
        body: { queryString },
      }),
      providesTags: ["User"],
      invalidatesTags: ["Plans", "Plan", "Itinerary", "Bookmarks", "Bookmark"],
    }),
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
    // *** User Create ***
    create: builder.mutation({
      query: (data) => ({
        url: `${AUTH_V1_URL}/create`,
        method: "POST",
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
    // *** Forget Pasword ***
    forgetPassowrd: builder.mutation({
      query: (data) => ({
        url: `${AUTH_V1_URL}/forget-password`,
        method: "POST",
        body: data,
      }),
      // providesTags: ["User"],
      // invalidatesTags: ["Plans", "Plan", "Itinerary", "Bookmarks", "Bookmark"],
    }),
    // *** Reset Password ***
    resetPassowrd: builder.mutation({
      query: ({
        uidQueryValue,
        tokenQueryValue,
        newPassword,
        queryString,
      }) => ({
        url: `${AUTH_V1_URL}/reset-password/${uidQueryValue}/${tokenQueryValue}`,
        method: "POST",
        body: { newPassword, queryString },
        headers: { "Content-Type": "application/json" },
      }),
      // providsesTags: ["User"],
      // invalidatesTags: ["Plans", "Plan", "Itinerary", "Bookmarks", "Bookmark"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useCreateMutation,
  useLogoutMutation,
  useForgetPassowrdMutation,
  useResetPassowrdMutation,
} = authApiSlice;
