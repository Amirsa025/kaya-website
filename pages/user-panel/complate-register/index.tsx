import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import {useFormik} from "formik";
import {ComplateRegisterSchema} from "@/app/models/model";

interface FormValues {
    image: File | null;
}

type FormErrors = {
    image?: string;
}

const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    if (values.image && !['image/jpeg', 'image/png', 'image/gif'].includes(values.image.type)) {
        errors.image = 'Invalid file type';
    }

    return errors;
};
const ComplateRegister: NextPageWithLayout = () => {
    const Myformik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            NationalCode: '',
            accountNumber: '',
            creditCart:'',
            Address:'',
            image: null,
            nImage: null,
        },
        validate,
        validationSchema: ComplateRegisterSchema,
        onSubmit: async (values) => {
            console.log(values)
        }
    });
    return (
        <section className={" md:container-app "} data-aos="zoom-in-up"
                 data-aos-anchor="#example-anchor"
                 data-aos-offset="500"
                 data-aos-duration="500">
            <form onSubmit={Myformik.handleSubmit}
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
                                    <div className={"lg:px-8 flex flex-col w-full  py-4  space-y-3 "}>
                                        <label className={"pr-2 text-[12px] font-bold"} htmlFor="firstName"> نام </label>
                                        <input type="text"
                                               id="firstName"
                                               name="firstName"
                                               onChange={Myformik.handleChange}
                                               value={Myformik.values.firstName}
                                               className={" focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                               placeholder={"نام خود را وارد کنیدد"}
                                        />
                                        <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.firstName}</p>
                                    </div>
                                    <div className={"lg:px-8 flex flex-col w-full  py-4  space-y-3 "}>
                                        <label htmlFor="lastName" className={"pr-2 text-[12px] font-bold "}> نام
                                            خانوادگی </label>
                                        <input type="text"
                                               id="lastName"
                                               name="lastName"
                                               onChange={Myformik.handleChange}
                                               value={Myformik.values.lastName}
                                               className={" focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                               placeholder={"نام خود را وارد کنید"}
                                        />
                                        <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.lastName}</p>
                                    </div>
                                    <div className={"lg:px-8 flex flex-col w-full  py-4  space-y-3 "}>
                                        <label htmlFor="NationalCode" className={"pr-2 text-[12px] font-bold"}> کد ملی </label>
                                        <input type="number"
                                               id="NationalCode"
                                               name="NationalCode"
                                               onChange={Myformik.handleChange}
                                               value={Myformik.values.NationalCode}
                                               className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                               placeholder={"کد ملی  خود را وارد کنید"}
                                        />
                                        <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.NationalCode}</p>
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
                                        <label htmlFor="accountNumber" className={"pr-2 text-[12px] font-bold"}>شماره حساب </label>
                                        <input type="text"
                                               id="accountNumber"
                                               name="accountNumber"
                                               onChange={Myformik.handleChange}
                                               value={Myformik.values.accountNumber}
                                               className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                               placeholder={"شماره حساب را وارد کنید"}
                                        />
                                        <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.accountNumber}</p>
                                    </div>
                                    <div className={"md:pr-[4rem] lg:pr-[47px] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                        <label htmlFor="creditCart" className={"pr-2 text-[12px] font-bold "}>شماره کارت </label>
                                        <input type="text"
                                               id="creditCart"
                                               name="creditCart"
                                               onChange={Myformik.handleChange}
                                               value={Myformik.values.creditCart}
                                               className={"focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                               placeholder={"شماره کارت خود را وارد کنید"}
                                        />
                                        <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.creditCart}</p>
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
                                                <img src="/images/img-min-p-800.png" className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}  alt=""/>
                                                <div>
                                                    <div className={"upload"}>
                                                        <label htmlFor="inputTag" className={"flex py-2 items-center  gap-2"}>
                                                            انتخاب عکس <br/>
                                                            <i className="ri-camera-fill"></i>
                                                            <input id="inputTag" type="file"   onChange={(event) => {Myformik.setFieldValue('nImage', event.currentTarget.files?.[0] || null);
                                                            }}/>
                                                            <br/>
                                                            <span id="imageName"></span>
                                                        </label>
                                                    </div>
                                                    {Myformik.errors.image && Myformik.touched.image && (
                                                        <div>{Myformik.errors.image}</div>
                                                    )}
                                                </div>
                                            </div>

                                    </div>
                                    <div className={" bg-[#fafafa] rounded-md px-4 my-4 md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                        <div className={" flex flex-col 2xl:flex-row  items-center gap-12"}>
                                            <div>
                                                <span className={"text-[13px] font-bold"}>تصویر با کارت ملی</span>
                                            </div>
                                            <img src="/images/img-min-p-800.png" className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}  alt=""/>
                                            <div>
                                                <div className={"upload"}>
                                                    <label htmlFor="inputTag" className={"flex py-2 items-center  gap-2"}>
                                                        انتخاب عکس <br/>
                                                        <i className="ri-camera-fill"></i>
                                                        <input id="inputTag" type="file" onChange={(event) => {Myformik.setFieldValue('image', event.currentTarget.files?.[0] || null);
                                                        }} />
                                                        <br/>
                                                        <span id="imageName"></span>
                                                    </label>
                                                </div>

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
                                               name="Address"
                                               onChange={Myformik.handleChange}
                                               value={Myformik.values.Address}
                                               className={"!h-[10rem] py-2 px-2 focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                               placeholder={"آدرس خود را وارد کنید"}
                                        />
                                        <p className="text-red-500 pt-1 text-[12px] text-right font-light pr-4">{Myformik.errors.Address}</p>
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
    );
};
ComplateRegister.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default ComplateRegister;