import React, {useEffect, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import Cookies from "universal-cookie";
import Router from "next/router";

const UserPanelPage:NextPageWithLayout = () => {
    const [loading,setloading] = useState(true)
    useEffect(()=>{
        setTimeout(()=>setloading(false),1000)
    },[])
    if(loading) return <div>loading...</div>
    const cookie = new Cookies()
    if(!cookie.get('token')){
        Router.replace('/').then()
        return <></>
    }

    return (
        <>
            userPanelAdmin
        </>
    );
};
UserPanelPage.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default UserPanelPage;
