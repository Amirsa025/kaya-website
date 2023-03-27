import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";


const ComplateRegister: NextPageWithLayout = () => {
    return (
        <div>
            ComplateRegister
        </div>
    );
};
ComplateRegister.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default ComplateRegister;