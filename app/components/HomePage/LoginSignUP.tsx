import React from 'react';

const LoginSignUp = () => {
    return (
        <section className={"container-app py-[2.25rem]"}>
            {/*Desktop and tablet */}
            <div className={"w-full flex  border rounded-sm border-gray-300 flex flex-col   "}>
                <div className={"flex flex-col md:flex-row"}>
                    <form className={"p-[1.56rem] flex gap-3 md:flex-1 flex-col md:flex-row"}>
                        <input className={"w-full border p-3 rounded-sm border-gray-300 outline-0 "}
                               placeholder={"ایمیل خود را وارد کنید"} type="text"/>
                        <button
                            className={"w-full  md:w-[86px] p-[8px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] text-[1rem]"}>ورود
                        </button>
                    </form>
                    <div className={"center-item flex-col md:flex-row"}>
                        <span className={"text-8 text-gray-500"}>یا</span>
                        <div className={"px-[1.56rem] py-[1.56rem] w-full md:w-[250px]"}>
                            <a href={"#"}
                               className={"h-[48px] flex items-center justify-center border border-gray-300 hover:text-indigo-600  p-[8px] transition-all duration-300   rounded-md hover:bg-[#eaebff] hover:border-indigo-600 text-[1rem]"}>
                                <div className={"flex justify-center space-x-2 gap-4"}>
                                    <span> ورود با </span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M11.9997 5.86667C13.8775 5.86667 15.1442 6.67778 15.8664 7.35556L18.6886 4.6C16.9553 2.98889 14.6997 2 11.9997 2C8.08863 2 4.71085 4.24444 3.06641 7.51111L6.29974 10.0222C7.11085 7.61111 9.3553 5.86667 11.9997 5.86667V5.86667Z"
                                              fill="#EA4335"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M21.6 12.2222C21.6 11.4 21.5333 10.8 21.3889 10.1777H12V13.8888H17.5111C17.4 14.8111 16.8 16.2 15.4667 17.1333L18.6222 19.5777C20.5111 17.8333 21.6 15.2666 21.6 12.2222V12.2222Z"
                                              fill="#4285F4"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M6.31111 13.9779C6.1 13.3557 5.97778 12.689 5.97778 12.0001C5.97778 11.3112 6.1 10.6446 6.3 10.0223L3.06667 7.51123C2.38889 8.86679 2 10.389 2 12.0001C2 13.6112 2.38889 15.1335 3.06667 16.489L6.31111 13.9779V13.9779Z"
                                              fill="#FBBC05"></path>
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M12.0003 21.9998C14.7003 21.9998 16.967 21.1109 18.6226 19.5775L15.467 17.1331C14.6226 17.722 13.4892 18.1331 12.0003 18.1331C9.3559 18.1331 7.11146 16.3887 6.31146 13.9775L3.07812 16.4887C4.72257 19.7553 8.08924 21.9998 12.0003 21.9998V21.9998Z"
                                              fill="#34A853"></path>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
            <div className={" flex flex-col space-y-2 md:flex-row items-center justify-center md:justify-between pt-[28px] pb-[67px]"}>
                <div className={"text-[14px] text-gray-500 font-normal"}>
                    <p>برای پیدا کردن درآمد دلاری به <a href={"#"} className={"underline"}>کایا</a> سربزنید.</p>
                </div>
                <a href={"#"} className={"text-[14px] text-gray-500 font-light"}>
                    <span>از قبل حساب کاربری دارید؟</span>
                    <span className={"px-1 underline"}>وارد شوید</span>
                </a>
            </div>

        </section>
    );
};

export default LoginSignUp;