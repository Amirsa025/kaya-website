import React, {useEffect, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import ProjectList from "@/app/components/project/project-list";
import Pagination from '@mui/material/Pagination';
import {useQuery} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {PaginationItem} from "@mui/material";
import Heading from "@/app/shared/Heading";
import {MoonLoader} from "react-spinners";
import EmptyList from "@/app/shared/EmptyList";

const Project: NextPageWithLayout = () => {
    const [searchTerm, setSearchTerm] = React.useState(""),
        [offset, setOffset] = React.useState(1),
        [page, setPage]: any = React.useState(3),
        cookie = new Cookies(), ACCESS_TOKEN = cookie.get('sginUP') || cookie.get('token'),
        fetchProjects = async (page: any) => {
            try {
                return await callApi().get(`/projects/projects?limit=5&offset=${offset}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie.get('sginUP') || cookie.get('token')}`
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        {
            isLoading,
            isError,
            data: project,
        } = useQuery({
            queryKey: ['page', offset, searchTerm],
            queryFn: () => fetchProjects(offset),
            keepPreviousData: true,
            staleTime: 500,
            refetchOnWindowFocus: false,
            cacheTime: 1000,
            retryDelay: 1000, // Will always wait 1000ms to retry, regardless of how many retries
        }),
        handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setSearchTerm(event.target.value);
        }

    const handleChangePage = (page: any) => {
        setOffset((page - 1) * 5)
        setPage(page + 1)
    }
    //search filter
    const filteredData = project?.data?.projects.filter((item: any) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div className={"md:container-app"}>
            <Heading page={"لیست پروژه ها "} titlesite={" کایا"}/>
            <div className={" mr-4 sm:mx-6 md:mr-0 "}>
                {isLoading ? (
                    <div className={"lg:px-24 w-full"}>
                        <div
                            className={"text-white center-item  tex-[12px] h-16 bg-blue-400 rounded-md px-2  w-full lg:w-10/12 "}>
                            <div
                                className={" rounded-md w-full py-2 lg:px-1 bg-blue-300 flex  items-center  gap-4"}>
                                <div className={"px-3"}>
                                    <MoonLoader
                                        color="#162f48"
                                        size={20}
                                    />
                                </div>
                                <span>  درحال دریافت اطلاعات از سرور...</span>
                            </div>

                        </div>
                    </div>
                ) : isError ? (
                    <div className={"bg-red-300 rounded-md w-full lg:w-10/12 py-4 px-6"}>

                        <div
                            className={"bg-red-200 py-2  flex items-center gap-8 text-white  w-full tex-[12px]   rounded-md px-8"}>
                            <svg className="text-red-600 flex-shrink-0" width="30" height="30"
                                 viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="30" rx="5" fill="currentColor"></rect>
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M22.9881 15.0544C22.9744 15.176 22.9547 15.2588 22.9154 15.4243C21.7287 20.421 17.5155 22.2845 15.7681 22.8529C15.4666 22.951 15.3159 23 15 23C14.6841 23 14.5334 22.951 14.2319 22.8529C12.4845 22.2845 8.27126 20.421 7.08458 15.4243C7.04526 15.2588 7.02559 15.176 7.01193 15.0544C6.99826 14.9328 6.99919 14.8325 7.00106 14.6321C7.05944 8.3602 8.54671 7 15 7C21.4533 7 22.9406 8.3602 22.9989 14.6321C23.0008 14.8325 23.0017 14.9328 22.9881 15.0544ZM15 11.0166C15.3682 11.0166 15.6667 11.3163 15.6667 11.686V15.7026C15.6667 16.0723 15.3682 16.372 15 16.372C14.6318 16.372 14.3333 16.0723 14.3333 15.7026V11.686C14.3333 11.3163 14.6318 11.0166 15 11.0166ZM14.3333 17.7109C14.3333 17.3411 14.6318 17.0414 15 17.0414C15.3682 17.0414 15.6667 17.3411 15.6667 17.7109C15.6667 18.0806 15.3682 18.3803 15 18.3803C14.6318 18.3803 14.3333 18.0806 14.3333 17.7109Z"
                                      fill="white"></path>
                            </svg>
                            <span>خطایی پیش بینی نشده ای به وجود امده دوباره امتحان کنید.</span>
                        </div>
                    </div>
                ) : (
                    <div className={"flex flex-col md:flex-row"}>
                        {/*filter and */}
                        <div
                            className={"flex justify-start md:flex-1 border rounded-md  w-full flex flex-col  md:py-6 lg:px-4"}>
                            <div>
                                <div
                                    className={"direction-ltr px-4  flex items-center gap-4 px-2 md:py-2 border "}>
                                    <div>
                                        <i className="ri-search-line text-[1.5rem] text-gray-600"></i>
                                    </div>
                                    <input value={searchTerm} onChange={handleSearchChange}
                                           type="text" placeholder={"Search Keyword"}
                                           className={"outline-0 py-2 flex-1"}/>
                                </div>
                                {
                                    !filteredData.length ?
                                        <EmptyList className={"sm:mx-0 mx-4 my-4"}
                                                   description={"پروژه برای نمایش وجود ندارد"}
                                                   title={"برای دیدن پروژه های بیشتر به صفحات قبل مراجعه کنید"}/> :
                                        <ProjectList projectItem={filteredData}/>
                                }

                            </div>
                            <div className={"direction-ltr py-6 w-full flex justify-center"}>
                                {/*edit*/}
                                <Pagination siblingCount={0} boundaryCount={1}
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    slots={{
                                                        previous: ArrowBackIcon,
                                                        next: ArrowForwardIcon
                                                    }}
                                                    {...item}
                                                />
                                            )} count={page}
                                            onChange={(event, page) => handleChangePage(page)}/>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};
Project.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default Project;
