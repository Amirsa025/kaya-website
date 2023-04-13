import React from 'react';
// import callApi from "@/app/helper/callApi";
// import Cookies from "universal-cookie";
// import {dehydrate} from "@tanstack/query-core";
// import {QueryClient, useQuery} from "@tanstack/react-query";
//
// import {GetStaticPaths, GetStaticProps} from "next";
import Header from "@/app/shared/NavBar";
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps} from "next";
import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import Cookies from "universal-cookie";
import callApi from "@/app/helper/callApi";
export const fetchProjects = async (id: any) => {
    console.log(id)
    const cookie = new  Cookies()
    try {
        return await callApi().get(`/projects/projects?limit=5&offset=8`, {
            headers: {
                'Authorization': `Bearer ${cookie.get('sginUP') || cookie.get('token')}`
            }
        })
    } catch (error) {
        console.error(error)
    }
}
const SendBid = () => {
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
    if(isError){
        return (
            <div className="center">
                <Header/>
                We could not find your ProjectList
                <span role="img" aria-label="sad">
        </span>
            </div>
        );
    }
    if (isLoading) {
        return <div className="center">Loading...</div>;
    }

    return (
        <>
            <Header/>
            <span className={"container-app"}>send-bid</span>
        </>
    );
};

export default SendBid;


export const getStaticProps: GetStaticProps = async (context:any) => {
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
        revalidate: 60
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    };
};
