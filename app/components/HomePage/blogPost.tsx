import React from 'react';
import Image from "next/image";

const BlogPost = () => {
    return (
        <section className={"container-app pt-[5rem]"}>
            <div className={"border-t border-gray-300 flex flex-col "}>
                    <div className={"flex items-center justify-between py-[80px]"}>
                    {/*    title and more post*/}
                        <div>
                            <span className={"font-bold text-3xl"}>پست های بلاگ ما </span>
                        </div>
                        <div>
                            <a href="#" className={"px-2 py-2 text-[12px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>پست های بیشتر </a>
                        </div>
                    </div>
                <div className={"gird grid-cols-1 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 my-[80px]"}>
                    {/*card*/}
                    <div className={"w-full  border border-gray-300 rounded-sm my-3"}>
                            <div className={"flex flex-col"}>
                                    <div>
                                        <Image
                                            src="/images/min-p-801.jpeg"
                                            alt={"Quotes"}
                                            width={800}
                                            height={100}
                                        />
                                    </div>
                                    <div className={"p-10"}>
                                            <h3>پست های بلاگ </h3>
                                            <div className={"pt-5"}>
                                                <span className={"text-[1rem] font-bold"}>حقیقت در مورد پیدا کردن اولین شغل مهندسی</span>
                                            </div>
                                            <div className={"pt-7 w-full"}>
                                                <p className={"text-[0.8rem] text-justify leading-6 "}>
                                                    حتی برای مهندسان ارشد، جستجوی شغل می تواند گیج کننده و ناامید کننده باشد. زمانی که شما یک مهندس جوان هستید و به دنبال اولین شغل خود هستید..
                                                </p>
                                            </div>
                                            <div className={"pt-7"}>
                                                <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>خواندن بیشتر </a>
                                            </div>
                                    </div>
                            </div>
                    </div>
                    <div className={"w-full  border border-gray-300 rounded-sm my-3"}>
                        <div className={"flex flex-col"}>
                            <div>
                                <Image
                                    src="/images/min-p-802.jpeg"
                                    alt={"Quotes"}
                                    width={800}
                                    height={100}
                                />
                            </div>
                            <div className={"p-10"}>
                                <h3>پست های بلاگ </h3>
                                <div className={"pt-5"}>
                                    <span className={"text-[1rem] font-bold"}>حقیقت در مورد پیدا کردن اولین شغل مهندسی</span>
                                </div>
                                <div className={"pt-7 w-full"}>
                                    <p className={"text-[0.8rem] text-justify leading-6 "}>
                                        حتی برای مهندسان ارشد، جستجوی شغل می تواند گیج کننده و ناامید کننده باشد. زمانی که شما یک مهندس جوان هستید و به دنبال اولین شغل خود هستید..
                                    </p>
                                </div>
                                <div className={"pt-7"}>
                                    <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>خواندن بیشتر </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full  border border-gray-300 rounded-sm my-3"}>
                        <div className={"flex flex-col"}>
                            <div>
                                <Image
                                    src="/images/min-p-803.jpeg"
                                    alt={"Quotes"}
                                    width={800}
                                    height={100}
                                />
                            </div>
                            <div className={"p-10"}>
                                <h3>پست های بلاگ </h3>
                                <div className={"pt-5"}>
                                    <span className={"text-[1rem] font-bold"}>حقیقت در مورد پیدا کردن اولین شغل مهندسی</span>
                                </div>
                                <div className={"pt-7 w-full"}>
                                    <p className={"text-[0.8rem] text-justify leading-6 "}>
                                        حتی برای مهندسان ارشد، جستجوی شغل می تواند گیج کننده و ناامید کننده باشد. زمانی که شما یک مهندس جوان هستید و به دنبال اولین شغل خود هستید..
                                    </p>
                                </div>
                                <div className={"pt-7"}>
                                    <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>خواندن بیشتر </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full  border border-gray-300 rounded-sm my-3"}>
                        <div className={"flex flex-col "}>
                            <div>
                                <Image
                                    src="/images/min-p-804.jpeg"
                                    alt={"Quotes"}
                                    width={800}
                                    height={100}
                                />
                            </div>
                            <div className={"p-10"}>
                                <h3>پست های بلاگ </h3>
                                <div className={"pt-5"}>
                                    <span className={"text-[1rem] font-bold"}>حقیقت در مورد پیدا کردن اولین شغل مهندسی</span>
                                </div>
                                <div className={"pt-7 w-full"}>
                                    <p className={"text-[0.8rem] text-justify leading-6 "}>
                                        حتی برای مهندسان ارشد، جستجوی شغل می تواند گیج کننده و ناامید کننده باشد. زمانی که شما یک مهندس جوان هستید و به دنبال اولین شغل خود هستید..
                                    </p>
                                </div>
                                <div className={"pt-7"}>
                                    <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>خواندن بیشتر </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full border border-gray-300 rounded-sm my-3"}>
                        <div className={"flex flex-col"}>
                            <div>
                                <Image
                                    src="/images/min-p-806.jpeg"
                                    alt={"Quotes"}
                                    width={800}
                                    height={100}
                                />
                            </div>
                            <div className={"p-10"}>
                                <h3>پست های بلاگ </h3>
                                <div className={"pt-5"}>
                                    <span className={"text-[1rem] font-bold"}>حقیقت در مورد پیدا کردن اولین شغل مهندسی</span>
                                </div>
                                <div className={"pt-7 w-full"}>
                                    <p className={"text-[0.8rem] text-justify leading-6 "}>
                                        حتی برای مهندسان ارشد، جستجوی شغل می تواند گیج کننده و ناامید کننده باشد. زمانی که شما یک مهندس جوان هستید و به دنبال اولین شغل خود هستید..
                                    </p>
                                </div>
                                <div className={"pt-7"}>
                                    <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>خواندن بیشتر </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full  border border-gray-300 rounded-sm my-3"}>
                        <div className={"flex flex-col"}>
                            <div>
                                <Image
                                    src="/images/min-p-800.jpeg"
                                    alt={"Quotes"}
                                    width={800}
                                    height={100}
                                />
                            </div>
                            <div className={"p-10"}>
                                <h3>پست های بلاگ </h3>
                                <div className={"pt-5"}>
                                    <span className={"text-[1rem] font-bold"}>حقیقت در مورد پیدا کردن اولین شغل مهندسی</span>
                                </div>
                                <div className={"pt-7 w-full"}>
                                    <p className={"text-[0.8rem] text-justify leading-6 "}>
                                        حتی برای مهندسان ارشد، جستجوی شغل می تواند گیج کننده و ناامید کننده باشد. زمانی که شما یک مهندس جوان هستید و به دنبال اولین شغل خود هستید..
                                    </p>
                                </div>
                                <div className={"pt-7"}>
                                    <a href="#" className={"px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>خواندن بیشتر </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BlogPost;