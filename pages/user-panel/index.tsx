import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import Link from "next/link";
import Cookies from "universal-cookie";

const UserPanelPage:NextPageWithLayout = () => {
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
            userPanelAdmin
        </>
    );
};
UserPanelPage.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default UserPanelPage;
