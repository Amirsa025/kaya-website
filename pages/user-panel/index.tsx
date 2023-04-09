import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import BannerTop from "@/app/shared/banner-content";
import useAuth from "@/app/helper/useAuth";
import {toast} from "react-toastify";
import Link from "next/link";
import {Alert} from "@material-tailwind/react";

const UserPanelPage: NextPageWithLayout = () => {
    const {data, isFetching, isLoading, error} = useAuth()
    console.log(data?.data.connected_to_projects_bot)
    if (data?.data.verify_status === 'unverified') {
        return (
            <div className={"container-app"}>
                <div
                    className={"bg-red-500 text-white w-1/2 flex w-full px-12 mx-auto py-2 rounded-md items-center"}>
                    <div className={" flex items-center justify-center w-full"}>
                        <div>
                            <span className={"text-[15px] "}>احراز هویت شما کامل نیست .</span>
                        </div>
                        <div className={"underline text-[12px] font-medium"}>
                            <Link href={'/user-panel/missions'}>تکمیل ثبت نام</Link>
                        </div>
                    </div>
                </div>

            </div>
        )
    } else if (data?.data.verify_status === 'pending') {
        return (
            <div className={"container-app"}>
                <BannerTop title={"احراز هویت شما در حال بررسی است "}/>
            </div>
        )
    } else if (data?.data.verify_status === 'verified') {
        return (
            <div className={"xl:container-app"}>
                <div
                    className={"flex flex-col lg:pt-10 pt-32 flex-col lg:flex-row space-y-6  space-x-3.5 pb-8"}>
                    <div className={"bg-gray-100 w-full  lg:w-10/12 py-6 rounded-md px-2  "}>
                        <div
                            className={"flex items-center px-4 border border-gray-200 bg-gray-50 rounded-md py-2"}>
                            <div>
                                <svg className="text-yellow-900 flex-shrink-0" width="30"
                                     height="30" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect width="30" height="30" rx="5" fill="currentColor"></rect>
                                    <path
                                        d="M8 19.6667C8 22.4117 9.29433 23 15.3333 23C21.3723 23 22.6667 22.4117 22.6667 19.6667C22.6667 16.9217 21.3723 16.3333 15.3333 16.3333C9.29433 16.3333 8 16.9217 8 19.6667Z"
                                        fill="white"></path>
                                    <path
                                        d="M11.3333 11C11.3333 13.2091 13.1242 15 15.3333 15C17.5425 15 19.3333 13.2091 19.3333 11C19.3333 8.79086 17.5425 7 15.3333 7C13.1242 7 11.3333 8.79086 11.3333 11Z"
                                        fill="white"></path>
                                </svg>
                            </div>
                            <span
                                className={"px-2 text-yellow-800 font-medium text-[1.5rem]"}>{data?.data.profile?.first_name}</span>
                            <span className={"text-gray-700  text-[14px]"}>به داشبورد خوش آمدید</span>
                        </div>
                    </div>

                </div>
                {
                    data?.data.connected_to_projects_bot === false ?
                        <div className={"border border-gray-50 rounded-md w-full  lg:w-10/12"}>
                            <div className={"bg-gray-100 rounded-md mr-0 py-6 px-2 "}>
                                <div
                                    className={" flex items-center gap-2 item lg:items-center border w-full block px-4 py-2 rounded-md border-gray-200 bg-gray-50"}>
                                    <div>
                                        <svg className="text-blue-700 flex-shrink-0" width="30"
                                             height="30"
                                             viewBox="0 0 30 30" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <rect width="30" height="30" rx="5"
                                                  fill="currentColor"></rect>
                                            <path
                                                d="M15 7C21.588 7 23 8.412 23 15C21.6667 21.6667 15 23 15 23C15 23 8.33333 21.6667 7 15C7 8.412 8.412 7 15 7ZM18.1381 12.5286C18.3984 12.789 18.3984 13.2111 18.1381 13.4714L14.8047 16.8047C14.5444 17.0651 14.1223 17.0651 13.8619 16.8047L12.5286 15.4714C12.2683 15.2111 12.2683 14.789 12.5286 14.5286C12.789 14.2683 13.2111 14.2683 13.4714 14.5286L14.3333 15.3905L17.1953 12.5286C17.4556 12.2683 17.8777 12.2683 18.1381 12.5286Z"
                                                fill="white" clip-rule="evenodd"
                                                fill-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div
                                        className={"flex  flex-col sm:flex-row flex-wrap sm:flex-nowrap sm:items-center  space-y-2"}>
                                        <span
                                            className={" text-gray-800 text-[12px] pt-1 md:text-[14px]"}> لطفا ربات تلگرامی کایا را برای سریعتر دریافت کردن اعلانات سایت فعال کنید.</span>
                                        <Link href={data?.data.messages_bot_connection_url}
                                              className={"sm:mx-2 text-blue-600 hover:text-blue-400  hover:underline text-[12px]  sm:mx-4 cursor-pointer"}> فعال‌سازی
                                            ربات تلگرام</Link>
                                    </div>
                                </div>
                            </div>
                        </div> : <div></div>
                }

            </div>
        )
    }
    return <></>
};
UserPanelPage.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default UserPanelPage;
