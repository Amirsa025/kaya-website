import React from 'react';
import {useFormik} from "formik";
import {massageSchema} from "@/app/shared/form/chat-form/validation";

interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatForm: React.FC<ChatInputProps> = ({onSendMessage}) => {
    const sendMassage = useFormik({
        initialValues: {
            message: '',
        },
        validationSchema: massageSchema,
        onSubmit: (formPayload: any, {resetForm}) => {
            onSendMessage(formPayload)
            resetForm()
        }
    });
    return (
        <>
            <form className="flex relative z-10  my-4 w-full  bg-gray-100  rounded-xl lg:mt-[1rem]"
                  onSubmit={sendMassage.handleSubmit}>
                <input className="flex-1 bg-gray-100 focus:outline-blue-gray-400 py-3 text-[12px] focus:bg-[#10515c] focus:text-white px-2 "
                    type="text"
                    name={"message"}
                    value={sendMassage.values.message}
                    onChange={sendMassage.handleChange}
                    placeholder="type your message here..."
                />
                <button type={"submit"} className={"sendMassageButton bg-[#3D5A6C] my-2 text-white px-4 mx-2  rounded-xl "}>
                    <span></span>
                    <i className="ri-send-plane-line"></i>
                    <span></span>
                </button>
            </form>
        </>
    );
};

export default ChatForm;