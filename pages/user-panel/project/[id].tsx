import React from 'react';
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import Cookies from "universal-cookie";
import callApi from "@/app/helper/callApi";
import dynamic from "next/dynamic";
import LinearProgress from '@mui/material/LinearProgress';

export const fetchProjects = async (id: any) => {

    const cookie = new  Cookies()
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
const Header = dynamic(
    () => import('@/app/shared/NavBar'),
    { ssr: false }
)
const SendBid = () => {
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
    const router =useRouter()
    const ProjectId = typeof router.query?.id === "string" ? router.query.id : "";
    const { isSuccess, data, isLoading, isError } = useQuery(
        ["getSendData", ProjectId],
        () => fetchProjects(ProjectId),
        {
            enabled: ProjectId.length > 0,
            staleTime: Infinity
        }
    );
    return (
        <>

            <Header/>
            {
                isLoading ?    <LinearProgress variant="determinate" color="inherit"  value={progress} />:null
            }
            <div className={"md:container-app pt-40 text-left md:pt-20 px-6 w-full"}>

                {
                    isSuccess ? <span className={""}> {data?.data.title}</span>:null
                }

            </div>

        </>
    );
};

export default SendBid;


export const getServerSideProps: GetServerSideProps = async (context:any) => {
    const { id } = context.params;
    const queryClient = new QueryClient();

    try {
        await queryClient.fetchQuery(['[project]', id], () => fetchProjects(id))
    } catch (error:any) {
        context.res.statusCode = error.response.status;
    }

    return {
        props: {
            //also passing down isError state to show a custom error component.
            dehydratedState: dehydrate(queryClient),
        },
    }
};
