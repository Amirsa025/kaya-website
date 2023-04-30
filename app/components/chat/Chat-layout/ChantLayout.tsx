import Image from "next/image";
import Link from "next/link";
import React from "react";
import SideBarChat from "@/app/components/chat/Chat-layout/SideBarChat";

const ChatLayout = ({children}: any) => {
    return (
        <div className={"container-app w-full  direction-ltr  "}>
            <div className={"flex flex-col lg:flex-row   rounded-lg border bg-white "}>
                {/*start chat list*/}
                <SideBarChat/>
                {/*End  chat list*/}
                {/*start  Send Chat*/}
                <div className={"flex-1"}>
                    {children ?? (<div
                            className={"h-[58vh] text-center  w-full px-2 flex items-center justify-center w-full md:h-full flex-col direction-ltr"}>
                            <Image src={'/images/live-chat.svg'} height={100} width={100}
                                   alt={'chat-logo'}/>
                            <h2 className={"font-bold text-[1.3rem] "}>Welcome to your messages</h2>
                            <span>Start connecting with others by
                            <Link href={"/user-panel/project"} className={"font-bold"}>browser a jobs</Link>or posting a project .
                        </span>
                        </div>)
                    }
                </div>
            </div>
            {/*End  Send Chat*/}
        </div>

    );
};

export default ChatLayout;
