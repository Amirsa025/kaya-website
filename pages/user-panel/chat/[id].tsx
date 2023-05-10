import React, {useState} from 'react';

import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chant-Content";
import Heading from "@/app/shared/HeadingTitle";
import ChatForm from "@/app/shared/form/chat-form/formChat";
import dynamic from "next/dynamic";
import SubChatLayout from "@/app/components/layout/SubChatlayout";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import {GetServerSideProps} from "next";
import {fetchProjects} from "@/pages/user-panel/project/[id]";

dynamic(
    () => import('@/app/shared/Header'),
    {ssr: false}
);
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
    const {isSuccess, data:Getmessage, isLoading, isError} = useQuery(
        ["getSendData", ProjectId],
        () => FetchMassageFromServer(ProjectId),
        {
            enabled: ProjectId.length > 0,
            staleTime: Infinity,
        }
    );
    React.useEffect(() => {
        if (Getmessage === undefined) {
            const queryClient = new QueryClient();
            queryClient.setQueryData(['getMessage', ProjectId], {});
            queryClient.getQueryData(['myQueryData', ProjectId]);
        }
    }, [Getmessage]);
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
                                    {/*receive message from server*/}
                                    {
                                        Getmessage?.data?.messages?.map((massage:any,id:number)=>{
                                           return (
                                               <ul key={id} className={`flex ${massage?.is_received?'justify-start':'justify-end'} items-center mb-4`}>
                                                   {
                                                     massage?.is_received ? <li  className="ml-2 py-3 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">{massage?.text}</li>:<li  className="flex items-center  gap-5  mr-2 py-3 px-4 bg-[#3D5A6C] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">{massage?.text}</li>
                                                   }

                                               </ul>

                                           )
                                        })
                                    }
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
    const {id} = context.params;
    console.log(id)
    const queryClient = new QueryClient();
    try {
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
export const FetchMassageFromServer = async (id: any) => {
    const cookie = new Cookies()
    try {
        return await callApi().get(`/threads/threads/${id}/messages?limit=50&offset=5`, {
            headers: {
                'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
            }
        })
    } catch (error) {
        console.error(error)
    }
}