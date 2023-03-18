import React, {useEffect, useState} from 'react';
import Heading from "@/app/components/Heading";
import AsideVerifyPhone from "@/app/components/verify-phone/AsideVerifyPhone";
import MainVerify from "@/app/components/verify-phone/MainVerify";
import Cookies from "universal-cookie";
import Router, {useRouter} from "next/router";
import {ClipLoader, DotLoader} from "react-spinners";
import VerifyUserPanel from "@/app/components/layout/verify-user-panel";
const VerifyPhone = () => {
    const [loadings,setloading] = useState(true)
    useEffect(()=>{
        setTimeout(()=>setloading(false),1000)
    },[])
    if(loadings) return <div className={" h-screen flex items-center justify-center"}>
        <Heading page={"احراز هویت کاربر "} titlesite={" کایا"}/>
        <div className={"flex flex-col items-center justify-center "}>
            <DotLoader
                color="#36d7b7"
                size={150}
            />
        </div>
    </div>
    const cookie = new Cookies()
    if(!cookie.get('sginUP')){
        Router.replace('/').then()
        return <></>
    }

    return (
        <>
            <div className={"grid grid-cols-1 lg:grid-cols-2 "}>
                <Heading page={"اعتبار سنجی"} titlesite={"کایا"}/>
                <AsideVerifyPhone/>
                <MainVerify/>
            </div>
        </>
    );
};
VerifyPhone.getLayout = (page: React.ReactElement)=> <VerifyUserPanel>{page}</VerifyUserPanel>
export default VerifyPhone;