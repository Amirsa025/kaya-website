import React from 'react';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import Cookies from "universal-cookie";
import callApi from "@/app/helper/callApi";
import dynamic from "next/dynamic";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import {NextPageWithLayout} from "@/pages/_app";
import {MoonLoader} from "react-spinners";
import Image from "next/image";
import RequestBid from "@/app/shared/form/sendBid";

export const fetchProjects = async (id: any) => {

    const cookie = new Cookies()
    try {
        return await callApi().get(`/projects/projects/${id}`, {
            headers: {
                'Authorization': `Bearer ${cookie.get('sginUP') || cookie.get('token')}`
            }
        })
    } catch (error) {
        console.error(error)
    }
}
dynamic(
    () => import('@/app/shared/NavBar'),
    {ssr: false}
);
const SendBid: NextPageWithLayout = () => {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 100;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);
        return () => {
            clearInterval(timer);
        };
    }, []);
    const router = useRouter()
    const ProjectId = typeof router.query?.id === "string" ? router.query.id : "";
    const {isSuccess, data, isLoading, isError} = useQuery(
        ["getSendData", ProjectId],
        () => fetchProjects(ProjectId),
        {
            enabled: ProjectId.length > 0,
            staleTime: Infinity
        }
    );
    if (isLoading) {
        return <div className={"lg:px-24 w-full md:container-app"}>
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
    }
    if (isSuccess) {
        return <div className={"md:container-app w-full direction-ltr "}>
            <div
                className={"bg-black text-white  py-4 ms:pt-0 text-left md:py-4 px-6 rounded-sm"}>
                <div className={"flex items-center flex-row gap-3"}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor" className="w-9 h-9 ">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
                        </svg>


                    </div>
                    <span
                        className={"font-bold text-[14px] lg:text-xl text-gray-100"}> {data?.data.title}</span>
                </div>
            </div>
            <div
                className={"flex flex-col border border-gray-200 rounded-md md:container-app  py-6 text-left md:py-4 px-6 rounded-sm"}>
                <div>
                    <span className={"text-left text-xl font-bold"}> Job description:</span>
                    <p className={"py-4 text-[1rem] text-gray-800"}> {data?.data.description}</p>
                </div>
                {/*start skills*/}
                <div className={"py-4"}>
                    <div className={"direction-ltr flex  flex-wrap items-center  gap-x-4"}>
                        <div className={"flex items-center gap-x-2"}>
                            <span className={"text-left text-xl font-bold"}>skills:</span>
                        </div>
                        {
                            data?.data.jobs.map((skill: any, id: number) => {
                                return <div key={id} className={""}>
                                    <span
                                        className={"text-blue-400 hover:underline "}>{skill?.name}</span>
                                </div>
                            })
                        }
                    </div>

                </div>
                {/*End skills*/}

                {/*start Country*/}
                <div className={"py-4 flex flex-row items-center gap-2"}>
                    <h2 className={"font-bold"}>Country:</h2>
                    <div className={"flex items-center gap-2"}>
                        <Image width={20} height={20}
                               src={`https://flagcdn.com/w2560/${data?.data.owner_country_code.toLowerCase()}.webp`}
                               alt={"64.png"}/>
                        <span className={"font-normal  text-[12px]"}>{data?.data?.owner_country},{" "} {data?.data?.owner_city.toLowerCase()}</span>
                    </div>
                </div>
                {/*End Country*/}
                {/*start ProjectId*/}
                <div className={"flex flex-row items-center gap-2 pb-4"}>
                    <h2 className={"font-bold"}>ProjectId:</h2>
                    <span>#{data?.data.project_id}</span>
                </div>
                {/*End skills*/}
               {/*  SendBid  */}
                <RequestBid id={data?.data.project_id} />
            </div>

        </div>
    }
    if (isError) {
        return <div className={"bg-red-300 rounded-md w-full lg:w-10/12 py-4 px-6"}>
            <div
                className={"bg-red-200 py-2  flex items-center gap-8 text-white  w-full tex-[12px]   rounded-md px-8"}>
                <svg className="text-red-600 flex-shrink-0" width="30" height="30"
                     viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="30" height="30" rx="5" fill="currentColor"></rect>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M22.9881 15.0544C22.9744 15.176 22.9547 15.2588 22.9154 15.4243C21.7287 20.421 17.5155 22.2845 15.7681 22.8529C15.4666 22.951 15.3159 23 15 23C14.6841 23 14.5334 22.951 14.2319 22.8529C12.4845 22.2845 8.27126 20.421 7.08458 15.4243C7.04526 15.2588 7.02559 15.176 7.01193 15.0544C6.99826 14.9328 6.99919 14.8325 7.00106 14.6321C7.05944 8.3602 8.54671 7 15 7C21.4533 7 22.9406 8.3602 22.9989 14.6321C23.0008 14.8325 23.0017 14.9328 22.9881 15.0544ZM15 11.0166C15.3682 11.0166 15.6667 11.3163 15.6667 11.686V15.7026C15.6667 16.0723 15.3682 16.372 15 16.372C14.6318 16.372 14.3333 16.0723 14.3333 15.7026V11.686C14.3333 11.3163 14.6318 11.0166 15 11.0166ZM14.3333 17.7109C14.3333 17.3411 14.6318 17.0414 15 17.0414C15.3682 17.0414 15.6667 17.3411 15.6667 17.7109C15.6667 18.0806 15.3682 18.3803 15 18.3803C14.6318 18.3803 14.3333 18.0806 14.3333 17.7109Z"
                          fill="white"></path>
                </svg>
                <span>پروژه وجود ندارد</span>
            </div>
        </div>
    }
    return <></>

};

SendBid.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default SendBid;
export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const {id} = context.params;
    const queryClient = new QueryClient();

    try {
        await queryClient.fetchQuery(['[project]', id], () => fetchProjects(id))
    } catch (error: any) {
        context.res.statusCode = error.response.status;
    }

    return {
        props: {
            //also passing down isError state to show a custom error component.
            dehydratedState: dehydrate(queryClient),
        },
    }
};
