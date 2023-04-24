import React from 'react';
import { NextPageWithLayout } from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import ChatLayout from "@/app/components/chat/Chat-layout/ChantLayout";

const chats = [
    { id: 1, name: "Chat 1" },
    { id: 2, name: "Chat 2" },
    { id: 3, name: "Chat 3" },
];

const ChatWithUser: NextPageWithLayout = ({ children }: any) => {


    // Your implementation of the chat with the user goes here.
    return (
        <ChatLayout/>
    );
};
ChatWithUser.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default ChatWithUser;