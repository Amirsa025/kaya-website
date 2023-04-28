import React from 'react';

import {useRouter} from "next/router";
import Link from "next/link";

const chats = [
    {id: 1, name: "John Doe"},
    {id: 2, name: "Arsen Luoin"},
    {id: 3, name: "Assan Deuob"},
    {id: 4, name: "Assan Deuob"},
    {id: 5, name: "Assan Deuob"},
    {id: 6, name: "Assan Deuob"},
    {id: 8, name: "Assan Deuob"},
];


const SideBarChat = () => {
    const router = useRouter();
    return (
        <>
            <section className={"border-r  lg:w-1/2 xl:w-1/4  w-full"}>
                <div className={"flex items-center justify-around border py-2"}>
                    <i className="ri-search-line text-gray-400 block "></i>
                    <input type="text" placeholder={"Search"} className={"focus:outline-0"}/>
                    <i className="ri-equalizer-fill text-gray-400  block"></i>
                </div>
                {
                    chats.length ?   <ul className={" overflow-y-scroll h-[40rem] flex flex-col gap-4 items-start px-4"}>
                            {chats.map((chat) => (
                                <li key={chat.id}
                                    className={"mt-4 flex items-center my-2 py-4 w-full border  px-2 gap-4 cursor-pointer  rounded-xl hover:bg-gray-100 "}>
                                    <Link href={`/user-panel/chat/${chat.id}`} legacyBehavior
                                          shallow={true}>
                                        <div  className={router.asPath ==`/user-panel/chat/${chat.id}`  ? "text-white bg-[#3e5b6d] flex items-center gap-2 w-full h-12  px-2  rounded-md hover:cursor-pointer" : "flex items-center gap-2"} >
                                            <i className={router.asPath ==`/user-panel/chat/${chat.id}`? "ri-message-3-fill text-white":"ri-message-3-fill text-gray-400 "}></i>
                                            <a>{chat.name}</a>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        :
                        ( <div className={"text-yellow-900 text-center flex h-full items-center gap-2 justify-center "}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth="1.5" stroke="currentColor" className="w-9 h-9 text-yellow-900">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                            </svg>
                            <span className={"font-bold txt-8 "}>you are not exist chat </span>
                        </div>)
                }
            </section>
        </>
    );
};

export default SideBarChat;