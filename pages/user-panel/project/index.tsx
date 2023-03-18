import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/User-panel-admin";
import ProjectList from "@/app/components/project/project-list";
import UserPanelPage from "@/pages/user-panel";
const Project: NextPageWithLayout = () => {
    return (
        <div className={""}>
            <div className={""}>
                <div className={"flex  md:flex-1 border rounded-md "}>
                    <div className={"w-full flex flex-col  py-6  "}>
                        {/*paginagin*/}
                        <ProjectList/>
                        <ProjectList/>
                        <ProjectList/>
                    </div>
                </div>
            </div>
        </div>
    );
};
Project.getLayout = (page)=> <UserPanelAdmin>{page}</UserPanelAdmin>
export default Project;