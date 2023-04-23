import React from 'react';

import {IOrderProps} from "@/app/shared/form/filter-form/filter-type";
import FormFilter from "@/app/shared/form/filter-form";
const AsideFilter: React.FC<IOrderProps> = ({onFilter}) => {
    return (
        <>
            <aside
                className={"direction-ltr  hidden xl:block border border-gray-200 rounded-md py-2 2xl:w-[15rem]  min-h-[30rem]"}>
                <div className={" px-2"}>
                    <div className={"py-2 px-2"}>
                        <span className={"text-[1rem] font-bold  block"}>My recent searches </span>
                    </div>
                    <hr className={"mt-2 xl:mb-2 "}/>
                </div>
                <div>
                    <FormFilter onSubmit={onFilter}/>
                </div>
            </aside>
        </>
    );
};

export default AsideFilter;