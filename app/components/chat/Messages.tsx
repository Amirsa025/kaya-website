import React from 'react';
interface IMessagesProps {
    page:any,
    isToday:any
}
const MessagesChat:React.FC<IMessagesProps> = ({page,isToday}) => {

    return (
        <div className={"flex flex-col-reverse"}>
            {
                page?.messages?.flatMap((massage:any,id:any)=>{
                    const resDate = massage?.date
                    const dates = [new Date(resDate)]
                    const formattedDates = dates.map(date =>`${date?.getHours()}:${date?.getMinutes()}`);
                    const GetDate = dates.map(date => ` ${date?.getFullYear()}-${date?.getMonth()+1}-${date?.getDay()}`);
                if(page.messages.length===id+1){
                    return(<ul key={id} className={`flex  ${massage?.is_received?'justify-start ':'justify-end'} items-center mb-2`}>
                        {
                            // @ts-ignore
                            massage?.is_received ? <li  className=" ml-2 py-3 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                    <div>
                                        {/* @ts-ignore*/}
                                        <article className={"text-sm md:text-[10px] lg:text-[13px]"}>{massage?.text}</article>
                                        {massage?.is_attachment ? <div className={"text-bold flex items-center gap-4"}>
                                                <span className={"text-sm md:text-[10px] lg:text-[13px]"}>{massage?.file_name}</span>
                                                <i className="ri-attachment-line rotate-45 text-[1rem] font-semibold"></i>
                                            </div>
                                            :null}
                                        {
                                            isToday(resDate)?<div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:<div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                        }
                                    </div>
                                </li>:
                                <li  className="flex items-center  gap-5  mr-2 py-3 px-4 bg-[#3D5A6C] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                    <div>
                                        <span className={"text-sm md:text-[10px] lg:text-[13px]"}>{massage?.text}</span>
                                        {
                                            isToday(resDate) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                        }
                                        {massage?.is_attachment ? <div className={"text-red-400"}>attach</div>:null}
                                    </div>

                                </li>
                        }

                        {/*//@ts-ignore*/}
                    </ul>)
                }
                    return(<ul key={id} className={`flex ${massage?.is_received?'justify-start ':'justify-end'} items-center mb-3`}>
                        {
                            massage?.is_received ? <li  className=" ml-2 py-3 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                    <div>
                                        <span className={"text-sm md:text-[10px] lg:text-[13px]"}>{massage?.text}</span>
                                        {massage?.is_attachment ? <div className={"text-bold flex items-center gap-4"}>
                                                <span className={"text-sm "}>{massage?.file_name}</span>
                                                <i className="ri-attachment-line rotate-45 text-[1rem] font-semibold"></i>
                                            </div>
                                            :null}
                                        {
                                            isToday(resDate)?<div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:<div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                        }
                                    </div>
                                </li>:
                                <li  className="flex items-center  gap-5  mr-2 py-3 px-4 bg-[#3D5A6C] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                    <div>
                                        <span className={"text-sm md:text-[10px] lg:text-[13px]"}>{massage?.text}</span>
                                        {
                                            isToday(resDate) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                        }
                                        {massage?.is_attachment ? <div className={"text-red-400"}>attach</div>:null}
                                    </div>

                                </li>
                        }

                        {/*//@ts-ignore*/}
                    </ul>)
                })
            }
        </div>
    )
};

export default MessagesChat;