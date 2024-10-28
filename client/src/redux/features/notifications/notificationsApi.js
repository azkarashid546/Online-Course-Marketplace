import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-all-notifications",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `http://localhost:5000/api/v1/update-notification/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    getAllNotificationInstructor: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-all-notifications-instructor",
        method: "GET",
        credentials: "include",
      }),
    }),
    updateNotificationStatusInstructor: builder.mutation({
      query: (id) => ({
        url: `http://localhost:5000/api/v1/update-notification-instructor/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useUpdateNotificationStatusMutation,
  useGetAllNotificationInstructorQuery,
  useUpdateNotificationStatusInstructorMutation,
} = notificationsApi;
