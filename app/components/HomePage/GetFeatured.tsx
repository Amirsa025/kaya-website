import React from 'react';
import Image from "next/image";

const GetFeatured = () => {
    return (
        <section className={"container-app pt-[5rem]"}>
                <div className={"border-t border-gray-300 pt-[5rem] grid grid-cols-1 lg:flex lg:flex-col xl:grid xl:grid-cols-2 gap-6 mb-4"}>
                        <div className={"flex flex-col-reverse border border-gray-300 rounded-md lg:grid lg:grid-cols-2"}>
                                <div className={"pt-24 px-4"}>
                                    <div>
                                        <h3 className={"flex justify-start text-[12px] font-bold"}>محاسبه دستمزد</h3>
                                    </div>
                                    <div className={"py-[33px] text-[2rem]"}>
                                        <h4>ارزش خودتو بدون</h4>
                                    </div>
                                    <div className={""}>
                                        <p className={" text-[0.9rem] leading-6"}>ما داده ها را داریم. بر اساس عنوان شغل، صنعت و اندازه شرکت تحقیق کنید تا محدوده حقوق خود را بیابید و آماده شوید تا مذاکرات خود را به نتیجه برسانید.</p>
                                    </div>
                                        <div className={"pt-7 pb-16"}>
                                            <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>محاسبه دستمزد </a>
                                        </div>
                                </div>
                            <div className={"bg-[#eaebff] flex items-center justify-center"}>
                                <span className={"sr-only"}>image for box</span>
                                <Image
                                    src="/images/Calculator 1.png"
                                    alt={"Quotes"}
                                    width={400}
                                    height={300}
                                />
                            </div>
                        </div>
                    <div className={"flex flex-col-reverse border border-gray-300 rounded-md lg:grid lg:grid-cols-2"}>
                        <div className={"pt-24 px-4"}>
                            <div>
                                <h3 className={"flex justify-start text-[12px] font-bold"}>محاسبه دستمزد</h3>
                            </div>
                            <div className={"py-[33px] text-[2rem]"}>
                                <h4>ارزش خودتو بدون</h4>
                            </div>
                            <div className={""}>
                                <p className={" text-[0.9rem] leading-6"}>ما داده ها را داریم. بر اساس عنوان شغل، صنعت و اندازه شرکت تحقیق کنید تا محدوده حقوق خود را بیابید و آماده شوید تا مذاکرات خود را به نتیجه برسانید.</p>
                            </div>
                            <div className={"pt-7 pb-16"}>
                                <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>یادگیری بیشتر </a>
                            </div>
                        </div>
                        <div className={"bg-[#ffede5] flex items-center justify-center"}>
                            <span className={"sr-only"}>image for box</span>
                            <Image
                                src="/images/Featured.png"
                                alt={"Quotes"}
                                width={400}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default GetFeatured;