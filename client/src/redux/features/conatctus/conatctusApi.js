import { apiSlice } from "../api/apiSlice";

export const contactusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContactUs: builder.mutation({
      query: ({ firstName, lastName, email, phone, country, message }) => ({
        url: "http://localhost:5000/api/v1/contact-us",
        method: "POST",
        body: { firstName, lastName, email, phone, country, message },
        credentials: "include",
      }),
    }),
    getAllContactUs: builder.query({
      query: () => ({
        url: "http://localhost:5000/api/v1/get-all-contacts",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateContactUsMutation, useGetAllContactUsQuery } = contactusApi;
