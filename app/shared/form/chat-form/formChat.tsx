import React from 'react';
import {useFormik} from "formik";
import {massageSchema} from "@/app/shared/form/chat-form/validation";
import {toast} from "react-toastify";
import { useGetmesaage } from '@/app/hooks/SendmessagesToServer';
interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatForm: React.FC<ChatInputProps> = ({onSendMessage}) => {
    const {mutate} = useGetmesaage();
    const sendMassage = useFormik({
        initialValues: {
            message: '',
        },
        validationSchema: massageSchema,
        onSubmit: (values: any, {resetForm}) => {
            mutate(values,
                {
                onSuccess: (response) => {
                    onSendMessage(response?.data)
                    resetForm()
                },
                onError: async (response:any) => {
                    toast.error(`${response.message?'خطا در برقراری ارتباط  ':null} `, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
            );
        } 
    });
    return (
        <>
            <form className="flex relative z-10  my-4 w-full  bg-gray-100  rounded-xl lg:mt-[1rem]" onSubmit={sendMassage.handleSubmit}>
                <textarea autoComplete="false" className="flex-1 bg-gray-100  focus:outline-blue-gray-400 pt-6 text-[12px] focus:bg-[#10515c] focus:text-white px-2 "
                          name={"message"}
                          value={sendMassage.values.message}
                          onChange={sendMassage.handleChange}
                          placeholder="type your message here..."
                />
                <button type={"submit"} className={"border border-green-100 sendMassageButton bg-[#10515c] my-2 text-white px-4 mx-2  rounded-xl "}>
                    <span></span>
                    <i className="ri-send-plane-line"></i>
                    <span></span>
                </button>
            </form>
        </>
    );
};

export default ChatForm;