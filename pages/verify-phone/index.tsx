import React, {useEffect, useState} from 'react';
import Heading from "@/app/shared/HeadingTitle";
import AsideVerifyPhone from "@/app/shared/form/verify-phone/AsideVerifyPhone";
import MainVerify from "@/app/shared/form/verify-phone/MainVerify";
import Cookies from "universal-cookie";
import Router from "next/router";
import VerifyUserPanel from "@/app/components/layout/verify-user-panel";
const VerifyPhone = () => {
    const cookie = new Cookies()
    if(!cookie.get('signUp')){
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