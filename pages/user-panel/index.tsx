import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/User-panel-admin";
const UserPanelPage:NextPageWithLayout = () => {
    return (
        <>
            <div className={"container-app"}>

                <div className={"flex lg:pt-10 pt-32 flex-col lg:flex-row space-y-6 space-x-3.5 pb-8"}>
                    <span>به داشبورد خوش آمدید</span>
                </div>
            </div>
        </>
    );
};
UserPanelPage.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default UserPanelPage;
