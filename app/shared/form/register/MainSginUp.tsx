import React, {useState} from 'react';
import Link from "next/link";
import {useFormik} from "formik";
import Router from "next/router";
import {storeToken, useSginUp} from "@/app/helper/auth";
import {SginupSchema} from "@/app/shared/form/register/vaildation";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import Cookies from "universal-cookie";

const MainSignup = () => {
 const [isRevealPwd, setIsRevealPwd] = useState(false);
   const cookie = new Cookies()
    const {mutate,isError,isSuccess,error, isLoading} = useSginUp()
    const[disable ,setDisable] =useState(false)
    const SignupForm = useFormik({
        initialValues: {
            phoneNumber:'',
            referralCode: '',
            password: '',
        },
        validationSchema: SginupSchema,
        onSubmit: (values:any) => {
           mutate(values,{
                onSuccess :async(responseData:any)=>{
                    if(responseData.status===200 && responseData.data.phone_verified===false){
                       setTimeout(async ()=>{
                           setDisable(true)
                           storeToken(responseData?.data?.token,'signUp')
                           cookie.remove('token')
                           await Router.replace('/verify-phone')},2000)
                    }
                },
               onError :async (err:any)=>{
                    console.log(err)
               }
           })
        },
    });

    // @ts-ignore
    return (
        <div className={" flex flex-col w-[20.25rem]  mx-auto space-y-8 pt-12 text-[#0e1111]"}>
            {/*logo*/}
            <div className={"flex items-center pt-1 w-16 h-8"}>
                <Link href={"/"}>
                    <img src="/images/Asset.png" alt="logo"/>
                </Link>
            </div>
            <div>
                <h1 className={"text-4xl font-bold text-[1rem]"}> ثبت نام کاربران </h1>
                <span
                    className={"block pt-[18px] pb-[24px]"}>شغل ساخته شده برای شما را پیدا کنید!</span>
                {/*login form width google */}
            </div>

            {/*form */}
            <div className={"w-full"}>
                {isSuccess && <p className="animate__animated animate__fadeInDown animate__delay-1s center-items text-[12px] py-2  text-green-500">تبریک !!! مراحل را ادامه دهید!</p>}
                {/* @ts-ignore*/}
                {isError && <div className="animate__animated animate__fadeInDown animate__delay-1s text-red-500 center-items text-[12px] py-2">{error.response?.data?.code===1002 ?<div>این شماره وجود دارد. </div>:null}</div>}
                {
                    //@ts-ignore
                    isError && <div className="animate__animated animate__fadeInDown animate__delay-1s text-red-500 center-items text-[12px] py-2 text-[12px] text-right font-light">{error?.response?.data?.code===1005 ?<div>کد معرف شما نامعتبر است</div>:null}</div>
                }
                <form onSubmit={SignupForm.handleSubmit} className={"flex flex-col space-y-4 "}>
                    <div>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={SignupForm.handleChange}
                            value={SignupForm.values.phoneNumber}
                            className={"overflow-hidden w-full text-gray-800 px-2 placeholder:text-[13px]  h-[48px] border border-gray-500 rounded-md outline-0"}
                            placeholder={"تلفن همراه خود را وارد کنید..."}/>
                               {SignupForm.touched.phoneNumber && Boolean(SignupForm.errors.phoneNumber)}
                                <p className="text-red-500 pt-2 text-[12px] text-right font-light">{SignupForm.errors.phoneNumber}</p>
                    </div>
                    <div className={"relative"}>
                        <input
                            type={isRevealPwd ? "text" : "password"}
                               id="password"
                               name="password"
                               onChange={SignupForm.handleChange}
                               value={SignupForm.values.password}
                               className={" w-full text-gray-800 px-2 w-full placeholder:text-[13px]   h-[48px] border border-gray-500 rounded-md outline-0"}
                               placeholder={"رمز خود را وارد کنید..."}/>
                                <i onClick={() => setIsRevealPwd(prevState => !prevState)}
                                   className={`absolute top-3 left-3 ${isRevealPwd ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                        {SignupForm.touched.password && Boolean(SignupForm.errors.password)}
                        <p className="animate__animated animate__fadeInDown animate__delay-1s text-red-500 pt-2 text-[12px] text-right font-light">{SignupForm.errors.password}</p>
                    </div>
                    <div>
                        <input
                            id="referralCode"
                            name="referralCode"
                            type="text"
                            onChange={SignupForm.handleChange}
                            value={SignupForm.values.referralCode}
                            className={"overflow-hidden w-full text-gray-800 px-2 placeholder:text-[13px]  h-[48px] border border-gray-500 rounded-md outline-0"}
                            placeholder={"کد معرف خود را وارد کنبد..."}/>
                        {SignupForm.touched.phoneNumber && Boolean(SignupForm.errors.referralCode)}

                    </div>
                    <div className={"cursor-pointer "}>
                        <button
                            type={"submit"}
                            disabled={disable}
                            className={`w-full h-[40px] flex items-center justify-center gap-4  border rounded-md ${!disable ? 'bg-black':'bg-gray-500 text-white'} text-white rounded-md hover:bg-[#143fcd]`}>

                            <span>مرحله بعد</span>
                            {
                                isLoading &&
                                <div className="flex items-center justify-center ">
                                    <ClipLoader size={20} color="#fffff"/>
                                </div>
                            }
                        </button>
                    </div>
                    <div>
                        <span className={"text-[14px]"}>ورود کاربران ؟ </span>
                        <Link href={"/login"} legacyBehavior>
                            <a href="@/app/components/form/register/MainSginUp#"
                               className={"hover:text-[#3078ca] font-bold w-12 h-12 border-b-2 border-transparent hover:border-b-[#3078ca] py-2 "}>وارد
                                شدن </a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MainSignup;