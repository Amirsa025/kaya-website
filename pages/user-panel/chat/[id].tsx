import React from 'react';
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import ChatWithUser from "@/pages/user-panel/chat/index";
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chat-layout/ChantLayout";

const MainContent:NextPageWithLayout = () => {
    const router = useRouter();
    const userId = router.query.id;
    return (
        <div className={"py-24 "}>
            <ChatLayout>
                <h1 className={"text-center"}>User ID: {userId}</h1>
            </ChatLayout>
        </div>

    );
};
    export default MainContent;