import React, {useState} from 'react';
import Link from "next/link";
import {useFormik} from "formik";
import * as yup from 'yup';
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import Router from "next/router";
import {storeToken} from "@/app/helper/auth";


const MainSginup = () => {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const cookie = new Cookies()

    let phonenumberPattern = /^0?9[0-9]{9}$/
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const SginupSchema: any = yup.object().shape({
        phoneNumber: yup.string().required('لطفاشماره همراه خود را وارد کنید').min(4, 'لطفا در در وارد کردن تلفن همراه  خود دقت کنید')
            .matches(phonenumberPattern, 'لطفا شماره تلفن خود را به درستی وارد کنید. '),
        password: yup.string().required('لطفا در رمز خود را وارد کنید.').min(8, 'لطفا در در وارد کردن رمز عبور خود دقت کنید')
            .matches(passwordPattern, 'رمز عبور براساس حروف کوچیک و حروف بزرگ و اعداد می باشد. ')
    });

    const Myformik = useFormik({
        initialValues: {
            phoneNumber:'',
            password: ''
        },
        validationSchema: SginupSchema,
        onSubmit: async (values:any) => {
             const responseData= await callApi().post('/users/sign_up',{
                    phone_number:values.phoneNumber,
                    password :values.password
                },)
                if(responseData.status===200 && responseData.data.phone_verified===false){
                    storeToken(responseData?.data?.token)
                    localStorage.setItem("verify",responseData?.data?.phone_verified)
                    await Router.replace('/verify-phone');
                }
                if(responseData.data.code===1001 && responseData.data.status===400){
                    return alert('در وارد کردن url  دقت فرمایید.')
                }
                if (responseData.data.status===400 && responseData.data.code===1002 && responseData.data.phone_verified===true){
                    return alert('این کاربر قبلا ثبت نام کرده است .')
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
                <h1 className={"text-4xl font-bold text-[1rem]"}> ثبت نام کاربران </h1>
                <span
                    className={"block pt-[18px] pb-[24px]"}>شغل ساخته شده برای شما را پیدا کنید!</span>
                {/*login form width google */}
            </div>

            {/*form */}
            <div className={"w-full"}>
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

                    <div className={"cursor-pointer"}>
                        <button
                            className={"cursor-pointer  w-full h-[40px]  border rounded-md bg-black text-white rounded-lg hover:bg-[#143fcd] "}>مرحله
                            بعد
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