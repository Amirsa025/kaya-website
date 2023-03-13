import React from 'react';
import Image from "next/image";

const Footer = () => {
    return (
        <section className={"container-app"}>
            <div className={"border-t py-4 border-gray-300 flex flex-col-reverse items-start lg:items-center lg:flex-row lg:justify-between "}>
                <div className={"grid grid-cols-1 md:grid-cols-3 pt-4 md:gap-[68px] gap-y-4"}>
                    <div>
                        <ul>
                            <li className={"space-y-2 md:space-y-6"}>
                                <span className={"text-[14px] font-bold"}> خانه </span>
                                <div className={"text-[13px]"}>
                                    <a href="#">بررسی اجمالی</a>
                                </div>
                                <div className={"text-[13px]"}>
                                    <a href="#">مشاغل راه اندازی</a>
                                </div>
                                <div className={"text-[13px]"}>
                                    <a href="#">web3</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li className={"space-y-2 md:space-y-6"}>
                                <span className={"text-[14px] font-bold"}> خانه </span>
                                <div className={"text-[13px]"}>
                                    <a href="#">بررسی اجمالی</a>
                                </div>
                                <div className={"text-[13px]"}>
                                    <a href="#">مشاغل راه اندازی</a>
                                </div>
                                <div className={"text-[13px]"}>
                                    <a href="#">web3</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul >
                            <li className={"space-y-2 md:space-y-6"}>
                                <span className={"text-[14px] font-bold"}> شرکت  </span>
                                <div className={"text-[13px]"}>
                                    <a href="#">بررسی اجمالی</a>
                                </div>
                                <div className={"text-[13px]"}>
                                    <a href="#">مشاغل راه اندازی</a>
                                </div>
                                <div className={"text-[13px]"}>
                                    <a href="#">web3</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={"flex lg:justify-end flex-col"}>
                    <a href="#" className={"flex flex-col gap-y-4 "}>
                        <Image
                            src="/images/Asset.png"
                            alt={"logo"}
                            width={100}
                            height={100}
                        />
                        <span className={"font-bold"}>کایا وب سایت </span>
                    </a>
                    <a className={"pt-2  flex lg:justify-end"} href={"#"}>
                        <i className="ri-instagram-line text-[28px] hover:text-[#143fcd]"></i>
                        <i className="ri-twitter-fill text-[28px] hover:text-[#143fcd] md:px-2"></i>
                    </a>
                </div>
            </div>
            {/*<div className={"flex items-center justify-between"}>*/}
            {/*    <div>1</div>*/}
            {/*    <div>2</div>*/}
            {/*</div>*/}

        </section>
    );
};

export default Footer;