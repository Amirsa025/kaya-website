import React, {useState} from 'react';
import Cookies from "universal-cookie";
import callApi from "@/app/helper/callApi";
import {toast} from "react-toastify";
import Heading from "@/app/shared/Heading";
import Router from "next/router";

const CompleteProfile:React.FC = () => {
    const [previewImage, setPreviewImage] = useState(null)
    const [enteredName, setEnteredName] = useState("");

    const [previewImagePerson, setPreviewImagePerson] = useState(null)
    const cookie = new Cookies(), ACCESS_TOKEN = cookie.get('sginUP') || cookie.get('token')
    const handleFileInputChange = (event:any) => {
        const formData = new FormData()
        const file = event.currentTarget.files[0]
        formData.append('photo',file)
        //@ts-ignore
        setPreviewImage(URL.createObjectURL(file))
        console.log(previewImage)
    }
    const handleFileInputChangePerson = (event:any) => {
        const formData = new FormData()
        const file =event.currentTarget.files?.[0] || null
        formData.append("personPhoto", file);
        //@ts-ignore
        setPreviewImagePerson(URL.createObjectURL(file))
    }
    const submitFormHandler = async (e:any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const inputObject = Object.fromEntries(formData);
        try {
            const result = await callApi().post('/users/verify',inputObject,{ headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }})
            if(result.status===200){
                toast.success('اطلاعات اولیه شما با موفقیت ثبت شد',{
                    position: "top-center",
                    className:"toast-success-container",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",}
                )
                setTimeout(async ()=>{
                    await Router.replace('/user-panel')}
                ,1000)
            }
            return result.data
        }catch (error){
            toast.error('اطلاعات وارد شده یا شبکه مشکل دارد',{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",})
        }
    };
    return (
        <>
            <section className={" md:container-app "} data-aos="zoom-in-up"
                     data-aos-anchor="#example-anchor"
                     data-aos-offset="500"
                     data-aos-duration="500">
                <Heading page={"تکمیل پروفایل"} titlesite={" کایا"}/>
                <form onSubmit={submitFormHandler}
                      className={" rounded-md border"}>
                    <div className={"px-4 py-8"}>
                        <div
                            className={"flex flex-col flex-wrap lg:flex-row  w-full items-center justify-between"}>
                            <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                <div className={"pt-4 text-center md:text-right"}>
                                    <span className={"py-2 text-[16px] md:text-[14px] font-bold"} >اطلاعات حساب کاربری</span>
                                </div>
                                <div className={"flex-1"}>
                                    <div className={"grid grid-cols-1 lg:grid-cols-2 w-full"}>
                                        <div className={"lg:px-8 flex flex-col w-full  pt-4  space-y-3 "}>
                                            <label className={"pr-2 text-[12px] font-bold"} htmlFor="first_name"> نام </label>
                                            <input
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                className={" focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                placeholder={"نام خود را وارد کنید"}
                                            />
                                            {/*{showError.first_Name ? <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{showError.first_Name}</p> :null }*/}
                                        </div>
                                        <div className={"lg:px-8 flex flex-col w-full  py-4  space-y-3 "}>
                                            <label htmlFor="last_name" className={"pr-2 text-[12px] font-bold "}> نام
                                                خانوادگی </label>
                                            <input type="text"
                                                   required
                                                   id="last_name"
                                                   name="last_name"
                                                   className={" focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={"نام خود را وارد کنید"}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.last_name}</p>*/}
                                        </div>
                                        <div className={"lg:px-8 flex flex-col w-full  pb-4  space-y-3 "}>
                                            <label htmlFor="national_id" className={"pr-2 text-[12px] font-bold"}> کد ملی </label>
                                            <input type="number"
                                                   required
                                                   id="national_id"
                                                   name="national_id"
                                                   className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={"کد ملی  خود را وارد کنید"}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.national_id}</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                <div className={"pt-4 text-center md:text-right"}>
                                    <span className={"py-2 text-[16px] md:text-[14px] font-bold"}>اطلاعات پرداخت </span>
                                </div>
                                <div className={"flex-1 md:border-t py-4 py-4"}>
                                    <div className={" grid grid-cols-1 lg:grid-cols-2 w-full"}>
                                        <div className={"md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <label htmlFor="accountNumber" className={"pr-2 text-[12px] font-bold"}>شماره شبا </label>
                                            <input type="text"
                                                   required
                                                   id="sheba_number"
                                                   name="sheba_number"
                                                   className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={"شماره حساب را وارد کنید"}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.sheba_number}</p>*/}
                                        </div>
                                        <div className={"md:pr-[4rem] lg:pr-[47px] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <label htmlFor="card_number" className={"pr-2 text-[12px] font-bold "}>شماره کارت </label>
                                            <input type="text"
                                                   required
                                                   id="card_number"
                                                   name="card_number"
                                                   className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                   placeholder={"شماره کارت خود را وارد کنید"}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.card_number}</p>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                <div className={"pt-4 text-center md:text-right"}>
                                    <span className={"py-2 text-[16px] md:text-[14px] font-bold"}>احراز هویت بصری </span>
                                </div>
                                <div className={"flex-1 md:md:border-t py-4"}>
                                    <div className={"gap-14 px-4 grid grid-cols-1  xl:grid-cols-2 w-full"}>
                                        <div className={" bg-[#fafafa] rounded-md px-4 my-4 md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <div className={" flex flex-col   2xl:flex-row  items-center gap-12"}>
                                                <div>
                                                    <span className={"text-[13px] font-bold"}>تصویر کارت ملی </span>
                                                </div>
                                                {previewImage ? <img src={previewImage} className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}  alt=""/>: <img src="/images/img-min-p-800.png" className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}  alt=""/>}

                                                <div>
                                                    <div className={"upload"}>
                                                        <label htmlFor="inputTag" className={"flex py-2 items-center  gap-2"}>
                                                            انتخاب عکس <br/>
                                                            <i className="ri-camera-fill"></i>
                                                            <input id="inputTag" type="file"
                                                                   name='national_card_photo'
                                                                   accept='image/*'
                                                                   onChange={handleFileInputChange}/>
                                                            <br/>
                                                            <span id="imageName"></span>
                                                        </label>
                                                    </div>
                                                    {/*{Myformik.errors.national_card_photo && Myformik.touched.national_card_photo && (*/}
                                                    {/*    <div className={"text-red-400 !text-[12px] py-3"}>{Myformik.errors.national_card_photo}</div>*/}
                                                    {/*)}*/}
                                                </div>
                                            </div>

                                        </div>
                                        <div className={" bg-[#fafafa] rounded-md px-4 my-4 md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <div className={" flex flex-col 2xl:flex-row  items-center gap-12"}>
                                                <div>
                                                    <span className={"text-[13px] font-bold"}>تصویر با کارت ملی</span>
                                                </div>
                                                {previewImagePerson ? <img src={previewImagePerson} className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}  alt=""/>: <img src="/images/img-min-p-800.png" className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}  alt=""/>}
                                                <div>
                                                    <div className={"upload"}>
                                                        <label htmlFor="personPhoto" className={"flex py-2 items-center  gap-2"}>
                                                            انتخاب عکس <br/>
                                                            <i className="ri-camera-fill"></i>
                                                            <input

                                                                id="personPhoto"
                                                                name={"verify_photo"}
                                                                type="file"
                                                                onChange={handleFileInputChangePerson} />
                                                            <br/>
                                                            <span id="imageName"></span>

                                                        </label>

                                                    </div>
                                                    {/*{Myformik.errors.verify_photo && Myformik.touched.verify_photo && (*/}
                                                    {/*    <p className={"text-red-400 !text-[12px] px-2 py-3"}>{Myformik.errors.verify_photo}</p>*/}
                                                    {/*)}*/}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                <div className={"pt-4 text-center md:text-right"}>
                                    <span className={"py-2 text-[16px] md:text-[14px] font-bold"}>آدرس و نشانی </span>
                                </div>
                                <div className={"flex-1 md:border-t py-4 py-4"}>
                                    <div className={" grid grid-cols-1 xl:grid-cols-2 w-full"}>
                                        <div className={"md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <label htmlFor="accountNumber" className={"pr-2 text-[12px] font-bold"}>آدرس و نشانی </label>
                                            <textarea
                                                id="Address"
                                                name="address"
                                                className={"!h-[10rem] py-2 px-2 focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                placeholder={"آدرس خود را وارد کنید"}
                                            />
                                            {/*<p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.address}</p>*/}
                                        </div>
                                        <div className={"flex items-center justify-center md:pr-[4rem] lg:pr-[47px] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <button className={"w-full md:w-1/2  px-6 rounded-md py-4 text-white font-medium text-[12px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] "}>ثبت اطلاعات</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default CompleteProfile;