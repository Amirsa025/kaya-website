import React, {ReactNode, useEffect, useState} from 'react';
import Heading from "@/app/shared/HeadingTitle";
import {ScaleLoader} from "react-spinners";
import Cookies from "universal-cookie";
import {useRouter} from "next/navigation";
import AsidePanel from "@/app/shared/Aside-Panel";
import Header from "@/app/shared/Header";
import LinearProgress from "@mui/material/LinearProgress";

interface IPropsAdmin {
    children: ReactNode
}

const UserPanelAdmin: React.FC<IPropsAdmin> = ({children}) => {
    const [loading, setLoading] = useState(true)
    const cookie = new Cookies()
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => setLoading(false), 100)
    }, [])
    if (loading) {
        return <div className={"h-screen backdrop-blur-0 flex items-center justify-center"}>
            <div className={"flex flex-col items-center justify-center "}>
                <ScaleLoader
                    color="#4B6677"
                    height={100}
                    width={10}
                />
            </div>
        </div>
    }
    if (!cookie.get('token') && !cookie.get('signUp')) {
        router.replace('/')
        return <></>
    }
    return (
        <div className={"w-full "}>
            {loading ? <LinearProgress color="inherit"/> : null}
            <Heading page={"پنل کاربر"} titlesite={" کایا"}/>
            <Header/>
            <div className={" flex  flex-col lg:flex-row "}>
                  <AsidePanel/>
                    <div className={"pb-[7rem] sm:pb-0 md:pb-[1rem] w-full   md:px-0 "}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserPanelAdmin