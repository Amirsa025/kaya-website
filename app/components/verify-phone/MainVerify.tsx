import {useFormik} from "formik";
import React from 'react';
import Link from "next/link";
import * as yup from "yup";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import Router from "next/router";

const MainVerify = () => {
    const cookie = new Cookies()
    const ACCESS_TOKEN = cookie.get('token')
    const codeVerifySchema: any = yup.object().shape({
        codeVerify: yup.string().required('لطفا کد تایید را وارد کنید.')
    });
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
                    await Router.replace('/user-panel')
                }
                if(responseData.data.message==="Forbidden"){
                    alert("این کاربر احراز هویت شده است.")
                }
            }catch (error){
                console.log(error)
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
                                <button className={"w-full h-[40px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd]"}>ورود</button>
                            </div>
                    </form>
                </div>
        </div>
    );
};

export default MainVerify;