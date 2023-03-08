import React from 'react';

const JobSeeker = () => {
    return (
        <section className={"border  border-gray-100 lg:pt-[162px]"}>
            <div className={"container-app flex flex-col-reverse lg:grid lg:grid-cols-2"}>
                <div>
                    <div className={"mb-[2rem]"}>
                        <span className={"font-bold text-[12px]"}>استعداد داشتن؟</span>
                    </div>
                    <div>
                        <span className={"font-extrabold text-[1.9rem]"}>چرا جویندگان کار ما را دوست دارند؟</span>
                    </div>
                    <div className={"py-[44.5px] space-y-6 text-[15px]"}>
                        <div className={"flex items-center gap-4"}>
                            <img src="/images/Star.svg" alt=""/>
                            <span>
                            مشاغل منحصر به فرد در استارت آپ ها و شرکت های فناوری که در هیچ جای دیگری نمی توانید پیدا کنید
                        </span>
                        </div>
                        <div className={"flex items-center gap-4 "}>
                            <img src="/images/Click.svg" alt=""/>
                            <span>
                            مشاغل منحصر به فرد در استارت آپ ها و شرکت های فناوری که در هیچ جای دیگری نمی توانید پیدا کنید
                        </span>
                        </div>
                        <div className={"flex items-center gap-4 "}>
                            <img src="/images/List.svg" alt=""/>
                            <span>
                            مشاغل منحصر به فرد در استارت آپ ها و شرکت های فناوری که در هیچ جای دیگری نمی توانید پیدا کنید
                        </span>
                        </div>
                        <div className={"flex items-center gap-4"}>
                            <img src="/images/Connect.svg" alt=""/>
                            <span>
                            مشاغل منحصر به فرد در استارت آپ ها و شرکت های فناوری که در هیچ جای دیگری نمی توانید پیدا کنید
                        </span>
                        </div>
                    </div>
                    <div className={"flex gap-4 mb-12"}>
                        <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>یادگیری بیشتر </a>
                        <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd] "}>ثبت نام کن </a>
                    </div>
                </div>
                <div className={"flex  flex flex-col lg:flex-row"}>
                    <img src="/images/img-min-p-800.png" alt=""/>
                </div>
            </div>
        </section>
    );
};

export default JobSeeker;