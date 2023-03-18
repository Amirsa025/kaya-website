import React from 'react';

const ProjectList = () => {
    return (
        <section className={" w-full flex flex-col md:flex-row px-2 md:py-2  md:border-t   hover:bg-gray-50"}>
            <div className={" md:flex-1  md:mx-2 py-2   "}>
                <div className={"flex items-center md:gap-4 gap-2"}>
                    <div>
                        <a href={"#"}>
                            <span className={"font-bold text-[0.81rem]"}>رونویسی عمومی</span>
                        </a>
                    </div>
                    <div>
                    <span
                        className={"pt-1 text-[8px] sm:text-[10px] text-gray-700 font-medium"}>۶ روز مهلت </span>
                    </div>
                    <div className={"flex  items-center gap-4 text-green-600  text-[0.8rem]"}>
                        <i className="ri-wallet-fill text-[1.5rem]"></i>
                        <span className={"pt-1"}>تایید شده </span>
                    </div>
                </div>
                <div className={"py-[1.563rem] text-[13px]"}>
                    <p className={"text-gray-700 font-normal text-[11px] md:text-[13px] leading-8 "}>من متوجه پروفایل شما شدم و می خواهم
                        پروژه خود را به شما ارائه دهم. ما می توانیم در مورد هر جزئیاتی در چت صحبت
                        کنیم.

                        پروژه خود را به شما ارائه دهم. ما می توانیم در مورد هر جزئیاتی در چت صحبت
                        کنیم.

                    </p>
                </div>
                <div className={"grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-y-2"}>
                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                    <div>
                        <span className={" text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>

                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                    <div>
                        <span className={"text-[12px] text-blue-400 hover_link"}>توسعه اجایل</span>
                    </div>
                </div>
            </div>
            <div className={"md:border-r   md:w-1/3 lg:w-1/3 px-4   py-4 space-y-4  border-t md:border-t-0 "}>
                    <div className={"space-y-6"}>
                        <div className={"flex items-center gap-2"}>
                            <span className={"block text-[12px] font-bold"}>قیمت پروژه:</span>
                            <span className={"block text-[13px] font-bold"}>150  تومان </span>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <span className={"block text-[12px] font-bold"}>لینک پروژه</span>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <span className={"block text-[13px] font-bold"}>کشور:</span>
                            <div>
                                <span className={"text-[12px] text-blue-400 hover_link"}>ایران</span>
                            </div>
                        </div>
                        <div className={"flex items-center gap-2 py-[24px]"}>
                            <button className={"block text-[13px] font-bold bg-green-500 px-4 py-2 md:px-3 lg:px-4 text-white"}>ارسال درخواست </button>
                        </div>
                    </div>

            </div>
        </section>
    );
};

export default ProjectList;