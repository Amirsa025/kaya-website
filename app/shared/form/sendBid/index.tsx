import React from 'react';
import {useFormik} from "formik";

import {toast} from "react-toastify";
import {SendBidSchema} from "@/app/shared/form/sendBid/validation";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
interface ISendProps{
      id:number,
    description?:string,
    amount?:string,
    period?:string
}

const RequestBid:React.FC<ISendProps> = ({id}) => {
    const cookie = new Cookies()
    const RequestBid = useFormik({
        initialValues: {
            description:'',
            amount: '',
            period: '',
        },
        validationSchema: SendBidSchema,
        onSubmit: (formPayload:any) => {
            try {
                callApi().post(`/projects/projects/${id}/bids`,
                    {
                        //@ts-ignore
                        description: formPayload?.description,
                        //@ts-ignore
                        amount: formPayload?.amount,
                        //@ts-ignore
                        period: formPayload?.period,
                    },{
                        headers :{
                            'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
                        }
                    }).then(result => {
                        // @ts-ignore
                    console.log(result)
                    if(result.data.message==='ok'){
                        toast.success('درخواست شما با موفقیت ارسال شد', {
                            className:"toast-success-container",
                            position: "top-center",
                            closeButton: false,
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }else if(result.data.code==='1001'){
                        toast.success(`${result.data.message}`, {
                            className:"toast-success-container",
                            position: "top-center",
                            closeButton: false,
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }

                })
            }catch (err){
                console.log(err)
            }
        }
    });
    return (
        <>
            <form action="@/app/shared/form/sendBid/index" className={"pt-6  border-t "} onSubmit={RequestBid.handleSubmit}>
                <div className={" space-y-2"}>
                    <div className={"flex flex-col "}>
                        <label htmlFor="" className={"text-[14px] font-bold  py-2" }>Amount</label>
                        <input type="text"
                               id="amount"
                               name={"amount"}
                               placeholder={"send bids"}
                               value={RequestBid.values.amount}
                               onChange={RequestBid.handleChange}
                               className={"focus:shadow-lg  overflow-hidden lg:w-full xl:w-1/2 w-full text-gray-800 px-2 placeholder:text-[13px]  h-[48px] border border-gray-200 rounded-md outline-0"}/>
                        {RequestBid.touched.amount && Boolean(RequestBid.errors.amount)}
                        <p className="direction-ltr text-red-500 py-2 text-[12px]   font-light">{RequestBid.errors.amount}</p>
                    </div>
                    <div className={"flex flex-col "}>
                        <label htmlFor="" className={"text-[14px] font-bold  py-2" }>period</label>
                    <input type="text"
                           value={RequestBid.values.period}
                           onChange={RequestBid.handleChange}
                           placeholder={"period"}
                           name={"period"}
                           className={"focus:shadow-lg  overflow-hidden xl:w-1/2 w-full text-gray-800 px-2 placeholder:text-[13px]  h-[48px] border border-gray-200 rounded-md outline-0"}/>
                        <p className="direction-ltr text-red-500 py-2 text-[12px]  font-light">{RequestBid.errors.period}</p>
                    </div>
                </div>
                <div className={"pt-4 flex flex-col "}>
                    <label htmlFor="" className={"text-[14px] font-bold  py-2" }>description</label>
                        <textarea
                            value={RequestBid.values.description}
                            onChange={RequestBid.handleChange}
                            id="description"
                            name="description"
                            className={"!h-[10rem] py-2 px-2 focus:shadow-lg placeholder:text-[12px] w-full  2xl:w-[43rem] md:w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                            placeholder={"description"}
                        />
                    <p className="direction-ltr text-red-500 py-2 text-[12px]  font-light">{RequestBid.errors.description}</p>
                </div>
                <button className={ "w-full md:w-1/3 lg:w-[10rem] px-4 py-2 text-[15px]  border rounded-md bg-black text-white rounded-md hover:bg-[#143fcd] my-4 text-[12px]"}>Request Project</button>
            </form>
        </>
    );
};

export default RequestBid;