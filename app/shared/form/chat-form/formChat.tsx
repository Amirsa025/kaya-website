import React from 'react';
import {useFormik} from "formik";
import {massageSchema} from "@/app/shared/form/chat-form/validation";
interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatForm:React.FC<ChatInputProps> = ({onSendMessage }) => {

    const sendMassage = useFormik({
        initialValues: {
            message:'',
        },
        validationSchema: massageSchema,
        onSubmit: (formPayload:any,{resetForm}) => {
            onSendMessage(formPayload)
               resetForm()
        }
    });
    return (
        <>
            <form className="flex  my-4 w-full  bg-gray-100  rounded-xl" onSubmit={sendMassage.handleSubmit}>
                <input
                    className="flex-1 bg-gray-100 focus:outline-blue-gray-400 py-3 px-4"
                    type="text"
                    name={"message"}
                    value={sendMassage.values.message}
                    onChange={sendMassage.handleChange}
                    placeholder="type your message here..."
                />
                <button type={"submit"} className={"sendMassageButton bg-[#3D5A6C] my-2 text-white px-4 mx-2  rounded-xl "}>
                    <span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                    </svg>
                    <span></span>

                </button>
            </form>
        </>
    );
};

export default ChatForm;