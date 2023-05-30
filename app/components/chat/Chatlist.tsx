import React from 'react';
import Link from 'next/link';
import {useRouter} from "next/router";
interface IChatProps {
    page:any,
    isToday:any
}
const ChatList:React.FC<IChatProps> = ({page,isToday}) => {
    const router = useRouter()
    return (
        <>
            {
                page?.threads.map((chat:any,id:number)=>{
                    const dateRes= chat?.date*1000
                    const dates = [new Date(dateRes)]
                    const formattedDates = dates.map(date => `${date?.getHours()}:${date?.getMinutes()}`);
                    const GetDate = dates.map(date => ` ${date?.getFullYear()}-${date?.getMonth()+1}-${date?.getDay()}`);
                    if(page?.threads.length===id+1){
                        return (
                            <Link href={`/user-panel/chat/${chat?.thread_id}`} legacyBehavior shallow={true} key={id} >
                                <a className={"sendMassageButton text-white hover:text-black  mt-4 flex items-center my-2 py-4 w-full border  px-2 gap-4 cursor-pointer  rounded-xl hover:bg-gray-100"}>
                                    <span></span>
                                    <div  className={"w-full"}>
                                        <div className={ router.asPath ==`/user-panel/chat/${chat?.thread_id}` ?`text-white bg-blue-gray-400 flex items-center py-3 gap-2 w-full h-12  px-2  rounded-md hover:cursor-pointer`:'flex justify-between w-full items-center gap-2'}>
                                            <div>
                                                <div className={"w-6 h-6 bg-green-400 rounded-lg text-center"}>
                                                    <i className={router.asPath ==`/user-panel/chat/${chat?.thread_id}`? "ri-message-3-fill text-white":"ri-message-3-fill text-gray-50 "}></i>
                                                </div>
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
                                    </div>
                                    <span></span>
                                </a>
                            </Link>
                        )

                    }else {
                        return (
                            <Link href={`/user-panel/chat/${chat?.thread_id}`} legacyBehavior shallow={true} key={chat?.thread_id} >
                                <div className={"sendMassageButton text-white hover:text-black  mt-4 flex items-center my-2 py-4 w-full border  px-2 gap-4 cursor-pointer  rounded-xl hover:bg-gray-100"}>
                                    <span></span>
                                    <div  className={"w-full"}>
                                        <div className={ router.asPath ==`/user-panel/chat/${chat?.thread_id}` ?`text-white bg-blue-gray-400 flex items-center py-3 gap-2 w-full h-12  px-2  rounded-md hover:cursor-pointer`:'flex justify-between w-full items-center gap-2'}>
                                            <div>
                                                <div className={"w-6 h-6 bg-green-400 rounded-lg text-center"}>
                                                    <i className={router.asPath ==`/user-panel/chat/${chat?.thread_id}`? "ri-message-3-fill text-white":"ri-message-3-fill text-gray-50 "}></i>
                                                </div>
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
                                    </div>
                                    <span></span>
                                </div>
                            </Link>
                        )
                    }

                })
            }

        </>
    );
};

export default ChatList;