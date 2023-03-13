import React, {useEffect, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import Cookies from "universal-cookie";
import Router from "next/router";
import Heading from "@/app/components/Heading";

const UserPanelPage:NextPageWithLayout = () => {
    const cookie = new Cookies()
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
            setTimeout(()=>{
                setLoading(false)
            },1000)

    },[])
    if(loading) return  <div>loading</div>
    if(!cookie.get('token')){
        Router.replace('/').then()
        return <></>
    }
    return (
        <div className={"container-app text-red-400 font-bold"}>
            <Heading page={"داشبورد کاربر"} titlesite={" کایا"}/>
            userPanelAdmin
        </div>
    );
};
UserPanelPage.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default UserPanelPage;
