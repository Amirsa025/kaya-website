import React, {ReactNode, useEffect, useState} from 'react';
import {DotLoader} from "react-spinners";
import Cookies from "universal-cookie";
import Router from "next/router";

interface IPropsAdmin {
    children: ReactNode
}

const VerifyUserPanel: React.FC<IPropsAdmin> = ({children}) => {
    const [loadingUser, setloading] = useState(true)
    useEffect(() => {
        setTimeout(() => setloading(false), 1000)
    }, [])
    if (loadingUser) return <div className={" h-screen flex items-center justify-center"}>
        <div className={"flex flex-col items-center justify-center "}>
            <DotLoader
                color="#36d7b7"
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
            {children}
        </div>
    );
};

export default VerifyUserPanel