import React, {useEffect, useState} from 'react';
import {Tooltip} from "@mui/material";
import Image from 'next/image'
import Link from "next/link";
interface ProjectProps {
    projectItem: any,
    project_id?:number,
    submit_date?:string,
    title?:string,
    description?:string
}

const ProjectList: React.FC<ProjectProps> = ({projectItem}) => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    useEffect(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        setTime(`${hours}:${minutes}:${seconds}`);
        setDate(`${year}/${month}/${day}`)

    }, []);
    return (
        <section className={"lg:py-2"}>

            {
                projectItem?.map((item: any) => {
                    return (

                        <div  key={item.project_id}>
                            <>
                                <div
                                    className={" w-full flex flex-col-reverse md:flex-row px-2 md:py-2  md:border-t border-b md:border-b-0  hover:bg-gray-50"}
                                   >
                                    <div
                                        className={" md:border-l direction-ltr md:w-1/3 lg:w-3/12  sm:px-4   py-4 space-y-2 border-t md:border-t-0 "}>
                                        <div className={"md:space-y-6 flex flex-row md:flex-col md:items-start  items-center  justify-between"}>
                                            <div className={"flex items-center gap-2"}>
                                        <span
                                            className={"block text-[13px] font-bold"}>
                                            {item.is_hourly ?
                                                <div className={"flex flex-col md:flex-row"}>
                                                    <span className={"text-[14px] font-normal"}>{item.budget_minimum} {" - "} {item.budget_maximum}</span>
                                                        <div className={"flex justify-center items-center "}>
                                                            <span className={"md:pl-1"}>  {item.currency_code}</span> {" / "}
                                                            <span className={" text-black text-[16px] font-bold"}> hr</span>
                                                        </div>
                                                </div>
                                                :
                                                <div>
                                                    <span className={"text-[14px] font-normal "}>{item.budget_minimum} {" - "} {item.budget_maximum}</span>
                                                    <span className={"px-2 font-bold text-[14px]"}>{item.currency_code}</span> </div>
                                            }
                                        </span>
                                            </div>
                                            <div className={"flex items-center gap-2 flex-wrap"}>
                                                <Image width={30} height={30} src={`https://flagcdn.com/w2560/${item.owner_country_code.toLowerCase()}.webp`} alt={"64.png"}/>
                                                <div>
                                            <span
                                                className={"text-[12px] "}>{item.owner_country}{", "}{item.owner_city} </span>
                                                </div>
                                            </div>

                                            <div className={"flex items-center gap-2"}>
                                                <Link shallow={true} href={`/user-panel/project/${item.project_id}`} >
                                                    <div
                                                        className={" hover:block text-[13px] font-bold bg-green-500 px-4 py-2 md:px-3 lg:px-8 rounded-sm text-white"}>Send
                                                    </div>
                                                </Link>

                                            </div>
                                        </div>

                                    </div>
                                    <div className={"md:w-10/12 w-full  md:mx-2 py-2 px-2 md:direction-ltr flex-col flex "}>
                                        <div
                                            className={"flex md:flex-wrap md:items-center  items-end md:justify-between md:flex-row flex-col "}>
                                            <div className={"flex items-center md:gap-4 gap-2 justify-end flex-row-reverse md:flex-row"}>
                                                <div className={"direction-ltr"}>
                                                    <a href={"#"}>
                                                <span
                                                    className={"font-bold text-[0.81rem]"}>{item.title}</span>
                                                    </a>
                                                </div>

                                                {
                                                    item.payment_verified ?
                                                        <Tooltip title="Verified  " placement="top">
                                                            <div
                                                                className={"flex  items-center gap-4 text-green-600  text-[0.8rem]"}>
                                                                <i className="ri-wallet-fill text-[1.5rem]"></i>

                                                            </div>
                                                        </Tooltip>
                                                        :<></>
                                                }
                                                <div className={"flex items-center gap-2 "}>
                                                    <div>
                                                        {item.has_attachment === true ?
                                                            <Tooltip title="attachment" placement="top">
                                                                <i className="ri-attachment-2 text-[1.2rem] text-gray-500"></i>
                                                            </Tooltip>

                                                            : <></>}
                                                    </div>
                                                    <div>
                                                        <a href={item.seo_url} target={"_blank"}
                                                           className={" block  hover:text-blue-400 "}>
                                                            <Tooltip title="link project" placement="top">
                                                                <i className="ri-external-link-line text-[1.3rem] text-gray-700"></i>

                                                            </Tooltip>

                                                        </a>
                                                    </div>

                                                </div>
                                            </div>

                                            <div>
                                                <div
                                                    className={"text-[12px] font-semibold  font-light"}>
                                                    <span className={"md:px-1"}>{date}</span>
                                                    <span className={"md:px-1"}>{time}</span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={"py-[1.563rem] text-[14px] flex flex-wrap direction-ltr"}>
                                            <p className={" text-gray-700 font-normal text-[12px] md:text-[13px] leading-6  "}>{item.description}</p>
                                        </div>

                                        <div
                                            className={" direction-ltr flex  flex-wrap items-center  gap-x-4 "}>
                                            {
                                                item.jobs.map((job: any) => {
                                                    return (
                                                        <div key={job.id}>
                                                    <span
                                                        className={"text-[12px] text-blue-400 hover_link"}>{job.name}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                            </>

                        </div>

                    )
                })
            }

        </section>
    );
};

export default ProjectList;

