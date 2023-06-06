import React from 'react';
import Link from "next/link";
import { UserNavigation} from "@/app/constant/MockData";
import {Tooltip} from "@mui/material";
import { usePathname } from 'next/navigation';
const AsidePanel = () => {
    const pathname = usePathname();
    return (
        <>
            <div className={"relative z-[1000] container-app flex  md:block lg:flex w-full lg:w-[12rem] "}>
                <div
                    className={" flex lg:flex-col gap-y-4 hidden md:flex md:flex-row  md:justify-between lg:justify-start lg:fixed"}>
                    {
                        UserNavigation.map((item)=>{
                            // @ts-ignore
                            return (
                                // @ts-ignore
                                <Link href={item.path} legacyBehavior key={item.id} className={"w-20 h-12  flex items-center justify-center"}>
                                    <Tooltip title={item.title} placement="left">
                                        <div>
                                            <div className={"w-20 h-12  hover:bg-[#f2f8ff] rounded-md hover:cursor-pointer flex items-center justify-center"} >
                                                <a  href={item.path} className={pathname == item.path ? "block w-20 h-12 text-blue-700  flex items-center justify-center bg-[#f2f8ff] rounded-md hover:cursor-pointer" : ""}>
                                                    {
                                                        pathname == item.path ? <i className={`${item.icon} text-[#3d5a6c] text-[1.5rem]`}></i>: <i className={`${item.icon} text-gray-400 text-[1.5rem]`}></i>
                                                    }
                                                </a>
                                            </div>
                                        </div>
                                    </Tooltip>

                                </Link>

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
                                    // @ts-ignore
                                    <Link href={item.path} key={item.id} legacyBehavior>
                                        <Tooltip title={item.title} placement="top">
                                            <div
                                                className={" flex items-center justify-center"}>
                                                <div className={"w-20 h-12 hover:bg-[#f2f8ff] rounded-md hover:cursor-pointer flex items-center justify-center  "} >
                                                    <a href="" className={pathname== item.path ? "block w-20 h-12 flex items-center justify-center bg-[#f2f8ff] rounded-md hover:cursor-pointer" : ""}>
                                                        <i className={`${item.icon} text-[1.5rem]`}></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </Tooltip>

                                    </Link>
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