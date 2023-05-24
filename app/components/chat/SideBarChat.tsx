import React, {useEffect, useState} from 'react';
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from 'react-intersection-observer'
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import {BeatLoader, ScaleLoader} from "react-spinners";
import ChatList from "@/app/components/chat/Chatlist";
import Link from 'next/link';
import {useRouter} from "next/router";
//variable
const cookie = new Cookies()
const LIMIT = 6;

//function
const fetchChatList = async (pageParam: number) => {

    try {
        return await callApi().get(`/threads/threads?limit=${LIMIT}&offset=${pageParam}`, {
            headers: {
                'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const isToday = (date:any) => {
    const now = new Date();
    if (date > now) return false;
    return (+new Date() - +date) < 24 * 60 * 60 * 1000;
};
const SideBarChat = () => {
    //state
    const [isOpen, setIsOpen] = useState(false);
    const {ref, inView} = useInView()
    //query
    const {
        status,
        data: chatList,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ['ChatList'],
        queryFn: ({pageParam = 0}) => fetchChatList(pageParam),
        getNextPageParam: (lastPage,allPages) => {
            // @ts-ignore
            return lastPage?.data.threads.length === LIMIT ? allPages[0].data.threads.length  : undefined
        }
        , cacheTime: 1000,
    })
    //effect side
    useEffect( () => {
        if (inView && hasNextPage) {
            fetchNextPage().then();
        }
    }, [inView, fetchNextPage, hasNextPage]);
    const pages = chatList?.pages.map((group: any) => group?.data)
    const router = useRouter()

    return (
        <>
            <section className={"border-r  lg:w-1/2 xl:w-1/4  w-full"}>
                <div className={"flex items-center justify-start px-4 pt-2"}>

                    <svg   onClick={() => setIsOpen(!isOpen)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:hidden ri-chat-1-fill text-gray-400 hover:text-gray-600 text-2xl  cursor-pointer block">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>

                </div>
                {
                    status === 'loading' ? (
                        <div className={"min-h-[70vh] flex items-center justify-center flex-col"}>
                            <ScaleLoader
                                color="#4B6677"
                                height={70}
                                width={10}
                            />
                        </div>
                    ) : status === 'error' ? (
                        <div
                            className={"text-yellow-900 text-center flex h-full items-center gap-2 justify-center min-h-[70vh]"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth="1.5" stroke="currentColor"
                                 className="w-9 h-9 text-yellow-900">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                            </svg>
                            <span className={"font-bold txt-8 "}>you are not exist chat </span>
                        </div>
                    ) : (
                        <ul className={"hidden lg:block overflow-y-scroll lg:h-[40rem]  2xl:h-[43rem] flex flex-col gap-4 items-start px-4 pt-8"}>
                            {/*get and map data in load more*/}
                            {
                                chatList?.pages?.map((page, id) => {
                                    return (
                                        <ChatList key={id} page={page?.data} isToday={isToday}/>
                                    )
                                })
                            }
                            <div className={"flex items-center justify-center py-1"}>
                                <button
                                    ref={ref}
                                    onClick={() => fetchNextPage()}
                                    disabled={!hasNextPage || isFetchingNextPage}
                                >
                                    {isFetchingNextPage
                                        ? <div className={"animate__animated animate__fadeInDown text-[10px]"}>
                                            <BeatLoader
                                                color="#4A6576"
                                                size={10}
                                            /> </div>
                                        : hasNextPage
                                            ?    <div className={" w-7 h-7 shadow rounded-full"}>
                                                <i className="flex items-center justify-center block text-3xl ri-arrow-drop-down-line"></i>
                                            </div>
                                            : null}
                                </button>
                            </div>
                        </ul>
                    )
                }
                <div className={"z-20 relative lg:hidden"}>
                    <div className={`absolute  bg-white top-0 left-0 w-full lg:w-auto lg:static lg:block lg:justify-start ${isOpen ? "block animate__fadeInDown openListChats" : "  hidden"}`}>
                        {
                            pages?.length ?
                                <ul className={" overflow-y-scroll h-[44rem] flex flex-col gap-4 items-start px-4"}>
                                    {pages?.map((page,id) =>{
                                            return(
                                                <React.Fragment key={id}>
                                                    {
                                                        page?.threads.map((chat:any,id:number)=>{
                                                            const dateRes= chat?.date*1000
                                                            const dates = [new Date(dateRes)]
                                                            const formattedDates = dates.map(date => `${date?.getHours()}:${date?.getMinutes()}`);
                                                            const GetDate = dates.map(date => ` ${date?.getFullYear()}-${date?.getMonth()+1}-${date?.getDay()}`);
                                                            if(page?.threads.length===id+1){
                                                                return (
                                                                    <Link href={`/user-panel/chat/${chat?.thread_id}`} legacyBehavior shallow={true} key={id} >
                                                                        <a className={"text-white hover:text-black sendMassageButton mt-4 flex items-center my-2 py-8 w-full border  text-white px-2 gap-4 cursor-pointer  rounded-xl hover:text-black hover:bg-gray-100 "}>
                                                                            <div onClick={() => setIsOpen(!isOpen)} className={router.asPath == `/user-panel/chat/${chat?.thread_id}` ? " animate__fadeInDown openListChats text-white bg-[#3e5b6d] flex items-center gap-2  w-full h-12  px-2  rounded-md hover:cursor-pointer" : "flex items-center gap-2 w-full"}>
                                                                                <div className={"w-6 h-6 bg-green-400 rounded-lg text-center"}>
                                                                                    <i className={router.asPath == `/user-panel/chat/${chat?.thread_id}` ? "ri-message-3-fill text-white" : "ri-message-3-fill text-gray-50  "}></i>
                                                                                </div>
                                                                                <div className={"flex justify-between w-full items-center"}>
                                                                                    <div>{chat?.employer_user_name}</div>
                                                                                    {chat?.is_unread?<div className={"w-2 h-2 aspect-square bg-red-500 rounded-full"}></div>:null}
                                                                                    {
                                                                                        isToday(chat?.date) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </Link>
                                                                )

                                                            }else {
                                                                return (
                                                                    <Link href={`/user-panel/chat/${chat?.thread_id}`} legacyBehavior shallow={true} key={id} >
                                                                        <a className={"text-white hover:text-black sendMassageButton mt-4 flex items-center my-2 py-8 w-full border  text-white px-2 gap-4 cursor-pointer  rounded-xl hover:text-black hover:bg-gray-100 "}>
                                                                            <div onClick={() => setIsOpen(!isOpen)} className={router.asPath == `/user-panel/chat/${chat?.thread_id}` ? " animate__fadeInDown openListChats text-white bg-[#3e5b6d] flex items-center gap-2  w-full h-12  px-2  rounded-md hover:cursor-pointer" : "flex items-center gap-2 w-full"}>
                                                                                <div className={"w-6 h-6 bg-green-400 rounded-lg text-center"}>
                                                                                    <i className={router.asPath == `/user-panel/chat/${chat?.thread_id}` ? "ri-message-3-fill text-white" : "ri-message-3-fill text-gray-50 "}></i>
                                                                                </div>
                                                                                <div className={"flex items-center justify-between w-full gap-2"}>
                                                                                    <div className={"flex-1"}>
                                                                                        <div className={"text-md "}>{chat?.employer_user_name}</div>
                                                                                        <div className={"text-[12px] line-clamp-1"}>{chat?.last_message}</div>
                                                                                    </div>
                                                                                    <div className={"flex items-center justify-between gap-2"}>
                                                                                        {
                                                                                            isToday(dateRes) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right "}>{formattedDates}</div>:  <div className={"text-[12px] text-gray-300 pl-3 text-right "}>{GetDate}</div>
                                                                                        }
                                                                                        {chat?.is_unread?<div className={"w-2 h-2 aspect-square bg-red-500 rounded-full"}></div>:null}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </a>
                                                                    </Link>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </React.Fragment>
                                            )

                                        }
                                     )}
                                    <div className={"flex items-center justify-center "}>
                                        <button
                                            ref={ref}
                                            onClick={() => fetchNextPage()}
                                            disabled={!hasNextPage || isFetchingNextPage}
                                        >
                                            {isFetchingNextPage?'Loading more...': hasNextPage ?
                                                <div className={"w-3 h-3 shadow rounded-full"}>
                                                <i className="ri-arrow-drop-down-line"></i>
                                            </div>
                                                :   <div className={"animate__fadeInUp"}></div>}
                                        </button>
                                    </div>
                                </ul>
                                :
                                (<div
                                    className={"text-yellow-900 text-center flex h-full items-center gap-2 justify-center "}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                         viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="currentColor"
                                         className="w-9 h-9 text-yellow-900">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                                    </svg>
                                    <span
                                        className={"font-bold txt-8 "}> you are not exist chat </span>
                                </div>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default SideBarChat;