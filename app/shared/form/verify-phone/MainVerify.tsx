import {useFormik} from "formik";
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import Router, {useRouter} from "next/router";
import {codeVerifySchema} from "@/app/shared/form/verify-phone/vaildation";
import {toast} from "react-toastify";
import Image from "next/image";

const MainVerify = () => {
    //variable
    const cookie = new Cookies()
    const ACCESS_TOKEN = cookie.get('signUp')

    //state
    const[disable ,setDisable] =useState(false)
    // Set up state to track whether the form is completed

    //Effect
    const router = useRouter();
    useEffect(() => {
        const handleRouteChangeStart = (url:any) => {
            if (url === '/' || url==='/login') {
                cookie.remove('signUp');
            }
        };
        router.events.on('routeChangeStart', handleRouteChangeStart);
        return () => {
            router.events.off('routeChangeStart', handleRouteChangeStart);
        };
    }, []);

    //function
    const SignVerify = useFormik({
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
                if(responseData.status===200 && responseData.data.phone_verified===true){
                    toast.success('ثبت نام اولیه شما باموفقیت  انجام شد!', {
                        position: "top-center",
                        className:"toast-success-container",
                        closeButton: false,
                        autoClose: 1000,
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
            }catch (error:any){
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
                setTimeout(async ()=> {
                    await Router.replace('/')
                    cookie.remove('signUp')
                },2000)
            }
        },
    });
    return (
        <div className={" flex flex-col w-[20.25rem]  mx-auto space-y-8 pt-12 text-[#0e1111]"}>
            {/*logo*/}
            <div className={"flex items-center pt-1 w-16 h-8"}>
                <Link href={"/"}>
                    <Image width={32} height={32} src="/images/Asset.png" alt="logo"/>
                </Link>
            </div>
            <div>
                <h1 className={"text-4xl font-bold text-[1rem]"}>ورود کاربران </h1>
                <span className={"block pt-[18px] pb-[24px]"}>شغل ساخته شده برای شما را پیدا کنید!</span>
                {/*login form width google */}
            </div>
            {/*form */}
            <div className={"w-full"}>
                <form onSubmit={SignVerify.handleSubmit} className={"flex flex-col space-y-4 "}>
                    <div>
                        <input type="text"
                               id="codeVerify"
                               name="codeVerify"
                               onChange={SignVerify.handleChange}
                               value={SignVerify.values.codeVerify}
                               className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-500 rounded-md outline-0"}
                               placeholder={"کد که sms شده را وارد کنید..."}
                        />
                        <p className=" animate__animated animate__fadeInDown animate__delay-1s text-red-500 pt-1 text-[12px] text-right font-light">{SignVerify.errors.codeVerify}</p>
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