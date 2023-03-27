import React, {useEffect, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import ProjectList from "@/app/components/project/project-list";
import Pagination from '@mui/material/Pagination';
import {useQuery} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";


const Project: NextPageWithLayout = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [page, setPage] = React.useState(1)
    const cookie =new Cookies()
    const ACCESS_TOKEN = cookie.get('sginUP') || cookie.get('token')
    const fetchProjects = async (page =0) =>{
            try {
                return await callApi().get(`/projects/projects?limit=5&offset=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${ACCESS_TOKEN}`
                    }
                })
            }catch (error){
                console.log(error)
            }
    }
    const {
        isLoading,
        isError,
        refetch,
        data: project,
    } = useQuery({
        queryKey: ['page' ,page,searchTerm],
        queryFn: () => fetchProjects(page),
        keepPreviousData: true,
        staleTime: 500,
        refetchOnWindowFocus:false,
        cacheTime: 0
    })
    const [state, setPost] = useState(project?.data?.projects)

    return (
        <div className={"md:container-app"}>
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
                                        <i  className="ri-search-line text-[1.5rem] text-gray-600"></i>
                                       </div>
                                      <input    type="text" placeholder={"Search Keyword"} className={"outline-0 py-2 flex-1"}/>
                                 </div>
                                <ProjectList projectItem={project} />
                            </div>
                            <div className={"direction-ltr py-6 w-full flex justify-center"}>
                                {/*edit*/}
                                <Pagination count={8}   onChange={(event, page) => setPage((page-1)*5)} />
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