import React from 'react';

import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chat-layout/ChantLayout";
import Heading from "@/app/shared/Heading";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";

const MainContent: NextPageWithLayout = () => {
    const router = useRouter();
    const userId = router.query.id;
    return (
        <div>
            {
                userId ? <ChatLayout>
                    <Heading titlesite={"گفتگو"} page={"کایا"}/>
                    <div className={"px-4 py-4 bg-[#3e5b6d]  w-1/3 py-2 px-2 rounded-lg"}>
                        <h2 className={""}>Chat {userId}</h2>
                        <p>This is the chat page for chat number {userId}.</p>
                    </div>
                </ChatLayout> : <div>User not Found</div>
            }

        </div>

    );
};
MainContent.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default MainContent;