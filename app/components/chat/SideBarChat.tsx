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
        , cacheTime: 5000,
    })

    useEffect( () => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage]);
    const threads = chatList?.pages.flatMap((group: any) => group?.data.threads)
    const router = useRouter()

    return (
        <>
            <section className={"border-r  lg:w-1/2 xl:w-1/4  w-full"}>
                <div className={"flex items-center justify-around border py-2"}>
                    <i className="ri-search-line text-gray-400 block "></i>
                    <input type="text" placeholder={"Search"} className={"focus:outline-0"}/>

                    <i className="md:hidden ri-chat-1-fill text-gray-400   cursor-pointer block"
                       onClick={() => setIsOpen(!isOpen)}></i>
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
                        <ul className={"hidden md:block overflow-y-scroll h-[40rem] flex flex-col gap-4 items-start px-4 pt-4"}>
                            {/*get and map data in load more*/}
                            {
                                chatList?.pages?.map((page, id) => {
                                    return (
                                        <ChatList key={id} page={page?.data}/>
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
                <div className={"relative md:hidden"}>
                    <div className={`absolute  bg-white top-0 left-0 w-full lg:w-auto lg:static lg:block lg:justify-start ${isOpen ? "block animate__fadeInDown openListChats" : "  hidden"}`}>
                        {
                            threads?.length ?
                                <ul className={"border overflow-y-scroll h-[40rem] flex flex-col gap-4 items-start px-4"}>
                                    {threads.map((chat,id) => (
                                        <Link href={`/user-panel/chat/${chat?.thread_id}`} legacyBehavior shallow={true} key={id} >
                                            <div className={"text-white hover:text-black sendMassageButton mt-4 flex items-center my-2 py-8 w-full border  text-white px-2 gap-4 cursor-pointer  rounded-xl hover:text-black hover:bg-gray-100 "}>
                                                <div onClick={() => setIsOpen(!isOpen)} className={router.asPath == `/user-panel/chat/${chat?.thread_id}` ? " animate__fadeInDown openListChats text-white bg-[#3e5b6d] flex items-center gap-2 w-full h-12  px-2  rounded-md hover:cursor-pointer" : "flex items-center gap-2"}>
                                                    <div className={"w-6 h-6 bg-green-400 rounded-lg text-center"}>
                                                        <i className={router.asPath == `/user-panel/chat/${chat?.thread_id}` ? "ri-message-3-fill text-white" : "ri-message-3-fill text-gray-50 "}></i>
                                                    </div>
                                                    <div className={"flex justify-between w-full"}>
                                                        <div>{chat?.employer_user_name}</div>
                                                        <div>{chat?.date}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
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
                                                :   <div className={"animate__fadeInUp"}>پایان لیست </div>}
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