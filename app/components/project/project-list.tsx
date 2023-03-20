import React from 'react';
import {Tooltip} from "@mui/material";

interface ProjectProps {
    projectItem: any
}

const ProjectList: React.FC<ProjectProps> = ({projectItem}) => {

    return (
        <section className={" px-2 md:py-2"}>
            {
                projectItem?.data?.projects.map((item: any) => {
                    return (
                        <div
                            className={" w-full flex flex-col-reverse md:flex-row px-2 md:py-2  md:border-t border-b md:border-b-0  hover:bg-gray-50"}
                            key={item.project_id}>
                            <div
                                className={"md:border-l  direction-ltr  md:w-1/3 lg:w-1/3 px-4   py-4 space-y-4  border-t md:border-t-0 "}>
                                <div className={"space-y-6 "}>
                                    <div className={"flex items-center gap-2"}>
                                        {}
                                        <span
                                            className={"block text-[13px] font-bold"}>
                                            {item.is_hourly ?
                                            <div>{item.budget_minimum} {" - "} {item.budget_minimum} {"/"}
                                                <span
                                                    className={"pl-2 text-black text-[16px] font-bold"}>hr</span>
                                            </div>
                                            :
                                            <div>{item.budget_minimum} {" - "} {item.budget_minimum} {"-"} {item.currency_code} </div>}</span>
                                    </div>
                                    <div className={"flex items-center gap-2"}>
                                        <div>
                                            <a href={item.seo_url} target={"_blank"}
                                               className={" block text-[12px] font-bold text-[12px] text-blue-400 "}>Link
                                                Project</a>
                                        </div>
                                        <div>
                                            {item.has_attachment === true ?
                                                <i className="ri-attachment-2 text-[1.2rem] text-gray-500"></i>
                                                : <></>}
                                        </div>
                                    </div>
                                    <div className={"flex items-center gap-2"}>
                                        <span
                                            className={"block text-[13px] font-bold"}>country:</span>
                                        <div>
                                            <span
                                                className={"text-[12px] "}>{item.owner_country} {" - "}</span>
                                            <span
                                                className={"text-[12px]"}>{item.owner_country_code}</span>
                                        </div>
                                    </div>
                                    <div className={"flex items-center gap-2"}>
                                        <span
                                            className={"block text-[13px] font-bold"}>city:</span>
                                        <div>
                                            <span
                                                className={"text-[12px] "}>{item.owner_city}</span>
                                        </div>
                                    </div>
                                    <div className={"flex items-center gap-2 py-[24px]"}>
                                        <button
                                            className={"block text-[13px] font-bold bg-green-500 px-4 py-2 md:px-3 lg:px-8 rounded-sm text-white"}>Send
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className={" md:flex-1  md:mx-2 py-2 md:direction-ltr  "}>
                                <div
                                    className={"flex md:flex-wrap md:items-center  items-end md:justify-between md:flex-row flex-col-reverse"}>
                                    <div>
                                        <span
                                            className={"text-[12px] font-light"}>{item.submit_date}</span>
                                    </div>
                                    <div className={"flex items-center md:gap-4 gap-2 justify-end"}>
                                        {
                                            item.payment_verified ?
                                                <Tooltip title="Verified  " placement="top">
                                                        <div
                                                        className={"flex  items-center gap-4 text-green-600  text-[0.8rem]"}>
                                                        <i className="ri-wallet-fill text-[1.5rem]"></i>
                                                         <span className={"pt-1 font-bold"}>Verified</span></div>
                                                </Tooltip>
                                          :<></>
                                        }
                                        <div>
                                            <a href={"#"}>
                                                <span
                                                    className={"font-bold text-[0.81rem]"}>{item.title}</span>
                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div className={"py-[1.563rem] text-[13px] flex flex-wrap direction-ltr"}>
                                    <p className={" text-gray-700 font-normal text-[12px] md:text-[13px] leading-6  "}>{item.description}</p>
                                </div>
                                <div
                                    className={" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-y-4 py-2 px-4"}>
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
                    )
                })
            }

        </section>
    );
};

export default ProjectList;