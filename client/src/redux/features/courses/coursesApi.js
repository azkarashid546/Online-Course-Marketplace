import { Rating } from "@mui/material";
import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourses: builder.mutation({
      query: (data) => ({
        url: "http://localhost:5000/api/v1/create-course",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-courses-admin",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllCoursesInstructor: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-all-courses-instructor",
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `http://localhost:5000/api/v1/delete-course/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `http://localhost:5000/api/v1/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-courses",
        method: "GET",
        credentials: "include",
      }),
    }),
   
    getAllCoursesByUser : builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-all-user-courses",
        method: "GET",
        credentials: "include",
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `http://localhost:5000/api/v1/get-course/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `http://localhost:5000/api/v1/get-course-content/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    addNewQuestion : builder.mutation({
      query : ({question, courseId, contentId}) => ({
        url: "http://localhost:5000/api/v1/add-question",
        body : {
          question, 
          courseId, 
          contentId
        },
        method : "PUT",
        credentials : "include"
      })
    }),
    addAnswerInQuestion : builder.mutation({
      query : ({answer, questionId, courseId, contentId})=> ({
        url: "http://localhost:5000/api/v1/add-answer",
        body :{
          answer,
          questionId,
          courseId,
          contentId
        },
        method : "PUT",
        credentials : "include"
      })
    }),
    addReviewInCourse : builder.mutation({
      query : ({review, rating, courseId})=> ({
        url: `http://localhost:5000/api/v1/add-review/${courseId}`,
        body :{
          review,
          rating
        },
        method : "PUT",
        credentials : "include"
      })
    }),
    addReplyInReview : builder.mutation({
      query : ({reviewId, courseId, comment})=> ({
        url: `http://localhost:5000/api/v1/add-review-reply`,
        body :{
          comment,
          courseId,
          reviewId
        },
        method : "PUT",
        credentials : "include"
      })
    }),
    addReplyInReviewInstructor : builder.mutation({
      query : ({reviewId, courseId, comment})=> ({
        url: `http://localhost:5000/api/v1/add-review-reply-istructor`,
        body :{
          comment,
          courseId,
          reviewId
        },
        method : "PUT",
        credentials : "include"
      })
    })
  }),
});

export const {
  useCreateCoursesMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
  useGetAllCoursesByUserQuery,
  useAddReplyInReviewInstructorMutation,
  useGetAllCoursesInstructorQuery,
} = coursesApi;
