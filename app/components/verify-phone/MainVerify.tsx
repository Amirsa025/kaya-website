import {useFormik} from "formik";
import React, {useState} from 'react';
import Link from "next/link";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import Router from "next/router";
import {codeVerifySchema} from "@/app/components/verify-phone/vaildation";
import {toast} from "react-toastify";

const MainVerify = () => {
    const cookie = new Cookies()
    const[disable ,setDisable] =useState(false)
    const ACCESS_TOKEN = cookie.get('sginUP')
    const Myformik = useFormik({
        initialValues: {
            codeVerify: '',
        },

        validationSchema: codeVerifySchema,
        onSubmit: async (values) => {
            try {
                const responseData= await callApi().post('/users/sign_up_phone_verify',{
                    "code":values.codeVerify
                }, {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                })
                console.log(responseData.data)
                if(responseData.status===200 && responseData.data.phone_verified===true){
                    toast.success('احراز هویت شما باموفقیت  انجام شد!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setTimeout(async()=>{
                        setDisable(true)
                        // cookie.remove('sginUP')
                        await Router.replace('/user-panel')

                    },3000)
                }
                if(responseData.data.message==="Forbidden" && responseData.status===401){
                    toast.error(' خطایی به وجود آمده است.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }catch (error:any){
                console.log(error.message)
                toast.error(' خطایی به وجود آمده است.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        },
    });
    return (
        <div className={" flex flex-col w-[20.25rem]  mx-auto space-y-8 pt-12 text-[#0e1111]"}>
            {/*logo*/}
            <div className={"flex items-center pt-1 w-16 h-8"}>
                <Link href={"/"}>
                    <img src="/images/Asset.png" alt="logo"/>
                </Link>
            </div>
                <div>
                    <h1 className={"text-4xl font-bold text-[1rem]"}>ورود کاربران </h1>
                    <span className={"block pt-[18px] pb-[24px]"}>شغل ساخته شده برای شما را پیدا کنید!</span>
                        {/*login form width google */}
                </div>
            {/*form */}
                <div className={"w-full"}>
                    <form onSubmit={Myformik.handleSubmit} className={"flex flex-col space-y-4 "}>
                        <div>
                            <input type="text"
                                   id="codeVerify"
                                   name="codeVerify"
                                   onChange={Myformik.handleChange}
                                   value={Myformik.values.codeVerify}
                                   className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-500 rounded-md outline-0"}
                                   placeholder={"کد که sms شده را وارد کنید..."}
                            />
                            <p className="text-red-500 pt-1 text-[12px] text-right font-light">{Myformik.errors.codeVerify}</p>
                        </div>
                            <div>
                                <button disabled={disable} className={`w-full h-[40px]  border rounded-md ${!disable ? 'bg-black':'bg-gray-500 text-white'} text-white rounded-md hover:bg-[#143fcd]`}>ورود</button>
                            </div>
                    </form>
                </div>
        </div>
    );
};

export default MainVerify;