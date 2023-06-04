import React, {useEffect, useRef, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chant-Content";
import Heading from "@/app/shared/HeadingTitle";
import ChatForm from "@/app/shared/form/chat-form/formChat";
import SubChatLayout from "@/app/components/layout/SubChatlayout";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import {QueryCache, useInfiniteQuery, useIsFetching} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInView} from "react-intersection-observer";
import {Message} from "@/app/models/model";
import MessagesChat from "@/app/components/chat/Messages";
import useMediaQuery from '@mui/material/useMediaQuery';
const MainContent: NextPageWithLayout = () => {
    //variable
    const router = useRouter();
    const userId = router.query.id;
    const ChatId = typeof userId === "string" ? userId : "";
    const LIMIT = 7;
    //state
    const [messages, setMessages] = useState<Message[]>([]);
    const itemsRef = useRef<HTMLDivElement>();
    const {ref, inView} = useInView()
    const matches = useMediaQuery('(max-width:1366px)');
    //function
    const fetchChatList = async (chatId: string | (string[] & string), pageParam: number) => {
        const cookie = new Cookies()
        try {
            return await callApi()?.get(`/threads/threads/${chatId}/messages?limit=${LIMIT}&offset=${pageParam}`, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
                }
            })
        } catch (error) {
            // @ts-ignore
            if (error?.code === 'ECONNRESET') {
                console.log('Connection was reset.');
                // You can retry the request here by calling the function again after a short delay.
            }

        }
    }
    const handleSendMessage = async (formPayload: any) => {
        if (formPayload) {
            setMessages([...messages, formPayload]);
        }

    };
    const isToday = (date: any) => {
        const now = new Date();
        if (date > now) return false;
        return (+new Date() - +date) < 24 * 60 * 60 * 1000;
    };
    //set Query for get message
    const {data: GetMessage, isLoading, fetchNextPage,hasNextPage} = useInfiniteQuery(
        ["getMassage", ChatId],
        ({pageParam = 0}) => fetchChatList(ChatId, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const all = allPages.flatMap((item) => item?.data.messages)

                return lastPage?.data?.messages?.length === LIMIT ? all.length : undefined
            },
            staleTime:Infinity,
            cacheTime:1000,
            refetchInterval:7000,
        }
    );
    const queryCache = new QueryCache({
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onSettled: (data, error) => {
            console.log(data, error)
        },
    })
    const isFetchingPosts = useIsFetching({ queryKey: ['getMassage'] })
    queryCache.find(['getMassage'])
    const pages = GetMessage?.pages?.flatMap((group: any) => group?.data)
    //effect side
    // Fetch the next page if the last item is in view and there are more pages to fetch
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage().then();
        }
    }, [fetchNextPage, hasNextPage, inView]);
    useEffect(() => {
        // Scroll to the last item when items change
        // @ts-ignore
        itemsRef?.current?.lastChild?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
    if (!router.isReady) {
        return <div>loading...</div>
    }
    return (
        <div>
            {
                <ChatLayout>
                    <Heading titlesite={"گفتگو"} page={"کایا"}/>
                    <div>
                        <div className="flex flex-row  min-h-[65vh] justify-evenly ">
                            <div className="  w-full px-5 flex flex-col justify-evenly">
                                {/*show message*/}
                                <div className="min-h-[70vh] md:min-h-[65vh] ">
                                    {
                                        isLoading ? <div className={"center-item"}>
                                                <div
                                                    className={`px-6 py-1 text-[12px] bg-blue-600 text-white border rounded-full ${isLoading ? 'animate__animated animate__fadeInUp' : 'animate__animated animate__fadeInDown'} `}>updating
                                                </div>
                                                {/*post massages*/}
                                            </div> :
                                            <div id={"scrollableTarget"}>
                                                <InfiniteScroll
                                                    scrollThreshold={0.75}
                                                    height={matches?500:700}
                                                    scrollableTarget={"scrollableTarget"}
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column-reverse',
                                                        overflow: "scroll",
                                                    }}
                                                    dataLength={pages?.length || 0}
                                                    next={fetchNextPage}
                                                    hasMore={!!hasNextPage}
                                                    loader={<div/>}
                                                    inverse={true}
                                                >
                                                    <div className={"flex flex-col"}>
                                                    </div>
                                                    {
                                                        GetMessage?.pages?.flatMap((page: any, id: number) => {

                                                            return (<MessagesChat key={id} isToday={isToday} page={page?.data}/>)
                                                        })
                                                    }
                                                    <div className={"flex items-center justify-center py-4 xl:py-1 text-gray-700"}>
                                                        <button ref={ref}>
                                                            {isFetchingPosts ?
                                                                <div
                                                                    className={`px-6 py-1 text-[10px] bg-blue-600 text-white border rounded-full  `}>updating conversion</div> : hasNextPage ?
                                                                    <div
                                                                        className={"w-5  h-5 shadow rounded-full"}
                                                                        onClick={() =>fetchNextPage()}>
                                                                        <i className="ri-add-circle-line text-[20px]"></i>
                                                                    </div>
                                                                    : <div className={"animate__fadeInUp"}></div>}
                                                        </button>
                                                    </div>
                                                </InfiniteScroll>
                                            </div>
                                    }

                                </div>
                                {/*send Message*/}
                                <ChatForm onSendMessage={handleSendMessage}/>
                            </div>
                        </div>
                    </div>
                </ChatLayout>
            }
        </div>
    );
};

//layout
MainContent.getLayout = (page) => <SubChatLayout>{page}</SubChatLayout>
export default MainContent;



