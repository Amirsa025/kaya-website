import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";


const ChatWithUser:NextPageWithLayout = () => {
    return (
        <div>
            chat
        </div>
    );
};
ChatWithUser.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default ChatWithUser;