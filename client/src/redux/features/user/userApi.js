import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "http://localhost:5000/api/v1/updateprofilepicture",
        method: "PUT",
        body: { avatar },
        credentials: "include",
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "http://localhost:5000/api/v1/updateuser",
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "http://localhost:5000/api/v1/updatepassword",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-users",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllUsersInstructor: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-users-instructor",
        method: "GET",
        credentials: "include",
      }),
    }),
    // getAllUsersInstructor: builder.query({
    //   query: () => ({
    //     url: "http://localhost:5000/api/v1//get-users-instructor",
    //     method: "GET",
    //     credentials: "include",
    //   }),
    // }),
    
    updateUserRole: builder.mutation({
      query: ({email, role}) => ({
        url: "http://localhost:5000/api/v1/update-user-role",
        method: "PUT",
        body : {email, role},
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `http://localhost:5000/api/v1/delete-user/${id}`,
        method: "DELETE",        
        credentials: "include",
      }),
    }),
    getUserCourseDataCompletionProgress: builder.query({
      query: ({ userId, courseId }) => ({
        url: `http://localhost:5000/api/v1/get-user-complete-course?userId=${userId}&courseId=${courseId}`, // Pass userId and courseId as query parameters
        method: "GET",
        credentials: "include",
      }),
    }),
    updateCourseProgress: builder.mutation({
      query: ({ courseId, videoId, progress }) => ({
        url: 'update-course-progress',
        method: 'POST',
        body: { courseId, videoId, progress }, // Pass courseId, videoId, and progress in the request body
        credentials: 'include',
      }),
    }),

    
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetUserCourseDataCompletionProgressQuery,
  useGetAllUsersInstructorQuery,
  useUpdateCourseProgressMutation,
} = userApi;
