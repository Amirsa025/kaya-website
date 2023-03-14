import React, {useState} from 'react';
import Link from "next/link";
import {useFormik} from "formik";
import Router from "next/router";
import {storeToken, useSginUp} from "@/app/helper/auth";
import {SginupSchema} from "@/app/components/register/vaildation";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import Cookies from "universal-cookie";

const MainSginup = () => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
   const cookie = new Cookies()
    const {mutate,isError,isSuccess, isLoading} = useSginUp()
    const[disable ,setDisable] =useState(false)
    const Myformik = useFormik({
        initialValues: {
            phoneNumber:'',
            password: ''
        },
        validationSchema: SginupSchema,
        onSubmit: (values:any) => {
           mutate(values,{
                onSuccess :async(responseData:any)=>{
                    if(responseData.status===200 && responseData.data.phone_verified===false){
                       setTimeout(async ()=>{
                           setDisable(true)
                           storeToken(responseData?.data?.token,'sginUP')
                           cookie.remove('token')
                           await Router.replace('/verify-phone')},2000)
                    }
                },
               onError :(err:any)=>{
                    console.log(err)
                   if(err.data.code===1001 && err.data.status===401){
                       toast.error('در وارد کردن url  دقت فرمایید.', {
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
                   if (err.data.status===400 && err.data.code===1002 && err.data.phone_verified===true){
                       toast.error('در وارد کردن url  دقت فرمایید.', {
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
               }
           })
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
                <h1 className={"text-4xl font-bold text-[1rem]"}> ثبت نام کاربران </h1>
                <span
                    className={"block pt-[18px] pb-[24px]"}>شغل ساخته شده برای شما را پیدا کنید!</span>
                {/*login form width google */}
            </div>

            {/*form */}
            <div className={"w-full"}>
                {isSuccess &&
                    <p className="center-items text-[12px] py-2  text-green-500">تبریک !!! مراحل را ادامه دهید!</p>}
                {isError &&
                    <p className="center-items text-[11px] py-3 text-red-500"> شماره اشتباه است یا کاربر وجود دارد لطفا مجددا امتحان کنید.</p>}
                <form onSubmit={Myformik.handleSubmit} className={"flex flex-col space-y-4 "}>
                    <div>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={Myformik.handleChange}
                            value={Myformik.values.phoneNumber}
                            className={"overflow-hidden w-full text-gray-800 px-2 placeholder:text-[13px]  h-[48px] border border-gray-500 rounded-md outline-0"}
                            placeholder={"تلفن همراه خود را وارد کنید..."}/>
                               {Myformik.touched.phoneNumber && Boolean(Myformik.errors.phoneNumber)}
                                <p className="text-red-500 pt-2 text-[12px] text-right font-light">{Myformik.errors.phoneNumber}</p>
                    </div>
                    <div className={"relative"}>
                        <input
                            type={isRevealPwd ? "text" : "password"}
                               id="password"
                               name="password"
                               onChange={Myformik.handleChange}
                               value={Myformik.values.password}
                               className={" w-full text-gray-800 px-2 w-full placeholder:text-[13px]   h-[48px] border border-gray-500 rounded-md outline-0"}
                               placeholder={"رمز خود را وارد کنید..."}/>
                                <i onClick={() => setIsRevealPwd(prevState => !prevState)}
                                   className={`absolute top-3 left-3 ${isRevealPwd ? 'ri-eye-line':'ri-eye-off-line'}`}></i>
                        {Myformik.touched.password && Boolean(Myformik.errors.password)}
                        <p className="text-red-500 pt-2 text-[12px] text-right font-light">{Myformik.errors.password}</p>
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
                            <a href="#"
                               className={"hover:text-[#3078ca] font-bold w-12 h-12 border-b-2 border-transparent hover:border-b-[#3078ca] py-2 "}>وارد
                                شدن </a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MainSginup;