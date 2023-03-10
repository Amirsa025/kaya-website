import React from 'react';
import Heading from "@/app/components/Heading";
import AsideLogin from "@/app/components/login/AsideLogin";
import MainLogin from "@/app/components/login/MainLogin";

const Login = () => {
    return (
        <>
            <Heading page={"ورود"} titlesite={" کایا"}/>
            <div className={""}>
                <div className={"grid grid-cols-1 lg:grid-cols-2 "}>
                    <AsideLogin/>
                    <MainLogin/>
                </div>
            </div>
        </>
    );
};

export default Login;