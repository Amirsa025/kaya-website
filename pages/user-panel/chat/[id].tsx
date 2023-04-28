import React, {useState} from 'react';

import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chat-layout/ChantLayout";
import Heading from "@/app/shared/Heading";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import ChatForm from "@/app/components/chat/Chat-layout/formChat";
import dynamic from "next/dynamic";
interface Props {
    currentUser: number;
}
dynamic(
    () => import('@/app/shared/NavBar'),
    {ssr: false}
);
interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: Date;
}
const MainContent: NextPageWithLayout = () => {
    const router = useRouter();
    const userId = router.query.id;

    const [messages, setMessages] = useState< Message[]>([]);

    const handleSendMessage = (formPayload: any) => {
        const newMessage: any = {
            id: messages.length + 1,
            content:formPayload.message,
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
    };
    return (
        <div>
            {
                userId ? <ChatLayout>
                    <Heading titlesite={"گفتگو"} page={"کایا"}/>
                    <div className="">
                        <div className="flex  flex-row  min-h-[70vh] justify-between ">
                            <div className="  w-full px-5 flex flex-col justify-between">
                                {/*show message*/}
                                <div className=" h-[50vh] overflow-y-scroll flex flex-col  mt-5">
                                    {/*receive message from server*/}
                                    {messages.map((message,id) => (
                                        <ul key={id} className=" flex justify-end items-center mb-4">
                                            <span>user:{userId}</span>
                                            <li className="mr-2 py-3 px-4 bg-[#3D5A6C] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">

                                                {message.content}
                                            </li>
                                            <i className="ri-close-circle-line text-red-400 text-lg"></i>
                                            <i className="ri-checkbox-circle-fill text-green-400 text-lg"></i>
                                        </ul>
                                    ))}

                                    <div className="flex justify-start items-center mb-4">
                                        <img
                                            src="/images/profile.png"
                                            className="object-cover h-8 w-8 rounded-full"
                                            alt=""
                                        />
                                        <div className="ml-2 py-3 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                            {userId && "happy holiday guys!"}
                                        </div>
                                    </div>
                                </div>
                                {/*send Message*/}
                                  <ChatForm onSendMessage={handleSendMessage}/>
                            </div>
                        </div>
                    </div>
                </ChatLayout> : <div>User not Found</div>
            }

        </div>

    );
};
MainContent.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default MainContent;