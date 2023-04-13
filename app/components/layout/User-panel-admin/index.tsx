import React, {ReactNode, useEffect, useState} from 'react';
import Heading from "@/app/shared/Heading";
import {DotLoader} from "react-spinners";
import Cookies from "universal-cookie";
import Router from "next/router";
import AsidePanel from "@/app/shared/Aside-Panel";
import Header from "@/app/shared/NavBar";

interface IPropsAdmin {
    children: ReactNode
}

const UserPanelAdmin: React.FC<IPropsAdmin> = ({children}) => {
    const [loading, setloading] = useState(true)

    useEffect(() => {
        setTimeout(() => setloading(false), 1000)
    }, [])
    if (loading) return <div className={"h-screen backdrop-blur-0 flex items-center justify-center"}>
        <div className={"flex flex-col items-center justify-center "}>
            <DotLoader
                color="#1976D2"
                size={150}
            />
        </div>
    </div>
    const cookie = new Cookies()
    if (!cookie.get('token') && !cookie.get('sginUP')) {
        Router.replace('/').then()
        return <></>
    }
    return (
        <div className={"w-full "}>
            <Heading page={"پنل کاربر"} titlesite={" کایا"}/>
            <Header/>
            <div
                className={" flex lg:pt-10 pt-32 flex-col lg:flex-row space-y-6 space-x-3.5 "}>
                 <AsidePanel/>
                <div className={"pb-[7rem] w-full px-4 md:px-0 "}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserPanelAdmin