import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice"
import authSlice from "./features/auth/authSlice";
export const store = configureStore({
    reducer : {
     [apiSlice.reducerPath] : apiSlice.reducer,
     auth: authSlice.reducer,
    },
    devTools :  false,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})


// call the refresh token function on every page reload
const initalizeApp = async () => {
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch : true}))
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch : true}))
}

initalizeApp()