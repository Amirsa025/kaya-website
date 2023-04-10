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
import useAuth from "@/app/helper/useAuth";
import Heading from "@/app/shared/Heading";

const Project: NextPageWithLayout = () => {
    const [searchTerm, setSearchTerm] = React.useState(""),
        [offset, setOffset] = React.useState(1),
        [page, setPage]:any = React.useState(3),
        cookie = new Cookies(), ACCESS_TOKEN = cookie.get('sginUP') || cookie.get('token'),
        fetchProjects = async (page:any) => {
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

    const handleChangePage = (page:any)=>{
        setOffset((page-1)*5)
        setPage(page+1)
    }
    //search filter
    const filteredData = project?.data?.projects.filter((item:any) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <div className={"md:container-app"}>
            <Heading page={"لیست پروژه ها "} titlesite={" کایا"}/>
            <div className={" mr-4 sm:mx-6 md:mr-0 "}>
                {isLoading ? (
                    <div className={"text-white center-item w-full tex-[12px] h-16 bg-blue-300 rounded-md px-8"}>درحال دریافت اطلاعات از سرور... </div>
                ) : isError ? (
                    <div className={"text-white center-item w-full tex-[12px] h-16 bg-red-300 rounded-md px-8"}>خطایی پیش بینی نشده ای به وجود امده دوباره امتحان کنید.</div>
                ) : (
                    <div className={"flex flex-col md:flex-row"}>
                        {/*filter and */}

                        <div className={"flex justify-start md:flex-1 border rounded-md  w-full flex flex-col  md:py-6 lg:px-4"}>
                            <div>
                                <div className={"direction-ltr px-4  flex items-center gap-4 px-2 md:py-2 border "}>
                                    <div>
                                        <i   className="ri-search-line text-[1.5rem] text-gray-600"></i>
                                    </div>
                                    <input  value={searchTerm} onChange={handleSearchChange}  type="text" placeholder={"Search Keyword"} className={"outline-0 py-2 flex-1"}/>
                                </div>
                                <ProjectList projectItem={filteredData} />
                            </div>
                            <div className={"direction-ltr py-6 w-full flex justify-center"}>
                                {/*edit*/}

                                <Pagination  siblingCount={0} boundaryCount={1}  renderItem={(item) => (
                                    <PaginationItem
                                        slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                        {...item}
                                    />
                                )} count={page}  onChange={(event, page) => handleChangePage(page)} />
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};
Project.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default Project;
