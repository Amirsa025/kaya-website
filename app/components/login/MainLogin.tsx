import React, {useState} from 'react';
import Link from "next/link";
import {useFormik} from "formik";
import * as yup from 'yup';
import callApi from "@/app/helper/callApi";
import Router from "next/router";
import Cookies from "universal-cookie";
import {storeToken} from "@/app/helper/auth";
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import GuestLayout from "@/app/components/gusetLayout";

const MainLogin:NextPageWithLayout = () => {

    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const cookie = new Cookies()
    let phonenumberPatterns = /^0?9[0-9]{9}$/
    let passwordPattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const SginINSchema: any = yup.object().shape({
        loginNumber: yup.string().required('لطفاشماره همراه خود را وارد کنید').min(4, 'لطفا در در وارد کردن تلفن همراه  خود دقت کنید')
            .matches(phonenumberPatterns, 'لطفا شماره تلفن خود را به درستی وارد کنید. '),
        password: yup.string().required('لطفا در رمز خود را وارد کنید.').min(8, 'لطفا در در وارد کردن رمز عبور خود دقت کنید')
            .matches(passwordPattern, 'رمز عبور براساس حروف کوچیک و حروف بزرگ و اعداد می باشد. ')
    });

    const Myformik = useFormik({
        initialValues: {
            loginNumber: '',
             password: ''
        },
        validationSchema: SginINSchema,
        onSubmit:
            async (values:any) => {
            const responseData= await callApi().post('/users/sign_in',{
                phone_number:values.loginNumber,
                password :values.password
            },)
            //    satus 200
                if(responseData.status===200 && responseData.data.phone_verified===true){
                      await  Router.replace('/user-panel')
                    storeToken(responseData?.data?.token)
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
            </div>
            {/*form */}
            <div className={"w-full"}>
                <form onSubmit={Myformik.handleSubmit} className={"flex flex-col space-y-4 "}>
                    <div>
                        <input
                            id="loginNumber"
                            name="loginNumber"
                            type="text"
                            onChange={Myformik.handleChange}
                            value={Myformik.values.loginNumber}
                            className={"focus-visible:shadow-xl focus:outline-0  placeholder:text-[13px] w-full text-gray-800 px-2  h-[48px] border border-gray-500 rounded-md outline-0"}
                            placeholder={"شماره همراه خود را وارد کنید..."}/>
                             {Myformik.touched.loginNumber && Boolean(Myformik.errors.loginNumber)}
                              <p className="text-red-500 pt-2 text-[12px] text-right font-light">{Myformik.errors.loginNumber}</p>
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
                    <a href="#">
                        <span
                            className={"text-[14px] hover:text-[#3078ca] w-12 h-12 border-2 border-transparent hover:border-b-[#3078ca] py-2"}>فراموشی رمز ؟ </span>
                    </a>
                    <div className={""}>
                        <button type={"submit"}
                            className={"w-full h-[40px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd]"}>ورود
                        </button>
                    </div>
                    <div>
                        <span className={"text-[14px]"}>هنوز ثبت نام نکردید ؟ </span>
                        <Link href={"/register"} legacyBehavior>
                            <a href="#"
                               className={"hover:text-[#3078ca] font-bold w-12 h-12 border-b-2 border-transparent hover:border-b-[#3078ca] py-2 "}>ثبت
                                نام </a>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default MainLogin;