import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import { UserNavigation} from "@/app/constant/MockData";

const AsidePanel = () => {
    const router = useRouter();
    return (
        <>
            <div className={"flex  md:block lg:flex w-full lg:w-[12rem] "}>
                <div
                    className={" flex lg:flex-col gap-y-4 hidden md:flex md:flex-row  md:justify-between lg:justify-start lg:fixed"}>
                    {
                        UserNavigation.map((item)=>{
                            return (
                                <div key={item.id} className={"w-20 h-12 hover:bg-[#f2f8ff] rounded-md hover:cursor-pointer flex items-center justify-center"}>
                                    <div
                                        >
                                        <Link href={item.path} className={"w-full flex items-center justify-center pt-2"} legacyBehavior>
                                            <a  href={item.path} className={router.pathname == item.path ? "block w-20 h-12 flex items-center justify-center bg-[#f2f8ff] rounded-md hover:cursor-pointer" : ""}>
                                                <i className={`${item.icon} text-[1.5rem]`}></i>

                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div
                    className={"fixed md:hidden fixed inset-x-0 bg-white bottom-0  px-8  block  py-[20px] md:hidden"}>
                    <div className={"flex justify-between items-center"}>
                        {
                            UserNavigation.map((item)=>{
                                return (
                                    <div key={item.id}>
                                        <div
                                            className={"w-20 h-12 hover:bg-[#f2f8ff] rounded-md hover:cursor-pointer flex items-center justify-center"}>
                                            <Link href={item.path} className={"w-full flex items-center justify-center pt-2 "} legacyBehavior>
                                                <a href="" className={router.pathname == item.path ? "block w-20 h-12 flex items-center justify-center bg-[#f2f8ff] rounded-md hover:cursor-pointer" : ""}>
                                                    <i className={`${item.icon} text-[1.5rem]`}></i>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default AsidePanel;