import React from 'react';
import Image from "next/image";
import {ourCourse} from "@/app/constant/MockData";

const Ourusers = () => {


    return (
        <section className={"container-app pt-[138px]"}>
            <div className={"border-t border-gray-300  pt-[6.25rem]"}>
                <div className={"center-item"}>
                    <h4 className={"font-bold text-[12px] "}>با ما اوج بگیرید</h4>
                </div>
                <div className={"center-item pt-[47px] "}>
                    <h5 className={"font-bold text-[40px] "}>از نظرات  کاربران ما</h5>
                </div>
            </div>
            <div className={"pt-[91px] grid  grid-col-1 gap-4 md:grid-cols-2 lg:grid-cols-4"}>
                {
                    ourCourse?.map((item,id)=>{
                        return (
                            <div key={id} className={"px-4 py-4 md:py-8 lg:py-12 xl:py-6 flex-col   my-4   border rounded-md border-gray-300 flex  "}>
                                {/*Quotes*/}
                                <div className={"w-full  flex  justify-start pb-4"}>
                                    <Image
                                        src="/images/Quotes.svg"
                                        alt={"Quotes"}
                                        width={40}
                                        height={40}
                                    />

                                </div>
                                <div key={item.id} className={"w-full h-40 px-4  "}>
                                    <span className={"text-[1rem] lg:text-[0.7rem] xl:text-[1rem]"}> {item.comment}</span>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
        </section>
    );
};

export default Ourusers;