import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import BannerTop from "@/app/shared/banner-content";
import useAuth from "@/app/helper/useAuth";
import {toast} from "react-toastify";
import Link from "next/link";
const UserPanelPage:NextPageWithLayout = () => {
    const {data ,isFetching , isLoading , error} = useAuth()
        console.log(data)
      if(data?.data.verify_status==='unverified'){
            return  (
                <div className={"container-app"}>
                    <div className={"bg-red-500 text-white w-1/2 flex w-full px-12 mx-auto py-2 rounded-md items-center"}>
                        <div className={" flex items-center justify-center w-full"}>
                            <div>
                                <span className={"text-[15px] "}>احراز هویت شما کامل نیست .</span>
                            </div>
                            <div className={"underline text-[12px] font-medium"}>
                                <Link href={'/user-panel/complate-register'}>تکمیل ثبت نام</Link>
                            </div>
                        </div>
                    </div>

                </div>
            )
    }
      else if(data?.data.verify_status==='pending'){
        return  (
            <div className={"container-app"}>
                <BannerTop title={"احراز هویت شما در حال بررسی است "}/>
            </div>
        )
    }
      else if(data?.data.verify_status==='verified'){
        return  (
            <div className={"container-app "}>
                <div className={"flex lg:pt-10 pt-32 flex-col lg:flex-row space-y-6 space-x-3.5 pb-8"}>
                    <div><span className={"px-2 text-red-400 font-medium text-[1.5rem]"}>{data?.data.profile?.first_name}</span>به داشبورد خوش آمدید </div>
                </div>
            </div>
        )
    }
    return <></>
};
UserPanelPage.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default UserPanelPage;
