import React, {useEffect} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import ProjectList from "@/app/components/project/project-list";
import Pagination from '@mui/material/Pagination';
import {useQuery} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import { toast } from 'react-toastify';

const Project: NextPageWithLayout = () => {
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
        data: project,
    } = useQuery({
        queryKey: ['page' ,page],
        queryFn: () => fetchProjects(page),
        keepPreviousData: true,
        staleTime: 500,
        refetchOnWindowFocus:false,
        cacheTime: 0
    })
// @ts-ignore

    return (
        <div className={""}>
            <div className={""}>
                {isLoading ? (
                    <div className={"text-white center-item w-full tex-[12px] h-16 bg-blue-300 rounded-md px-8"}>درحال دریافت اطلاعات از سرور... </div>
                ) : isError ? (
                    <div className={"text-white center-item w-full tex-[12px] h-16 bg-red-300 rounded-md px-8"}>خطایی پیش بینی نشده ای به وجود امده دوباره امتحان کنید.</div>
                ) : (
                    <div className={"flex  md:flex-1 border rounded-md "}>
                        <div className={"w-full flex flex-col  md:py-6 lg:px-4"}>
                            {/*paginagin*/}
                            <div>
                                <ProjectList projectItem={project} />
                            </div>
                            <div className={"direction-ltr py-6 w-full flex justify-center"}>
                                <Pagination count={10}  onChange={(event, page) => setPage(page)} />
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