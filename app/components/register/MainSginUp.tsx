import React from 'react';
import Link from "next/link";
const MainSginup = () => {
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
                    <span className={"block pt-[18px] pb-[24px]"}>شغل ساخته شده برای شما را پیدا کنید!</span>
                        {/*login form width google */}
                </div>
            {/*form */}
                <div className={"w-full"}>
                    <form className={"flex flex-col space-y-4 "}>
                        <input type="text" className={" w-full text-gray-800 px-2  h-[48px] border border-gray-500 rounded-md outline-0"} placeholder={"تلفن همراه خود را وارد کنید..."} />
                            <div className={""}>
                                <button className={"w-full h-[40px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd]"}>مرحله بعد </button>
                            </div>
                            <div>
                                <span className={"text-[14px]"}>ورود کاربران ؟ </span>
                                <Link href={"/login"} legacyBehavior>
                                    <a href="#" className={"hover:text-[#3078ca] font-bold w-12 h-12 border-b-2 border-transparent hover:border-b-[#3078ca] py-2 "}>وارد شدن  </a>
                                </Link>
                            </div>
                    </form>
                </div>
        </div>
    );
};

export default MainSginup;