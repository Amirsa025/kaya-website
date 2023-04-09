import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import CompleteProfile from "@/app/components/form/complate-profile";
import useAuth from "@/app/helper/useAuth";
const Mission: NextPageWithLayout = () => {
    const {data, isFetching, isLoading, error} = useAuth()
    console.log(data)
    if(data?.data.verify_status==="unverified" ||data?.data.verify_status==="pending"){
        return (
            <>
                <CompleteProfile/>
            </>
        );
    }else if (data?.data.verify_status==="verified"){

        return <div>
                <div>
                    <label htmlFor="">نام</label>
                    <div className={"px-4 py-8"}>
                        <div
                            className={"flex flex-col flex-wrap lg:flex-row  w-full items-center justify-between"}>
                            <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                <div className={"pt-4 text-center md:text-right"}>
                                    <span className={"py-2 text-[16px] md:text-[14px] font-bold"} >اطلاعات حساب کاربری</span>
                                </div>
                                <div className={"flex-1"}>
                                    <div className={"grid grid-cols-1 lg:grid-cols-2 w-full"}>
                                        <div className={"lg:px-8 flex flex-col w-full  pt-4  space-y-3 "}>
                                            <label className={"pr-2 text-[12px] font-bold"} htmlFor="first_name"> نام </label>
                                            <input
                                                disabled
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                className={" focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                placeholder={data?.data.profile.first_name}
                                            />
                                            {/*{showError.first_Name ? <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{showError.first_Name}</p> :null }*/}
                                        </div>
                                        <div className={"lg:px-8 flex flex-col w-full  py-4  space-y-3 "}>
                                            <label htmlFor="last_name" className={"pr-2 text-[12px] font-bold "}> نام
                                                خانوادگی </label>
                                            <input type="text"
                                                   disabled
                                                   id="last_name"
                                                   name="last_name"
                                                   className={" focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={data?.data?.profile.last_name}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.last_name}</p>*/}
                                        </div>
                                        <div className={"lg:px-8 flex flex-col w-full  pb-4  space-y-3 "}>
                                            <label htmlFor="national_id" className={"pr-2 text-[12px] font-bold"}> کد ملی </label>
                                            <input type="number"
                                                   disabled
                                                   id="national_id"
                                                   name="national_id"
                                                   className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={data?.data?.profile.national_id}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.national_id}</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                <div className={"pt-4 text-center md:text-right"}>
                                    <span className={"py-2 text-[16px] md:text-[14px] font-bold"}>اطلاعات پرداخت </span>
                                </div>
                                <div className={"flex-1 md:border-t py-4 py-4"}>
                                    <div className={" grid grid-cols-1 lg:grid-cols-2 w-full"}>
                                        <div className={"md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <label htmlFor="accountNumber" className={"pr-2 text-[12px] font-bold"}>شماره شبا </label>
                                            <input type="text"
                                                   disabled
                                                   id="sheba_number"
                                                   name="sheba_number"
                                                   className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={data?.data?.profile.sheba_number}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.sheba_number}</p>*/}
                                        </div>
                                        <div className={"md:pr-[4rem] lg:pr-[47px] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <label htmlFor="card_number" className={"pr-2 text-[12px] font-bold "}>شماره کارت </label>
                                            <input type="text"
                                                   disabled
                                                   id="card_number"
                                                   name="card_number"
                                                   className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={data?.data?.profile.card_number}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.card_number}</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                <div className={"pt-4 text-center md:text-right"}>
                                    <span className={"py-2 text-[16px] md:text-[14px] font-bold"}>آدرس و نشانی </span>
                                </div>
                                <div className={"flex-1 md:border-t py-4 py-4"}>
                                    <div className={" grid grid-cols-1 xl:grid-cols-2 w-full"}>
                                        <div className={"md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <label htmlFor="accountNumber" className={"pr-2 text-[12px] font-bold"}>آدرس و نشانی </label>
                                            <textarea
                                                disabled
                                                id="Address"
                                                name="address"
                                                className={"!h-[10rem] py-2 px-2 focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                placeholder={data?.data?.profile.address}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    }
    return <></>
};
Mission.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default Mission;