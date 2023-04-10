import React, {useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import CompleteProfile from "@/app/components/form/complate-profile";
import useAuth from "@/app/helper/useAuth";
import ViewProfile from "@/app/components/form/view-profile/VeiwProfile";
const Mission: NextPageWithLayout = () => {
    const {data, isFetching, isLoading, error} = useAuth()
    if(data?.data.verify_status==="unverified" ||data?.data.verify_status==="pending"){
        return (
            <>
                <CompleteProfile/>
            </>
        );
    }else if (data?.data.verify_status==="verified"){

        return (
            <div>
                <ViewProfile data={data}></ViewProfile>
            </div>
            )
    }
    return <></>
};
Mission.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default Mission;