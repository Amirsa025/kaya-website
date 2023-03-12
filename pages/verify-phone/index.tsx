import React from 'react';
import Heading from "@/app/components/Heading";
import AsideVerifyPhone from "@/app/components/verify-phone/AsideVerifyPhone";
import MainVerify from "@/app/components/verify-phone/MainVerify";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";
import Link from "next/link";
const VerifyPhone = () => {
    const Router = useRouter()
    const cookie = new Cookies()
    if(!cookie.get('token')){
         return  (
             <div className={"container-app flex flex-col"}>
                 <Link href={"/"} className={"text-red-400"}>بازگشت به خانه </Link>
                 شما به این صفحه دسترسی ندارید
             </div>

         )
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