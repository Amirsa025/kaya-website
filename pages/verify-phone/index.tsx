import React from 'react';
import Heading from "@/app/components/Heading";
import AsideVerifyPhone from "@/app/components/verify-phone/AsideVerifyPhone";
import MainVerify from "@/app/components/verify-phone/MainVerify";

const Register = () => {
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
export default Register;