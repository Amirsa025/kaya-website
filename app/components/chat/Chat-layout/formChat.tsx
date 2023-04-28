import React from 'react';
import {useFormik} from "formik";
interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

const ChatForm:React.FC<ChatInputProps> = ({onSendMessage }) => {
    const sendMassage = useFormik({
        initialValues: {
            message:'',
        },
        onSubmit: (formPayload:any) => {
            console.log(formPayload)
            onSendMessage(formPayload)
        }
    });
    return (
        <>
            <form className="flex my-4 w-full  bg-gray-100  rounded-xl" onSubmit={sendMassage.handleSubmit}>
                <input
                    className="flex-1 bg-gray-100 focus:outline-blue-gray-400 py-3 px-4"
                    type="text"
                    name={"message"}
                    value={sendMassage.values.message}
                    onChange={sendMassage.handleChange}
                    placeholder="type your message here..."
                />
                <button type={"submit"} className={"bg-[#3D5A6C] my-2 text-white px-4 mx-2  rounded-xl"}>
                    <i className="ri-send-plane-fill block pt-1"></i>
                </button>
            </form>
        </>
    );
};

export default ChatForm;