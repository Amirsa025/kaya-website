import React from 'react';
import Asideregister from "@/app/components/form/register/Asideregister";
import MainSginup from "@/app/components/form/register/MainSginUp";
import Heading from "@/app/shared/Heading";
import GuestLayout from "@/app/components/layout/gusetLayout";
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/navigation";
import Cookies from "universal-cookie";

const Register:NextPageWithLayout = () => {
    const router = useRouter()
    const cookie = new Cookies()
    if(cookie.get('token')){
        router.replace('/user-panel')
    }
    return (
        <>
            <div className={"grid grid-cols-1 lg:grid-cols-2 "}>
                <Heading page={"ثبت نام"} titlesite={" کایا"}/>
                <Asideregister/>
                <MainSginup/>
            </div>
        </>
    );
};
Register.getLayout=(page: React.ReactElement)=> <GuestLayout>{page}</GuestLayout>
export default Register;