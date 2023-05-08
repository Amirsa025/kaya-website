import React from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";
interface IChatProps {
    thread:any
}
const ChatList:React.FC<IChatProps> = ({thread}) => {
    const router = useRouter()
    return (
        <>
            {
                thread?.threads.map((chat:any)=>{
                    const dates = [new Date(chat?.date)]
                    const formattedDates = dates.map(date => `${date?.getHours()}:${date?.getMinutes()}`);
                    return (
                        <li key={chat?.thread_id} className={" text-white hover:text-black sendMassageButton mt-4 flex items-center my-2 py-4 w-full border  px-2 gap-4 cursor-pointer  rounded-xl hover:bg-gray-100 "}>
                            <span></span>
                            <Link href={`/user-panel/chat/${chat?.thread_id}`} legacyBehavior shallow={true} className={"w-full"}>
                                <div className={ router.asPath ==`/user-panel/chat/${chat?.thread_id}` ?`text-white bg-blue-gray-400 flex items-center py-3 gap-2 w-full h-12  px-2  rounded-md hover:cursor-pointer`:'flex justify-between w-full items-center gap-2'}>
                                    <div>
                                        <div className={"w-6 h-6 bg-green-400 rounded-lg text-center"}>
                                            <i className={router.asPath ==`/user-panel/chat/${chat?.thread_id}`? "ri-message-3-fill text-white":"ri-message-3-fill text-gray-50 "}></i>
                                        </div>
                                    </div>
                                    <div className={"flex items-center justify-between w-full gap-2"}>
                                        <div>
                                            <div className={"text-md "}>{chat?.employer_user_name}</div>
                                            <div className={"text-[12px] line-clamp-1"}>{chat?.last_message}</div>
                                        </div>
                                        {chat?.is_unread?<div className={"w-2 h-2 aspect-square bg-red-500 rounded-full"}></div>:null}
                                        <div className={"text-sm "}>{formattedDates.map((time)=>time)}</div>
                                    </div>
                                </div>
                            </Link>
                            <span></span>
                        </li>
                    )
                })
            }
        </>
    );
};

export default ChatList;