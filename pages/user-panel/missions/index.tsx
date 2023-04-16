import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import CompleteProfile from "@/app/shared/form/complate-profile";
import useAuth from "@/app/helper/useAuth";
import ViewProfile from "@/app/shared/form/view-profile/VeiwProfile";
import {MoonLoader} from "react-spinners";
const Mission: NextPageWithLayout = () => {
    const {data, isFetching, isLoading, isError} = useAuth()
    if(isLoading){
        return  <div className={"lg:px-24 w-full"}>
            <div className={"text-white center-item  tex-[12px] h-16 bg-blue-400 rounded-md px-2  w-full lg:w-10/12 "}>
                <div className={" rounded-md w-full py-2 lg:px-1 bg-blue-300 flex  items-center  gap-4"}>
                    <div className={"px-3"}>
                        <MoonLoader
                            color="#162f48"
                            size={20}
                        />
                    </div>
                    <span>  درحال دریافت اطلاعات از سرور...</span>
                </div>

            </div>
        </div>
    }
    if(isError) {
        return   <div className={"bg-red-300 rounded-md w-full lg:w-10/12 py-4 px-6"}>
            <div className={"bg-red-200 py-2  flex items-center gap-8 text-white  w-full tex-[12px]   rounded-md px-8"}>
                <svg className="text-red-600 flex-shrink-0" width="30" height="30"
                     viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="5" fill="currentColor"></rect>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M22.9881 15.0544C22.9744 15.176 22.9547 15.2588 22.9154 15.4243C21.7287 20.421 17.5155 22.2845 15.7681 22.8529C15.4666 22.951 15.3159 23 15 23C14.6841 23 14.5334 22.951 14.2319 22.8529C12.4845 22.2845 8.27126 20.421 7.08458 15.4243C7.04526 15.2588 7.02559 15.176 7.01193 15.0544C6.99826 14.9328 6.99919 14.8325 7.00106 14.6321C7.05944 8.3602 8.54671 7 15 7C21.4533 7 22.9406 8.3602 22.9989 14.6321C23.0008 14.8325 23.0017 14.9328 22.9881 15.0544ZM15 11.0166C15.3682 11.0166 15.6667 11.3163 15.6667 11.686V15.7026C15.6667 16.0723 15.3682 16.372 15 16.372C14.6318 16.372 14.3333 16.0723 14.3333 15.7026V11.686C14.3333 11.3163 14.6318 11.0166 15 11.0166ZM14.3333 17.7109C14.3333 17.3411 14.6318 17.0414 15 17.0414C15.3682 17.0414 15.6667 17.3411 15.6667 17.7109C15.6667 18.0806 15.3682 18.3803 15 18.3803C14.6318 18.3803 14.3333 18.0806 14.3333 17.7109Z"
                          fill="white"></path>
                </svg>
                <span>خطایی پیش بینی نشده ای به وجود امده دوباره امتحان کنید.</span>
            </div>

        </div>
    }
    if(data?.data.verify_status==="unverified" ||data?.data.verify_status==="pending"){
        return (
            <>
                <CompleteProfile/>
            </>
        );
    }else if (data?.data.verify_status==="verified"){

        return (
            <div>
                <ViewProfile data={data}></ViewProfile>
            </div>
            )
    }
    return <></>
};
Mission.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default Mission;