import React from 'react';
import Image from "next/image";

const NeedTalent = () => {
    return (
        <section className={"container-app "}  data-aos="zoom-in-up"
                 data-aos-anchor="#example-anchor"
                 data-aos-offset="1500"
                 data-aos-duration="1500">
            {/* desktop Mode */}
            <div className={"hidden lg:grid lg:grid-cols-2 border-t  border-gray-300 lg:pt-[2.188rem]"}>
                <div>
                    <div className={""}>
                    <span
                        className={"text-black text-[12px] font-bold"}>به استعداد نیاز دارید؟</span>
                    </div>
                    <div className={""}>
                        <h2 className={"text-black text-[1.4rem] font-bold"}>چرا استخدام کنندگان ما
                            را
                            دوست دارند؟</h2>
                    </div>
                    <div className={""}>
                        <div className={"flex items-center gap-4 pt-[2.5rem]"}>
                            <Image
                                src="/images/Team.svg"
                                alt={"Team"}
                                width={40}
                                height={40}
                            />
                            <span className={"text-[16px] text-black text-justify leading-6"}>
                                <strong>۸ میلیون</strong>  نامزد پاسخگو و آماده راه اندازی، با تمام اطلاعاتی که برای بررسی آنها نیاز دارید
                        </span>
                        </div>
                        <div className={"flex items-center gap-4 pt-[2.5rem] "}>
                            <Image
                                src="/images/Settings.svg"
                                alt={"Team"}
                                width={40}
                                height={40}
                            />
                            <span className={"text-[14px] text-black text-justify leading-6"}>
همه چیزهایی که برای شروع استخدام خود نیاز دارید - پست های شغلی، برندسازی شرکت و ابزارهای منابع انسانی را در عرض 10 دقیقه به صورت رایگان راه اندازی کنید.
                            </span>
                        </div>
                        <div className={"flex items-center gap-4 pt-[2.5rem] "}>
                            <Image
                                src="/images/Template.svg"
                                alt={"Template"}
                                width={40}
                                height={40}
                            />
                            <span className={"text-[14px] text-black text-justify leading-6"}>
یک سیستم ردیابی رایگان متقاضی، یا یکپارچه سازی رایگان با هر ATS که قبلاً استفاده می کنید                            </span>
                        </div>
                        <div className={" py-[2.5rem] "}>
                            <p className={"text-[14px] text-justify leading-6"}>
                                به علاوه، ما می توانیم بررسی را برای شما انجام دهیم! با Curated، ما
                                استعدادهای برتر فناوری جهان را بررسی می کنیم و کاندیداها را مستقیماً
                                ۲ بار در هفته برای شما برجسته می کنیم.</p>
                        </div>
                    </div>
                    <div className={"flex gap-4 mb-12"}>
                        <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>یادگیری بیشتر </a>
                        <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd] "}>ثبت نام کن </a>
                    </div>
                </div>
                <div  >
                    <div className={"flex   items-center justify-center md:justify-end lg:justify-center"}>
                        <Image
                            src="/images/min-p-500.png" alt={"Star"}
                            width={500}
                            height={500}
                            className={"opacity-0 transition-opacity"}
                            onLoadingComplete={(img)=>{
                                img.classList.remove('opacity-0')
                            }}
                        />
                    </div>
                </div>
            </div>
            {/*mobile size && tablet size */}
            <div className={" flex flex-col  lg:hidden border-t  border-gray-300 "}>
                <div className={"max-w-full flex items-center justify-center"}>
                    <Image
                        src="/images/min-p-500.png" alt={"Star"}
                        width={800}
                        height={800}
                    />
                </div>
                <div className={"pb-[29px]"}>
                    <span
                        className={"text-black text-[12px] font-bold"}>به استعداد نیاز دارید؟</span>
                </div>
                <div className={"pb-[29px]"}>
                    <h2 className={"text-black text-[1.4rem] font-bold"}>چرا استخدام کنندگان ما را
                        دوست دارند؟</h2>
                </div>
                <div className={""}>
                    <div className={"flex items-center gap-4 pt-[2.5rem]"}>
                        <Image
                            src="/images/Team.svg"
                            alt={"Team"}
                            width={40}
                            height={40}
                            className={"opacity-0 transition-opacity"}
                            onLoadingComplete={(img:any)=>{
                                img.classList.remove('opacity-0')
                            }}
                        />
                        <span className={"text-[16px] text-black text-justify"}>
                                <strong>۸ میلیون</strong>  نامزد پاسخگو و آماده راه اندازی، با تمام اطلاعاتی که برای بررسی آنها نیاز دارید
                        </span>
                    </div>
                    <div className={"flex items-center gap-4 pt-[2.5rem] "}>
                        <Image
                            src="/images/Settings.svg"
                            alt={"Team"}
                            width={40}
                            height={40}
                        />
                        <span className={"text-[14px] text-black text-justify"}>
همه چیزهایی که برای شروع استخدام خود نیاز دارید - پست های شغلی، برندسازی شرکت و ابزارهای منابع انسانی را در عرض 10 دقیقه به صورت رایگان راه اندازی کنید.
                            </span>
                    </div>
                    <div className={"flex items-center gap-4 pt-[2.5rem] "}>
                        <Image
                            src="/images/Template.svg"
                            alt={"Template"}
                            width={40}
                            height={40}
                        />
                        <span className={"text-[14px] text-black text-justify"}>
یک سیستم ردیابی رایگان متقاضی، یا یکپارچه سازی رایگان با هر ATS که قبلاً استفاده می کنید                            </span>
                    </div>
                    <div className={" py-[2.5rem] "}>
                        <p className={"text-[14px] text-justify"}>
                            به علاوه، ما می توانیم بررسی را برای شما انجام دهیم! با Curated، ما
                            استعدادهای برتر فناوری جهان را بررسی می کنیم و کاندیداها را مستقیماً ۲
                            بار در هفته برای شما برجسته می کنیم.</p>
                    </div>
                    <div className={"flex gap-4 mb-12"}>
                        <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>یادگیری بیشتر </a>
                        <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd] "}>ثبت نام کن </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NeedTalent;