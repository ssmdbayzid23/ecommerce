import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { BASE_URL } from '../../utils/config'
import { useDispatch } from 'react-redux';
import { logOut, setCredential } from '../../features/auth/authSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState})=>{
       const token = getState().auth.token;
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) =>{

    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.originalStatus === 401){
        console.log("Sending refresh token")
        //send refresh token to get new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions)
        console.log(refreshResult, "refresh result")
        if(refreshResult?.data){
            const user = api.getState().auth.user
            // Store the new token            
            api.dispatch(setCredential({...refreshResult.data, user}))
            // retry the original query with new access token

            const result = await baseQuery(args, api, extraOptions)
            console.log(result, "result with new access token")

            // retry the original query with new accessToken
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})