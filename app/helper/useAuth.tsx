import React from 'react';
import Cookies from "universal-cookie";
import {useQuery} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
const cookie = new Cookies()
const fetchUser = ()=>{
        return callApi().get('/users/me',{
            headers: {
                'Authorization': `Bearer ${cookie.get('sginUP') || cookie.get('token')}`
            }
        })
}
const UseAuth = () => {
    const { isLoading, isError, data:user, isFetching ,refetch } = useQuery({
        queryKey: ["getUser"],
        queryFn: () => fetchUser(),
        staleTime: 500,
        refetchOnWindowFocus: false,
        cacheTime: 0,
        retry: 10,

    });
    return {data:user ,isFetching , isError ,isLoading}
};

export default UseAuth;