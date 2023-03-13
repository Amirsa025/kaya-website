import React, {useState} from 'react';
import Link from "next/link";
import {useFormik} from "formik";
import * as yup from 'yup';
import callApi from "@/app/helper/callApi";
import Router from "next/router";
import {storeToken} from "@/app/helper/auth";
import {NextPageWithLayout} from "@/pages/_app";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";

const useLogin = () => {
    return useMutation((formPayload:void) => {
        return callApi().post('/users/sign_in',{
              //@ts-ignore
            phone_number:formPayload?.loginNumber,
             //@ts-ignore
            password :formPayload?.password
        })
    });
};
const MainLogin:NextPageWithLayout = () => {
    const { mutate ,isSuccess,isError,isLoading } = useLogin();
    const [isRevealPwd, setIsRevealPwd] = useState(false);

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
                mutate(values, {
                    onSuccess:  (res) => {
                        if(res.status===200 && res.data.phone_verified===true){
                            setTimeout(async()=>  await  Router.replace('/user-panel'),3000)
                            toast.success('شما باموفقیت  وارد شدید', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            });
                            storeToken(res?.data?.token)
                        }
                    },
                    onError: (response) => {
                        toast.error('با خطا مواجه شدید لطفا دوباره امتحان کنید.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                        console.log(response);
                    }
                });

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
                {isSuccess && <p className="center-items text-[12px] py-2  text-green-500">با موفقیت وارد شدید!</p>}
                {isError && <p className="center-items text-[12px] py-2 text-red-500">در ورود با خطا مواجه شدید</p>}
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
                            className={"w-full h-[40px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd]"}>
                                    ورود    {isLoading && <div className="px-4 flex center-items">
                                <ClipLoader size={20}  color="#fffff" />
                            </div>}
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