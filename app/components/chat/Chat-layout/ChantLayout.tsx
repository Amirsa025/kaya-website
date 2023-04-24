import Image from "next/image";
import Link from "next/link";
import React from "react";


const chats = [
    {id: 1, name: "Chat 1"},
    {id: 2, name: "Chat 2"},
    {id: 3, name: "Chat 3"},
];

const ChatLayout = ({children}: any) => {
    return (
        <div className={"md:container-app direction-ltr"}>
            <div
                className={"flex flex-col md:flex-row md:items-center  rounded-lg border bg-white "}>
                {/*start chat list*/}
                <div className={"border-r pr-2 lg:w-1/5  md:min-h-[60vh] mx-2 my-2"}>
                    <div
                        className={"flex items-center justify-center px-8 border rounded-lg flex items-center gap-3 py-2"}>
                        <i className="ri-search-line text-gray-400 block "></i>
                        <input type="text" placeholder={"Search"} className={"focus:outline-0"}/>
                        <i className="ri-equalizer-fill text-gray-400  block"></i>
                    </div>
                    <ul className={"flex flex-col gap-4 items-start "}>
                        {chats.map((chat) => (
                            <li key={chat.id}
                                className={"flex items-center my-2 py-4 w-full border  px-2 gap-4 cursor-pointer  rounded-xl hover:bg-gray-100"}>
                                <Image height={70} width={70} src="/images/min-p-800.jpeg"
                                       className={"rounded-md"} alt=""/>
                                <Link href={`/user-panel/chat/${chat.id}`} legacyBehavior
                                      shallow={true}>
                                    <a>{chat.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {/*End  chat list*/}
                {/*start  Send Chat*/}
                <div className={"flex-1"}>
                    {children ?? (<div className={"w-full px-2 flex items-center justify-center w-full flex-col direction-ltr"}>
                        <Image src={'/images/live-chat.svg'} height={100} width={100}
                               alt={'chat-logo'}/>
                        <h2 className={"font-bold text-[1.3rem]"}>Welcome to your messages</h2>
                        <span>Start connecting with others by <Link href={"/user-panel/project"}
                                                                    className={"font-bold"}>browser a jobs</Link> or posting a project .</span>
                    </div>)}
                </div>
            </div>
            {/*End  Send Chat*/}
        </div>

    );
};

export default ChatLayout;
