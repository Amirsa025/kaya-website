import React, {useEffect, useRef, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chant-Content";
import Heading from "@/app/shared/HeadingTitle";
import ChatForm from "@/app/shared/form/chat-form/formChat";
import SubChatLayout from "@/app/components/layout/SubChatlayout";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import {useInfiniteQuery} from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInView} from "react-intersection-observer";
import {Message} from "@/app/models/model";
import MessagesChat from "@/app/components/chat/Messages";
import ClipLoader from "react-spinners/ClipLoader";
const MainContent: NextPageWithLayout = () => {
    //variable
    const router = useRouter();
    const userId = router.query.id;
    const cookie = new Cookies();
    const LIMIT = 5;
    const {ref, inView} = useInView()
    //state
    const [messages, setMessages] = useState<Message[]>([]);
    const itemsRef = useRef<HTMLDivElement>();
    //function
    const handleSendMessage = async (formPayload: any) => {
        try {
            const res = await callApi().post(`/threads/threads/${userId}/messages`, {
                text: formPayload.message
            }, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
                }
            })
            if (res.data) {
                setMessages([...messages, res.data]);
            }

        } catch (err) {
            console.log(err)
        }
    };
    const isToday = (date: any) => {
        const now = new Date();
        if (date > now) return false;
        return (+new Date() - +date) < 24 * 60 * 60 * 1000;
    };
    //query
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
            } else {
                // @ts-ignore
                console.log('Error occurred:', error);
            }
        }
    }
    const ChatId = typeof router.query?.id === "string" ? router.query.id : "";
    const {
        data: GetMessage,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ["getMassage", ChatId],
        ({pageParam =0}) => fetchChatList(ChatId, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                const all = allPages.flatMap((item) => item?.data.messages)
                const nextItem = lastPage?.data?.messages?.length === LIMIT ?all.length  : undefined
                console.log(nextItem)
                return nextItem
            }
            , cacheTime: 1000   ,

        }
    );
// Fetch the next page if the last item is in view and there are more pages to fetch
    useEffect( () => {
        if (inView && hasNextPage) {
            // @ts-ignore
            itemsRef?.current?.lastChild?.scrollIntoView({ behavior: 'smooth' });
            fetchNextPage().then();
        }
    }, [fetchNextPage, hasNextPage,inView]);
    useEffect(() => {
        // Scroll to the last item when items change
        // @ts-ignore
        itemsRef?.current?.lastChild?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    //concat data infinite scroll
    const pages = GetMessage?.pages?.flatMap((group: any) => group?.data)

    // @ts-ignore
    if (!router.isReady) {
        return <div>loading...</div>
    }
    return (
        <div>
            {
                <ChatLayout>
                    <Heading titlesite={"گفتگو"} page={"کایا"}/>
                    <div>
                        <div className="flex  flex-row  min-h-[65vh] justify-evenly ">
                            <div className="  w-full px-5 flex flex-col justify-evenly">
                                {/*show message*/}
                                <div  className=" h-[50vh] overflow-y-scroll  mt-5">
                                    {
                                        isLoading ? <div className={"center-item"}>
                                                <ClipLoader
                                                    size={50}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                                />
                                            </div> :
                                            <InfiniteScroll
                                                scrollThreshold={0.75}
                                                style={{ display: 'flex', flexDirection: 'column-reverse' ,overflow:"visible" }}
                                                dataLength={pages?.length || 0}
                                                next={fetchNextPage}
                                                hasMore={!hasNextPage}
                                                loader={<div>load</div>}
                                            >
                                                {
                                                    GetMessage?.pages?.flatMap((page: any, id: number) => {
                                                           // @ts-ignore
                                                        return <MessagesChat ref={itemsRef} key={id} isToday={isToday} page={page?.data}/>

                                                    })
                                                }
                                                <div className={"flex items-center justify-center "}>
                                                    <button
                                                        ref={ref}

                                                        disabled={!hasNextPage || isFetchingNextPage}
                                                    >
                                                        {isFetchingNextPage?  <ClipLoader
                                                            size={50}
                                                            aria-label="Loading Spinner"
                                                            data-testid="loader"
                                                        />: hasNextPage ?
                                                            <div className={"w-5  h-5 shadow rounded-full"}  onClick={() => fetchNextPage()}>
                                                                <i className="ri-add-circle-line text-[20px]"></i>
                                                            </div>
                                                            :   <div className={"animate__fadeInUp"}></div>}
                                                    </button>
                                                </div>
                                            </InfiniteScroll>
                                    }
                                    {/*post massages*/}
                                    <div>
                                        {
                                            messages.flatMap((chat, ChatId) => {
                                                const dates = [new Date(chat?.date)]
                                                const formattedDates = dates.flatMap(date => `${date?.getHours()}:${date?.getMinutes()}`);
                                                const GetDate = dates.map(date => ` ${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDay()}`);
                                                return (
                                                    // @ts-ignore
                                                    <ul ref={itemsRef} key={ChatId}
                                                        className={`flex  items-center mb-4 justify-end`}>
                                                        <li className={"flex items-center  gap-5  mr-2 py-3 px-4 bg-[#3D5A6C] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"}>
                                                            <span>  {chat?.text}</span>
                                                            {
                                                                isToday(chat?.date) ? <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div> :
                                                                    <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                                            }
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </div>
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
MainContent.getLayout = (page) => <SubChatLayout>{page}</SubChatLayout>
export default MainContent;