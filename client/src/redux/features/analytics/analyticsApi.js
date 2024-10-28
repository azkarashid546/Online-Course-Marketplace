import {apiSlice} from "../api/apiSlice"

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getCoursesAnalytics : builder.query({
            query : () => ({
                url : "http://localhost:5000/api/v1/get-courses-analytics",
                method : "GET",
                credentials : "include"
            }),

        }),
        getUsersAnalytics : builder.query({
            query : () => ({
                url : "http://localhost:5000/api/v1/get-users-analytics",
                method : "GET",
                credentials : "include"
            }),

        }),
        getOrdersAnalytics : builder.query({
            query : () => ({
                url : "http://localhost:5000/api/v1/get-order-analytics",
                method : "GET",
                credentials : "include"
            }),

        })
    })
})

export const {useGetCoursesAnalyticsQuery, useGetUsersAnalyticsQuery, useGetOrdersAnalyticsQuery} = analyticsApi