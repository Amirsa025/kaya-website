import React from 'react';

const Figures = () => {
    return (
        <>
           <section className={"container-app"}>
                {/*Desktop and tablet*/}
                <div className={"hidden md:grid grid-cols-3 border-t border-gray-300 "}>
                    <div className={"border-l border-gray-300"}>
                        <div className={"flex flex-col items-center justify-center h-[13.125rem]"}>
                                <div className={"text-[2.5rem] font-extrabold py-2"}>۸میلیون </div>
                                <div className={"text-[1.5rem] font-medium py-2 "}>  آماده استارتاپ</div>
                        </div>
                    </div>
                    <div className={"border-l border-gray-300 h-30"}>
                        <div className={"flex flex-col items-center justify-center h-[13.125rem]"}>
                            <div className={"text-[2.5rem] font-extrabold py-2"}>۸میلیون </div>
                            <div className={"text-[1.5rem] font-medium py-2 "}>  آماده استارتاپ</div>
                        </div>
                    </div>
                    <div>
                        <div className={"flex flex-col items-center justify-center h-[13.125rem]"}>
                            <div className={"text-[2.5rem] font-extrabold py-2"}>۸میلیون </div>
                            <div className={"text-[1.5rem] font-medium py-2 "}>  آماده استارتاپ</div>
                        </div>
                    </div>
                </div>
           {/*    Mobile size*/}
               <div className={"md:hidden border-t border-gray-300"}>
                    <div className={"flex flex-col"}>
                        <div className={"flex flex-col items-center justify-center h-[10.125rem]"}>
                            <div className={"text-[1.5rem] font-extrabold py-2"}>۸میلیون </div>
                            <div className={"text-[1.5rem] font-medium py-2 "}>  آماده استارتاپ</div>
                        </div>
                        <div className={"flex flex-col items-center justify-center h-[10.125rem]"}>
                            <div className={"text-[1.5rem] font-extrabold py-2"}>۸میلیون </div>
                            <div className={"text-[1.5rem] font-medium py-2 "}>  آماده استارتاپ</div>
                        </div>
                        <div className={"flex flex-col items-center justify-center h-[10.125rem]"}>
                            <div className={"text-[1.5rem] font-extrabold py-2"}>۸میلیون </div>
                            <div className={"text-[1.5rem] font-medium py-2 "}>  آماده استارتاپ</div>
                        </div>
                    </div>
               </div>
           </section>

        </>
    );
};

export default Figures;