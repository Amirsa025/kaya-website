import React from 'react';
import FormFilter from "@/app/shared/form/filter-form";

const FilterOrder:React.FC = () => {
    return (
        <>
            <div className={"direction-ltr  hidden xl:block border border-gray-200 rounded-md py-2 2xl:w-[15rem]  min-h-[30rem]"}>
                <div className={" px-2"}>
                        <div className={"py-2 px-2"}>
                            <span className={"text-[1rem] font-bold  block"}>My recent searches </span>
                        </div>
                        <hr className={"mt-2 xl:mb-2 "}/>
                     <FormFilter/>

                </div>
            </div>
        </>
    );
};

export default FilterOrder;