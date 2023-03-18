import React from 'react';
import Heading from "@/app/shared/Heading";
import AsideLogin from "@/app/components/form/login/AsideLogin";
import MainLogin from "@/app/components/form/login/MainLogin";
import {NextPageWithLayout} from "@/pages/_app";
import GuestLayout from "@/app/components/layout/gusetLayout";
import Cookies from "universal-cookie";
import {useRouter} from "next/navigation";

const Login:NextPageWithLayout = () => {
    const router = useRouter()
    const cookie = new Cookies()
    if(cookie.get('token')){
        router.replace('/user-panel')
    }
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
Login.getLayout=(page: React.ReactElement)=> <GuestLayout>{page}</GuestLayout>
export default Login;