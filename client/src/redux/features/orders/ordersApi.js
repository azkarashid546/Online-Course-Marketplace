import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-orders", 
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllOrdersInstructor: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-all-orders-instructor", 
        method: "GET",
        credentials: "include",
      }),
    }),
    getUserOrdersForCourse: builder.query({
      query: () => ({
        url: 'http://localhost:5000/api/v1/get-user-order-details',
        method: 'GET',
        credentials: 'include', // Ensure the backend supports credentials if used
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/payment/stripepublishablekey",
        method: "GET",
        credentials: "include",
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "http://localhost:5000/api/v1/payment",
        method: "POST",
        body: {
          amount,
        },
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "http://localhost:5000/api/v1/create-order",
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
  useCreateOrderMutation,
  useGetUserOrdersForCourseQuery,
  useGetAllOrdersInstructorQuery,
} = ordersApi;
