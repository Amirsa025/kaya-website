import React, {ReactNode, useEffect, useState} from 'react';
import Heading from "@/app/shared/Heading";
import {DotLoader, ScaleLoader} from "react-spinners";
import Cookies from "universal-cookie";
import Router from "next/router";
import AsidePanel from "@/app/shared/Aside-Panel";
import Header from "@/app/shared/NavBar";
import LinearProgress from "@mui/material/LinearProgress";

interface IPropsAdmin {
    children: ReactNode
}

const UserPanelAdmin: React.FC<IPropsAdmin> = ({children}) => {
    const [loading, setloading] = useState(true)
    const cookie = new Cookies()
    useEffect(() => {
        setTimeout(() => setloading(false), 100)
    }, [])
    if (loading) {
        return <div className={"h-screen backdrop-blur-0 flex items-center justify-center"}>
            <div className={"flex flex-col items-center justify-center "}>
                <ScaleLoader
                    color="#3676d6"
                    height={100}
                    width={10}
                />
            </div>
        </div>
    }

    if (!cookie.get('token') && !cookie.get('sginUP')) {
        Router.replace('/').then()
        return <></>
    }
    return (
        <div className={"w-full "}>
            {loading ? <LinearProgress color="inherit"/> : null}
            <Heading page={"پنل کاربر"} titlesite={" کایا"}/>
            <Header/>
            <div className={" flex lg:pt-10 pt-32 flex-col lg:flex-row space-y-6 space-x-3.5 "}>
                <AsidePanel/>
                <div className={"pb-[7rem] w-full px-4  md:px-0 "}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserPanelAdmin