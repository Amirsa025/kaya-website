import React, {useState} from 'react';
import {navigation} from "@/app/constant/MockData";
import Link from "next/link";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";

const Header = () => {
    const router = useRouter()
    const [state, setState] = useState(false)
    const cookie = new Cookies()
    const logout = () => {
        if (cookie.get('signUp')) {
            cookie.remove('signUp')
            window.location.reload()
            router.push('/')
        }
        else if (cookie.get('token')) {
            router.replace('/')
            window.location.reload()
            cookie.remove('token')
        }
    }
    const handleNavigate = ()=>{
        if(cookie.get('signUp') && cookie.get('token')){
            router.replace('/user-panel').then()
        }
        router.replace('/login').then()
    }
    let userAdmin;
    if (cookie.get('token') || cookie.get('signUP')) {
        userAdmin = <div className={"flex items-center gap-5"}>
            {
                router.asPath==="/user-panel"?<>
                    <Link href="/" legacyBehavior>
                        <button
                            className={"w-[90px] h-[40px] text-[0.9rem] border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>خانه
                        </button>
                    </Link>
                </>:<></>
            }
            {
                router.asPath==="/"?<>
                    <Link href="/user-panel" legacyBehavior>
                        <button
                            className={"w-[90px] h-[40px] text-[0.9rem] border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>پنل کاربری
                        </button>
                    </Link>
                </>:<></>
            }
            <button
                className={" w-[90px] h-[40px]  border rounded-md hover:bg-red-400 hover:border-red-600 hover:text-white text-[14px]"}
                onClick={logout}>خروج
            </button>
        </div>
    } else {
        userAdmin = <div className="flex items-center justify-around gap-8 ">
            <Link href="/login" legacyBehavior>
                <button
                    className={"w-[90px] h-[40px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>ورود
                </button>
            </Link>
            <Link href={"/register"} legacyBehavior>
                <button
                    className={"w-[90px] h-[40px] bg-black text-white rounded-md hover:bg-[#143fcd]"}>ثبت
                    نام
                </button>
            </Link>
        </div>
    }
    return (
        <nav
            className="container-app bg-white w-full fixed z-[1000] md:relative border-b-2 md:border-0">
            <div className="md:flex items-center justify-between px-4 md:border-b ">
                <div className=" flex items-center justify-between py-2 md:py-5 md:flex ">
                    <a href="#">
                        <section className={"between-items py-[30px] "}>
                            <div className={"text-3xl font-extrabold col-items"}>
                                <div className={"flex items-center pt-1 w-16 h-8"}>
                                    <img src="/images/Asset.png" alt="logo"/>
                                </div>
                            </div>
                            <div>
                            </div>
                        </section>
                    </a>
                    <div className="md:hidden">
                        <button className="open"
                                onClick={() => setState(!state)}
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
                <div className={"flex "}>
                    <div
                        className={` md:px-[36px]  md:h-0  justify-self-center pb-3 md:block md:pb-0 ${state ? 'block ' : 'hidden transMovemt'}`}>
                        <ul className="  flex flex-start md:items-center  md:space-x-8 md:space-x-reverse md:space-y-0 pt-2  flex-col md:flex-row ">
                            <li   className=" text-gray-900 hover:text-[#143fcd]  md:hover_Me hover:overflow-hidden text-[16px]  py-4 md:py-0">
                                <Link href={"/"} legacyBehavior>
                                    <a>
                                        تماس با ما
                                    </a>
                                </Link>
                            </li>
                            <li  onClick={handleNavigate} className="cursor-pointer text-gray-900 hover:text-[#143fcd]  md:hover_Me hover:overflow-hidden text-[16px]  py-4 md:py-0">
                                <a >
                                    پروژها
                                </a>

                            </li>
                        </ul>
                        <div className="flex md:hidden items-center py-6 gap-8">
                            {userAdmin}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-around gap-8 ">
                        {userAdmin}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
