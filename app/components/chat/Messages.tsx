import React from 'react';
interface IMessagesProps {
    page:any,
    isToday:(resDate: any)=>unknown,
}
const MessagesChat:React.FC<IMessagesProps> = ({page,isToday}) => {


    return (
        <div className={"flex flex-col-reverse"}>
            {
                page?.messages?.flatMap((massage:any,id:any)=>{
                    const resDate = massage?.date
                    const dates = [new Date(resDate)]
                    const formattedDates = dates.map(date =>`${date?.getHours()}:${date?.getMinutes()}`);
                    const GetDate = dates.map(date => `${date?.getFullYear()}-${date?.getMonth()+1}-${date?.getDay()}`);
            return (
                <section key={id}>
                    {page.messages.length===id+1 ?
                    <ul className={`flex ${massage?.is_received?'justify-start ':'justify-end'} items-center mb-2`}>
                    {
                        massage?.is_received ? <li  className=" mt-8 ml-2 py-4 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                <div>
                                    <span className={"text-sm md:text-[10px] lg:text-[13px] flex flex-col text-[10px]  lg:text-[13px]"}>
                                        {massage?.text?.split('\n').map((line:string, id:number) => (
                                            <div key={id}  className={"flex-col flex text-sm !text-[10px] !lg:text-[12px]"}>{line}</div>
                                        ))}
                                    </span>
                                    {massage?.is_attachment ? <div className={"text-bold flex items-center gap-4"}>
                                            <span className={"text-sm text-[10px] lg:text-[13px]"}>{massage?.file_name}</span>
                                            <i className="ri-attachment-line rotate-45 text-[1rem] font-semibold"></i>
                                        </div>
                                        :null}
                                    {
                                        isToday(resDate)?<div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:<div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                    }
                                </div>
                            </li>:
                            <li  className="flex items-center  gap-5  mr-2 py-3 px-4 bg-[#10515c] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white ">
                                <div>

                                           <span className={"flex items-center gap-4 text-sm md:text-[10px] lg:text-[13px]"}> {massage?.text?.split('\n').map((line:string, id:number) => (
                                               <div key={id} className={"leading-8 flex-col flex text-sm !text-[10px] !lg:text-[13px]"}>
                                                   {line}
                                               </div>
                                           ))}
                                               <i className="ri-checkbox-circle-line"></i>
                                        </span>

                                    {
                                        isToday(resDate) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:
                                            <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                    }

                                </div>

                            </li>
                    }
                </ul>:

                    <ul className={`flex ${massage?.is_received?'justify-start ':'justify-end'} items-center mb-3`}>
                    {
                        massage?.is_received  ?
                            <li  className=" ml-2 py-3 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                <div>
                                        <span className={"text-sm md:text-[10px] lg:text-[13px] flex flex-col"}>    {massage?.text?.split('\n').map((line:string, id:number) => (
                                            <div key={id} className={"flex-col flex text-sm !text-[10px] !lg:text-[13px] "}>{line}</div>
                                        ))}</span>

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
                            //Receive  send massage
                            <>
                                <li  className="flex items-center  gap-5  mr-2 py-3 px-4 bg-[#10515c] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                                    <div>

                                           <span className={"flex items-center gap-4 text-sm md:text-[10px] lg:text-[13px]"}> {massage?.text?.split('\n').map((line:string, id:number) => (
                                               <div key={id} className={"leading-8 flex-col flex text-sm !text-[10px] !lg:text-[13px]"}>
                                                   {line}
                                               </div>
                                           ))}
                                               <i className="ri-checkbox-circle-line"></i>
                                        </span>

                                        {
                                            isToday(resDate) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:
                                                <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                        }

                                    </div>

                                </li>
                            </>
                    }
                </ul>


                    }
                </section>)
                })
            }
        </div>
    )
};

export default MessagesChat;