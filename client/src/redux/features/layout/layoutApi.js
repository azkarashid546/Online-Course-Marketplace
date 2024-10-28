import {apiSlice} from "../api/apiSlice"


export const layoutApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getHeroData : builder.query({
            query:(type) => ({
                url : `http://localhost:5000/api/v1/get-layout/${type}`,
                method : "GET",
                credentials : "include"
            })
        }),
        editLayout : builder.mutation({
            query:({type, image, title, subTitle, faq, categories}) => ({
                url : `http://localhost:5000/api/v1/edit-layout`,
                body :{
                    type,
                    image, 
                    title, 
                    subTitle,
                    faq,
                    categories
                },
                method : "PUT",
                credentials : "include"
            })
        }),
    })
});

export const {useGetHeroDataQuery, useEditLayoutMutation} = layoutApi;