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
                <input
                    className="flex-1 bg-gray-100 focus:outline-blue-gray-400 py-3 focus:bg-[#10515c] focus:text-white px-2 "
                    type="text"
                    name={"message"}
                    value={sendMassage.values.message}
                    onChange={sendMassage.handleChange}
                    placeholder="type your message here..."
                />
                <button type={"submit"}
                        className={"sendMassageButton bg-[#3D5A6C] my-2 text-white px-4 mx-2  rounded-xl "}>
                    <span></span>
                    <svg enableBackground="new 0 0 24 24" height="20" viewBox="0 0 24 24"
                         className={"text-white"}
                         width="20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m8.75 17.612v4.638c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l2.713-3.692z"/>
                        <path
                            d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l6.255 2.138 13.321-11.39-10.308 12.419 10.483 3.583c.078.026.16.04.242.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z"/>
                    </svg>
                    <span></span>

                </button>
            </form>
        </>
    );
};

export default ChatForm;