import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegisteration } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        register : builder.mutation({
            query : (data) => ({
                url : "http://localhost:5000/api/v1/registeration",
                method : "POST",
                body : data,
                credentials : "include",
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegisteration({
                             token : result.data.activationToken
                        })
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        activation : builder.mutation({
            query : ({activationCode,token}) => ({
               url : "http://localhost:5000/api/v1/activate-user",
               method : "POST",
               body : {
                activationCode,
                token
               }
            })
        }),
        login : builder.mutation({
            query : ({email, password}) => ({
                url : "http://localhost:5000/api/v1/login-user",
                method : "POST",
                body : {
                    email,
                    password
                },
                credentials : "include"
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken : result.data.accessToken,
                            user : result.data.user
                        })
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        socialAuth : builder.mutation({
            query : ({email, name, avatar}) => ({
                url : "http://localhost:5000/api/v1/social-auth",
                method : "POST",
                body : {
                    email,
                    name,
                    avatar
                },
                credentials : "include"
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken : result.data.accessToken,
                            user : result.data.user
                        })
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        }),
         logOut : builder.query({
            query : () => ({
                url : "http://localhost:5000/api/v1/logout-user",
                method : "GET",
               
                credentials : "include"
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    
                    dispatch(
                        userLoggedOut()
                    )
                } catch (error) {
                    console.error(error)
                }
            }
        })
    })
})


export const {useRegisterMutation, useActivationMutation, useLoginMutation, useLogOutQuery} = authApi