import React, {useEffect, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chant-Content";
import Heading from "@/app/shared/HeadingTitle";
import ChatForm from "@/app/shared/form/chat-form/formChat";
import SubChatLayout from "@/app/components/layout/SubChatlayout";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import {GetServerSideProps} from "next";
import {ClipLoader} from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: Date;
}
const MainContent: NextPageWithLayout = () => {
    //variable
    const router = useRouter();
    const userId = router.query.id;
    const cookie = new Cookies();
    //state
    const [messages, setMessages] = useState< Message[]>([]);
    const [page, setPage] = useState(7);
    const [hasMore, setHasMore] = useState(true);
    //function
    const handleSendMessage =async (formPayload: any) => {
        const newMessage: any = {
            id: messages.length + 1,
            content:formPayload.message,
            timestamp: new Date(),
        };
        try {
         const res= await callApi().post(`/threads/threads/${userId}/messages`,{
             text:formPayload.message
         },{
             headers: {
                 'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
             }
         })
           if(res.data){
            console.log(res.data)
               setMessages([...messages, newMessage]);
           }

        }catch (err){
        }
        setMessages([...messages, newMessage]);
    };
    //query
    const ProjectId = typeof router.query?.id === "string" ? router.query.id : "";
    const {data: GetMessage, isLoading, isError } = useQuery(
        ["getMassage", FetchMassageFromServer,page],
        () => FetchMassageFromServer(ProjectId,page),
        {
            enabled: ProjectId.length > 0,
            staleTime: Infinity
        }
    );
//
console.log(GetMessage?.data?.messages?.length || null)
   const fetchMoreData = () => {
        if (GetMessage?.data?.messages?.length  >= 50) {
            setHasMore(false);
            return;
        }
        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
          setPage(page+15)
        }, 500);
    };

    return (
        <div>
            {
                userId ? <ChatLayout>
                    <Heading titlesite={"گفتگو"} page={"کایا"}/>
                    <div className="">
                        <div className="flex  flex-row  min-h-[70vh] justify-between ">
                            <div className="  w-full px-5 flex flex-col justify-between">
                                {/*show message*/}
                                <div className=" h-[50vh] overflow-y-scroll flex flex-col  mt-5">
                                    {
                                        messages.map((chat,id)=>{
                                            return (
                                                <ul  key={id}>
                                                    {chat?.content}
                                                </ul>
                                            )
                                        })
                                    }
                        <InfiniteScroll dataLength={GetMessage?.data?.messages?.length || null} next={fetchMoreData}  hasMore={hasMore} loader={<div className={"animate__animated  animate__fadeInDown flex items-center justify-center"}>
                            <div className={"bg-gray-100 rounded-md px-12 py-1"}>
                                <ClipLoader color="#8a8a8a" />
                            </div>
                        </div>}>
                            {
                                GetMessage?.data?.messages?.map((massage:any,id:number)=>{
                                    const dates = [new Date(massage?.date)]
                                    const formattedDates = dates.map(date => `${date?.getHours()}:${date?.getMinutes()}`);

                                    return (
                                        <ul key={id} className={`flex ${massage?.is_received?'justify-start':'justify-end'} items-center mb-4`}>

                                            {
                                                massage?.is_received ? <li className="ml-2 py-3 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                                        <div>
                                                            {massage?.text}
                                                            {massage?.is_attachment ? <div className={"text-bold flex items-center gap-4"}>
                                                                <span className={"text-sm "}>{massage?.file_name}</span>
                                                                <i className="ri-attachment-line rotate-45 text-[1rem] font-semibold"></i></div>:null}
                                                            <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>
                                                        </div>
                                                    </li>:
                                                    <li  className="flex items-center  gap-5  mr-2 py-3 px-4 bg-[#3D5A6C] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                                        <div>
                                                            {massage?.text}
                                                            <div className={"text-[8px] text-gray-300 pl-3 text-right"}>{formattedDates}</div>
                                                            {massage?.is_attachment ? <div className={"text-red-400"}>attach</div>:null}
                                                        </div>
                                                        {
                                                            isError ?
                                                                <i className="ri-close-circle-fill  text-red-200 text-lg"></i>  : <div>
                                                                    <i className="ri-checkbox-circle-fill text-green-200 text-lg"></i>
                                                                </div>
                                                        }
                                                    </li>
                                            }
                                            {
                                                isError ?  <i className="ri-close-circle-line text-red-400 text-lg"></i>:null
                                            }
                                        </ul>
                                    )
                                })
                            }
                        </InfiniteScroll>


                                </div>
                                {/*send Message*/}
                                  <ChatForm onSendMessage={handleSendMessage}/>
                            </div>
                        </div>
                    </div>
                </ChatLayout> : <div>User not Found</div>
            }

        </div>

    );
};
MainContent.getLayout = (page) => <SubChatLayout>{page}</SubChatLayout>
export default MainContent;
export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const {id} = context.params
    const queryClient = new QueryClient();
    try {
        // @ts-ignore
        await queryClient.prefetchQuery(['[project]', id], () => FetchMassageFromServer(id))
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

export const FetchMassageFromServer = async (id: any,page:any) => {
    const cookie = new Cookies()
    try {
        return await callApi()?.get(`/threads/threads/${id}/messages?limit=${page}&offset=3`,{
            headers: {
                'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
            }
        })
    } catch (error) {
        // @ts-ignore
        if (error?.code === 'ECONNRESET') {
            console.log('Connection was reset.');
            // You can retry the request here by calling the function again after a short delay.
        } else {
            // @ts-ignore
            console.log('Error occurred:', error);
        }
    }
}