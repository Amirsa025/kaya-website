import React, {useEffect, useRef, useState} from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import ChatLayout from "@/app/components/chat/Chant-Content";
import Heading from "@/app/shared/HeadingTitle";
import ChatForm from "@/app/shared/form/chat-form/formChat";
import SubChatLayout from "@/app/components/layout/SubChatlayout";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import {useQuery} from "@tanstack/react-query";
import {ClipLoader} from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInView} from "react-intersection-observer";
import {Message} from "@/app/models/model";
const MainContent: NextPageWithLayout = () => {
    //variable
    const router = useRouter();
    const userId = router.query.id;
    const cookie = new Cookies();
    const loader = useRef(null);
    const {ref, inView} = useInView()

    //state
    const [messages, setMessages] = useState< Message[]>([]);
    const [dataMassage, setDataMassage] = useState([]);
    const itemsRef = useRef<HTMLDivElement>();
    const [MessageLoaded, setMessageLoaded] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    //function
    const handleSendMessage =async (formPayload: any) => {
        try {
            const res= await callApi().post(`/threads/threads/${userId}/messages`,{
                text:formPayload.message
            },{
                headers: {
                    'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
                }
            })
            if(res.data){
                setMessages([...messages, res.data]);
            }

        }catch (err){
            console.log(err)
        }
    };
    const isToday = (date:any) => {
        const now = new Date();
        if (date > now) return false;
        return (+new Date() - +date) < 24 * 60 * 60 *1000;
    };
    //query
    const ChatId = typeof router.query?.id === "string" ? router.query.id : "";
    const {data: GetMessage, isError ,isLoading } = useQuery(
        ["getMassage", ChatId,MessageLoaded],
        () => FetchMassageFromServer(ChatId,MessageLoaded),
        {
            enabled: ChatId.length > 0,
            staleTime: Infinity,
        }
    );
    // function
    const fetchMoreData = () => {
        // Set hasMore to false when there is no more data to load
        if (GetMessage?.data?.messages?.length  === 0) {
            setHasMore(false);
            return;
        }
        // 20 more records in .5 secs
        setTimeout(() => {
            setMessageLoaded( MessageLoaded=>MessageLoaded+5)
        }, 1500);
    };
    useEffect( () => {
        if (inView) {
            fetchMoreData();
        }
    }, [inView]);
    // when send message go to last child
    useEffect(() => {
        // Scroll to the last item when items change
        // @ts-ignore
        itemsRef?.current?.lastChild?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    //concat data infinite scroll
    useEffect(() => {
        if (GetMessage && GetMessage?.data?.messages?.length > 0) {
            // @ts-ignore
            setDataMassage((prevData) => [...prevData, GetMessage]);
        }
    }, [GetMessage]);
    const Pages=  dataMassage?.length
    // @ts-ignore
    const massages= dataMassage.flatMap(item=>item?.data.messages)
    if(!router.isReady){
        return <div>loading</div>
    }
    return (
        <div>
            {
                <ChatLayout>
                    <Heading titlesite={"گفتگو"} page={"کایا"}/>
                    <div>
                        <div className="flex  flex-row  min-h-[65vh] justify-evenly ">
                            <div className="  w-full px-5 flex flex-col justify-evenly">
                                {/*show message*/}
                                <div id="scrollableDiv"  className=" h-[50vh] overflow-y-scroll  mt-5">
                                    {
                                        isLoading?<div>loading</div>:
                                            <InfiniteScroll
                                                scrollThreshold={0.75}
                                                scrollableTarget="scrollableDiv"
                                                dataLength={Pages || 0}
                                                next={fetchMoreData}
                                                inverse={true} // Scroll from bottom to top
                                                initialScrollY={500}
                                                style={{ display: 'flex', flexDirection: 'column-reverse' ,overflow:"visible" }}
                                                hasMore={hasMore}
                                                endMessage={<span/>}
                                                loader={<div></div>}
                                            >
                                                {
                                                    massages?.map((massage:any,id:number)=>{
                                                        const resDate = massage?.date
                                                        const dates = [new Date(resDate)]
                                                        const formattedDates = dates.map(date =>`${date?.getHours()}:${date?.getMinutes()}`);
                                                        const GetDate = dates.map(date => ` ${date?.getFullYear()}-${date?.getMonth()+1}-${date?.getDay()}`);
                                                        return (
                                                            <ul key={id} className={`flex ${massage?.is_received?'justify-start ':'justify-end'} items-center mb-4`}>
                                                                {
                                                                    massage?.is_received ? <li  className=" ml-2 py-3 px-4 bg-blue-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                                                            <div>
                                                                                <span className={"text-sm md:text-lg lg:text-lg"}>{massage?.text}</span>
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
                                                                                <span className={"text-sm md:text-lg lg:text-lg"}>{massage?.text}</span>
                                                                                {
                                                                                    isToday(resDate) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                                                                }
                                                                                {massage?.is_attachment ? <div className={"text-red-400"}>attach</div>:null}
                                                                            </div>
                                                                            {
                                                                                isError ?
                                                                                    <i className="ri-close-circle-fill  text-red-200 text-lg"></i>  : <div>
                                                                                        <i className="ri-checkbox-circle-fill text-green-200 text-lg"></i>
                                                                                    </div>
                                                                            }
                                                                        </li>
                                                                }
                                                                {
                                                                    isError ?  <i className="ri-close-circle-line text-red-400 text-lg"></i>:null
                                                                }
                                                                {/*//@ts-ignore*/}
                                                                <div ref={itemsRef}></div>
                                                                <div className={"flex items-center justify-center "}  >
                                                                    <button
                                                                        ref={ref}
                                                                    >
                                                                    </button>
                                                                </div>
                                                            </ul>
                                                        )
                                                    })
                                                }
                                            </InfiniteScroll>
                                    }
                                    {/*post massages*/}
                                    <div>
                                        {
                                            messages.flatMap((chat,ChatId)=>{
                                                const dates = [new Date(chat?.date)]
                                                const formattedDates = dates.map(date => `${date?.getHours()}:${date?.getMinutes()}`);
                                                const GetDate = dates.map(date => ` ${date?.getFullYear()}-${date?.getMonth()+1}-${date?.getDay()}`);
                                                return (
                                                    // @ts-ignore
                                                    <ul ref={itemsRef}  key={ChatId} className={`flex   items-center mb-4 justify-end`}>
                                                        <li className={"flex items-center  gap-5  mr-2 py-3 px-4 bg-[#3D5A6C] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"}>
                                                            <span>  {chat?.text}</span>
                                                            {
                                                                isToday(chat?.date) ?  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{formattedDates}</div>:  <div className={"text-[8px] text-gray-300 pl-3 text-right pt-2"}>{GetDate}</div>
                                                            }
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {/*send Message*/}
                                <ChatForm onSendMessage={handleSendMessage}/>
                            </div>
                        </div>
                    </div>
                </ChatLayout>
            }
        </div>

    );
};
MainContent.getLayout = (page) => <SubChatLayout>{page}</SubChatLayout>
export default MainContent;

export const FetchMassageFromServer = async (chatId: any,page:any) => {
    const cookie = new Cookies()
    try {
        return await callApi()?.get(`/threads/threads/${chatId}/messages?limit=6&offset=${page}`,{
            headers: {
                'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
            }
        })
    } catch (error) {
        // @ts-ignore
        if (error?.code === 'ECONNRESET') {
            console.log('Connection was reset.');
            // You can retry the request here by calling the function again after a short delay.
        } else {
            // @ts-ignore
            console.log('Error occurred:', error);
        }
    }
}