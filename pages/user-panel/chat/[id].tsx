import React, {Fragment, useEffect, useRef, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chant-Content";
import Heading from "@/app/shared/HeadingTitle";
import ChatForm from "@/app/shared/form/chat-form/formChat";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import {QueryCache, useInfiniteQuery, useIsFetching} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInView} from "react-intersection-observer";
import {Message} from "@/app/models/model";
import MessagesChat from "@/app/components/chat/Messages";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import {BarLoader} from "react-spinners";

const MainContent: NextPageWithLayout = () => {
    //variable
    const router = useRouter();
    const userId = router.query.id;
    const ChatId = typeof userId === "string" ? userId : "";
    const LIMIT = 7;
    //state
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState();
    const itemsRef = useRef<HTMLDivElement>();
    const {ref, inView} = useInView()
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
            setMessage(formPayload);

        }

    };
    const isToday = (date: any) => {
        const now = new Date();
        if (date > now) return false;
        return (+new Date() - +date) < 24 * 60 * 60 * 1000;
    };


    //set Query for get message
    const {
        data: GetMessage,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(
        ["getMassage", ChatId],
        ({pageParam = 0}) => fetchChatList(ChatId, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const all = allPages.flatMap((item) => item?.data.messages)
                return lastPage?.data?.messages?.length === LIMIT ? all.length : undefined
            },
            staleTime: Infinity,
            cacheTime: 1000,
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
    const isFetchingPosts = useIsFetching({queryKey: ['getMassage']})
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
    useEffect(() => {
        // فراخوانی تابع clearTextAfterDelay() با ورودی "myState" و زمان تأخیر 7000
        clearTextAfterDelay(message, setMessage, 5000);
    }, [message]);
    const clearTextAfterDelay=(state:any, setState:any, delay:number)=> {
        setTimeout(function() {
            setState(null); // جایگزینی مقدار "text" در "state" با رشته‌ی خالی
        }, delay);
    }
    //router event
    if (!router.isReady) {
        return <div>loading...</div>
    }


    return (
        <section>
            {
                <ChatLayout>
                    <Heading titlesite={"گفتگو"} page={"کایا"}/>
                    <div>
                        <div className="flex flex-row  min-h-[70%] justify-evenly ">
                            <div className="  w-full px-5 flex flex-col justify-evenly">
                                {/*show message*/}
                                <div className="md:min-h-[60vh] min-h-[30vh]  ">
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
                                                    scrollableTarget={"scrollableTarget"}
                                                    className={"flex flex-col-reverse overflow-scroll !h-[19rem]  mobile:!h-[28rem] laptop:!min-h-[25rem] desktop:!h-[40rem]"}
                                                    dataLength={pages?.length || 0}
                                                    next={fetchNextPage}
                                                    hasMore={!!hasNextPage}
                                                    loader={<div/>}
                                                    inverse={true}
                                                >
                                                    <div
                                                        className={"flex flex-col justify-end w-full text-end  "}>
                                                        <div
                                                            className={"flex justify-end "}>{isFetching && !isFetchingNextPage ?
                                                            <div  >

                                                                {
                                                                    // @ts-ignore
                                                                    !message?.text?.length ?<div className={"flex-col flex text-sm !text-[10px] !lg:text-[13px]"}>
                                                                        </div>:
                                                                        <div className="flex items-center  gap-5  mr-2 py-3 px-4 bg-[#10515c] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white ">
                                                                            {/*// @ts-ignore*/}
                                                                            <span  className={"flex-col flex text-sm !text-[10px] !lg:text-[13px]"}>{message?.text}</span>
                                                                            <i className="ri-time-line"></i>
                                                                        </div>
                                                                }
                                                            </div> :
                                                            <div></div>}
                                                        </div>
                                                    </div>
                                                    {
                                                        GetMessage?.pages?.flatMap((page: any, id: number) => {
                                                            return (
                                                                <div key={id}>
                                                                    <MessagesChat isToday={isToday} page={page?.data} />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <div
                                                        className={"flex items-center justify-center py-4 xl:py-1 text-gray-700"}>
                                                        <button ref={ref}>
                                                            {isFetchingPosts ?
                                                                <div
                                                                    className={`px-6 py-1 text-[10px] bg-blue-600 text-white border rounded-full  `}>updating
                                                                    conversion</div> : hasNextPage ?
                                                                    <div
                                                                        className={"w-5  h-5 shadow rounded-full"}
                                                                        onClick={() => fetchNextPage()}>
                                                                        <i className="ri-add-circle-line text-[20px]"></i>
                                                                    </div>
                                                                    : <div
                                                                        className={"animate__fadeInUp"}></div>}
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
        </section>
    );
};

//layout
MainContent.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default MainContent;



