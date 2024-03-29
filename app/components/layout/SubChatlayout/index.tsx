import React, {ReactNode, useEffect, useState} from 'react';
import Heading from "@/app/shared/HeadingTitle";
import {ScaleLoader} from "react-spinners";
import Cookies from "universal-cookie";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import Router from "next/router";
import {useRouter} from "next/navigation";
interface IPropsAdmin {
    children: ReactNode
}

const SubChatLayout: React.FC<IPropsAdmin> = ({children}) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const cookie = new Cookies()
    const [state, setState] = useState(false)
    const handleNavigate = ()=>{
        if(cookie.get('signUp') ||  cookie.get('token')){
            router.replace('/user-panel/chat')
        }else {
            router.replace('/login')
        }
    }
    useEffect(() => {
        setTimeout(() => setLoading(false), 10)
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
            Router.replace('/').then()
        return <></>
    }

    return (
        <div className={"w-full "}>
            {loading ? <LinearProgress color="inherit"/> : null}
            <Heading page={"پنل کاربر"} titlesite={" کایا"}/>
            <nav className="container-app bg-white w-full fixed z-[1000] md:relative  md:border-0">
                <div>
                    <div className=" flex items-center justify-between py-2 md:py-5 md:flex ">
                        <div className={"flex justify-between w-full"}>
                            <section className={"between-items "}>
                                <div className={"text-3xl font-extrabold col-items"}>
                                    <div className={"flex items-center pt-1 w-16 h-8"}>
                                        <img src="/images/Asset.png" alt="logo"/>
                                    </div>
                                </div>
                            </section>
                            <div className={"hidden md:block"}>
                                <div className={` md:px-[36px]  md:h-0  justify-self-center pb-3 md:block md:pb-0 ${state ? 'block ' : 'hidden transMovemt'}`}>
                                    <ul className="  flex flex-col gap-y-4 md:flex-row flex-start md:items-center  md:space-x-8 md:space-x-reverse md:space-y-0 pt-2  flex-col md:flex-row ">
                                        <li>
                                            <Link href={"/user-panel"} legacyBehavior>
                                                <a>
                                                    پروژه ها
                                                </a>
                                            </Link>
                                        </li>
                                        <li onClick={handleNavigate} >
                                            <a className={"flex gap-2 border px-4 py-2 border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 cursor-pointer "}>
                                                <span>بازگشت</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>

                                </div>

                            </div>
                        </div>
                        <div className="md:hidden">
                            <button className="open" onClick={() => setState(!state)}
                            >
                                {
                                    state ? (
                                        <div className={"w-[60px] h-[60px] bg-blue-600 center-item"}>
                                            <i className="ri-menu-line text-white text-14"></i>
                                        </div>

                                    ) : (
                                        <div className={"w-[60px] h-[60px]  center-item"}>
                                            <i className="ri-menu-line text-14"></i>
                                        </div>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={"flex md:hidden"}>
                        <div className={` md:px-[36px]  md:h-0  justify-self-center pb-3 md:block md:pb-0 ${state ? 'block ' : 'hidden transMovemt'}`}>
                            <ul className="  flex flex-col gap-y-4 md:flex-row flex-start md:items-center  md:space-x-8 md:space-x-reverse md:space-y-0 pt-2  flex-col md:flex-row ">
                                <li>
                                    <Link href={"/"} legacyBehavior>
                                        <a>
                                            پروژه ها
                                        </a>
                                    </Link>
                                </li>
                                <li onClick={handleNavigate} >
                                    <a className={"flex gap-2 border px-4 py-2 border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 cursor-pointer "}>
                                        <span>بازگشت</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>

                        </div>

                    </div>
                </div>
            </nav>
            <div className={" flex   flex-col lg:flex-row  "}>
                <div className={" sm:pb-0 md:pb-[1rem] w-full   md:px-0 "}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SubChatLayout