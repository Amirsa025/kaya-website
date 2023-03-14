import React, {useEffect, useState} from 'react';
import Heading from "@/app/components/Heading";
import AsideVerifyPhone from "@/app/components/verify-phone/AsideVerifyPhone";
import MainVerify from "@/app/components/verify-phone/MainVerify";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import Cookies from "universal-cookie";
import Router, {useRouter} from "next/router";
const VerifyPhone = () => {

    const [loadings,setloading] = useState(true)
    useEffect(()=>{
        setTimeout(()=>setloading(false),1000)
    },[])
    if(loadings) return <div>loading...</div>
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
VerifyPhone.getLayout = (page: React.ReactElement)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default VerifyPhone;