import React from 'react';
import Cookies from "universal-cookie";
import {useQuery} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
const cookie = new Cookies(), ACCESS_TOKEN = cookie.get('sginUP') || cookie.get('token')
const fetchUser = ()=>{
        return callApi().get('/users/me',{
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        })
}
const UseAuth = () => {
    const { isLoading, error, data:user, isFetching } = useQuery({
        queryKey: ["getUser"],
        queryFn: () => fetchUser(),
        staleTime: 500,
        refetchOnWindowFocus: false,
        cacheTime: 0,
    });
    return {data:user ,isFetching , error ,isLoading}
};

export default UseAuth;