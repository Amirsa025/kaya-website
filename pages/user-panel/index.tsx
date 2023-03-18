import React, {useEffect, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import Cookies from "universal-cookie";
import Router from "next/router";
import { DotLoader} from "react-spinners";
import Heading from "@/app/components/Heading";
import Header from "@/app/shared/NavBar";

const UserPanelPage:NextPageWithLayout = () => {
    const [loading,setloading] = useState(true)
    useEffect(()=>{
        setTimeout(()=>setloading(false),1000)
    },[])
    if(loading) return <div className={" h-screen flex items-center justify-center"}>
        <Heading page={"پنل کاربری "} titlesite={" کایا"}/>
        <div className={"flex flex-col items-center justify-center "}>
            <DotLoader
                color="#36d7b7"
                size={150}
            />
        </div>
    </div>
    const cookie = new Cookies()
    if(!cookie.get('token') && !cookie.get('sginUP')){
        Router.replace('/').then()
        return <></>
    }

    return (
        <>
           <Header/>
        </>
    );
};
UserPanelPage.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default UserPanelPage;
