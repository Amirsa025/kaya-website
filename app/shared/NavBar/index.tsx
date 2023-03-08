import * as React from 'react';
import { useState } from 'react'

export default () => {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) path with your path
    const navigation = [
        { title: "تماس با ما ", path: "#" },
        { title: "پروژه ها", path: "#" },
        { title: "خانه", path: "#" },

    ]


    return (
        <nav className="container-app bg-white w-full ">
            <div className="md:flex items-center justify-between px-4 md:border-b">
                <div className="flex items-center justify-between py-2 md:py-5 md:flex ">
                    <a href="#">
                        <section className={"between-items py-[30px] "}>
                            <div className={"text-3xl font-extrabold col-items"}>
                                <div className={"flex items-center pt-1 w-16 h-8"}>
                                    <img src="/images/Asset.png" alt="logo"/>
                                </div>
                            </div>
                            <div>
                            </div>
                        </section>
                    </a>
                    <div className="md:hidden">
                        <button className="open"
                                onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                        <div className={"w-[60px] h-[60px] bg-blue-600 center-item"}>
                                            <i className="ri-menu-line text-white text-14"></i>
                                        </div>

                                ) : (
                                    <div className={"w-[60px] h-[60px]  center-item"}>
                                        <i className="ri-menu-line text-14"></i>
                                    </div>
                                )
                            }
                        </button>
                    </div>
                </div>
                    <div className={"flex "}>
                        <div className={` md:px-[36px]  md:h-0  justify-self-center pb-3 md:block md:pb-0 ${ state ? 'block ' : 'hidden transMovemt'}`}>
                            <ul className="  flex flex-start md:items-center  md:space-x-8 md:space-x-reverse md:space-y-0 pt-2  flex-col md:flex-row ">
                                {
                                    navigation.map((item, idx) => {
                                        return (
                                            <li key={idx} className=" text-gray-900 hover:text-[#143fcd]  md:hover_Me hover:overflow-hidden text-[16px]  py-4 md:py-0">
                                                <a href={item.path} className={""}>
                                                    { item.title }
                                                </a>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                            <div className="flex md:hidden items-center py-6 gap-8">
                                <button className={"w-[90px] h-[40px]  border rounded-md"}>ورود</button>
                                <button className={"w-[90px] h-[40px] bg-black text-white rounded-md"}>ثبت نام </button>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-around gap-8 ">
                                <button className={"w-[90px] h-[40px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>ورود</button>
                                <button className={"w-[90px] h-[40px] bg-black text-white rounded-md hover:bg-[#143fcd]"}>ثبت نام </button>
                        </div>
                    </div>
            </div>
        </nav>
    )
}


