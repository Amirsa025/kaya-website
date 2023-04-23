import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useState} from "react";
import Cookies from "universal-cookie";
import callApi from "@/app/helper/callApi";
import {toast} from "react-toastify";
import Router from "next/router";
import {styleStepper} from "@/styles/styleStepper";
import { StepContent} from "@mui/material";
import CustomisedConnector from "@/app/utils/stepper/CustomisedConnector";
import {steps} from "@/app/constant/MockData";
import {validationSchema} from "@/app/models/validation";
import { Checkbox } from "@material-tailwind/react";

const MultiFormStepper = () => {
    const cookie = new Cookies()
    //statex
    const [activeStep, setActiveStep] = React.useState(0);
    const [formValues, setFormValues] = useState({
        first_name: '',
        last_name: '',
        national_id: '',
        sheba_number: '',
        card_number: '',
        address: '',
        national_card_photo: null,
        verify_photo: null,
        isChecked: false
    });
    const [previewImage, setPreviewImage] = useState(null)
    const [previewImagePerson, setPreviewImagePerson] = useState(null)
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({
        first_name: undefined,
        last_name: undefined,
        national_id: undefined,
        sheba_number: undefined,
        card_number: undefined,
        address: undefined
    });
    //function
    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    }
    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setFormValues({...formValues, [name]: value});
    };
    const handleFileInputChange = (event: any) => {
        const file = event.target.files[0]
        setFormValues({...formValues, national_card_photo: file});
        //@ts-ignore
        setPreviewImage(URL.createObjectURL(file))
    }
    const handleFileInputChangePerson = (event: any) => {
        const file = event.target.files?.[0] || null
        setFormValues({...formValues, verify_photo: file});
        // @ts-ignore
        setPreviewImagePerson(URL.createObjectURL(file))
    }
    const submitFormHandler = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', formValues.first_name);
        formData.append('last_name', formValues.last_name);
        formData.append('national_id', formValues.national_id);
        formData.append('sheba_number', formValues.sheba_number);
        formData.append('card_number', formValues.card_number);
        formData.append('address', formValues.address);
        if (formValues.verify_photo !== null) {
            formData.append('verify_photo', formValues.verify_photo);
        }
        if (formValues.national_card_photo !== null) {
            formData.append('national_card_photo', formValues.national_card_photo);
        }
        const inputObject = Object.fromEntries(formData);
        validationSchema.validate(formData, {abortEarly: false})
            .then(() => {
                console.log(inputObject)
            })
            .catch((validationErrors) => {
                const newErrors = {};
                validationErrors.inner.forEach((error: any) => {
                    // @ts-ignore
                    newErrors[error.path] = error.message;
                });

                // @ts-ignore
                setErrors(newErrors);
            });
        try {
            const result = await callApi().post('/users/verify', inputObject, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${cookie.get('sginUP') || cookie.get('token')}`
                }
            })
            if (result.status === 200) {
                toast.success('اطلاعات اولیه شما با موفقیت ثبت شد', {
                        position: "top-center",
                        className: "toast-success-container",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    }
                )
                setTimeout(async () => {
                        await Router.replace('/user-panel')
                    }
                    , 1000)
            }

            return result.data
        } catch (error) {
            toast.error('مراحل قبل را چک کنید و دوباره اقدام کنید', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div>
            {/*desktop Mode*/}
            <div className={"px-4 md:container-app hidden md:block"}>
                <Stepper activeStep={activeStep} sx={styleStepper}  connector={<CustomisedConnector />}>
                    {steps.map((label, index) => {
                        return (
                            <Step key={index} className={"flex flex-col  font-[IRANSans] pt-[25px]"}
                                  sx={{text: "text-blue-400"}}>
                                <StepLabel className={"flex md:flex-col text-center gap-y-4  items-center"}>
                                    <span className={"!font-semibold  text-[10px] sm:!text-[10px] font-[IRANSans]"}>{label}</span>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <div className={"py-4"}>
                        <div>برای شروع مراحل روی گزینه</div>
                        <button
                            className={"my-12 w-[80px]  px-6 rounded-md py-4 text-white font-medium text-[12px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] "}>دوباره
                        </button>
                    </div>
                ) : (
                    <>
                        <form id={"desktop"} onSubmit={submitFormHandler}>
                            {activeStep === 0 && (
                                <div className={"py-16"}>
                                    <p className={"leading-10 text-[12px] py-8 text-justify"}>
                                        استفاده از فروشگاه اینترنتی هما به معنی توافق کامل شما با شرایط
                                        و ضوابط ذیل تلقی می گردد:
                                        1- خرید کالا از فروشگاه اینترنتی هما بر مبنای قوانین و آئین نامه
                                        های موجود در تجارت الکترونیک و با رعایت کامل تمام قوانین جمهوری
                                        اسلامی ایران صورت می پذیرد.
                                        2- محصولات این سایت براى استفاده شخصی و غیر تجارى مشتریان عرضه
                                        شده است و مالکیت معنوی اطلاعات موجود در آن متعلق به این فروشگاه
                                        بوده و هر گونه سوء استفاده از این اطلاعات پیگرد قانونی دارد.
                                        استفاده غیرتجاری از محتویات سایت با ذکر منبع بلامانع است و اگر
                                        مایلید از اطلاعات موجود در سایت جهت مقاصد تجاری استفاده نمایید
                                        باید از طریق پست الکترونیکی info@homais.comدرخواست خود را ارسال
                                        نموده و اجازه نامه کتبی اخذ نمایید.
                                        3- کاربران هنگام سفارش کالا ملزم می باشند اطلاعات صحیح کامل را
                                        در پایگاه درج کنند. بدیهی است کاستی یا نادرستی اطلاعات، مانع
                                        تکمیل مراحل سفارش خواهد شد.
                                        4- فروشگاه اینترنتی هما هیچ گونه مسئولیتی را در مورد کارکرد ناقص
                                        سایت که می تواند ناشی از عوامل خارج از حوزه مدیریت این سایت باشد
                                        (همانند نقص اینترنت، مسائل مخابراتی، تجهیزات سخت افزاری و غیره)
                                        نمی پذیرد.
                                        5- ارتباط فروشگاه اینترنتی هما با کاربران از طریق homais.com
                                        برقرار می گردد و فقط با استفاده از اطلاعاتی که کاربران در سایت
                                        درج کرده اند (همانند نشانی، تلفن و …) صورت می پذیرد.
                                        9- فروشگاه اینترنتی هما به هیچ وجه اطلاعات منحصر بفرد کاربران را
                                        به اشخاص و طرفین غیر، واگذار نخواهد کرد و ضمنا با استفاده از
                                        آخرین فن آوری ها متعهد است حتی المقدور از حریم شخصی کاربران دفاع
                                        کند.
                                        10- هدف از ایجاد بخش نظرات در فروشگاه اینترنتی هما، اشتراک گذاری
                                        تجربه خرید محصولاتی است که به فروش می رسد. بخش نظرات فروشگاه
                                        اینترنتی هما با دیگر سایت ها و شبکه های اجتماعی متفاوت است. در
                                        این بخش، هر کاربر مجاز است در چهارچوب شرایط و قوانین سایت، نظرات
                                        خود را به اشتراک بگذارد که پس از بررسی و تایید کارشناسان، امکان
                                        مشاهده وجود دارد. بدیهی است که اگر قوانین سایت در نظرات کاربری
                                        رعایت نشود، تایید نمی‌شود و در نتیجه در سایت به نمایش درنمی آید.
                                        فروشگاه اینترنتی هما در قبال درستی یا نادرستی نظرات منتشرشده در
                                        این قسمت، هیچگونه مسئولیتی ندارد و نمایش نظرات کاربران در سایت
                                        به هیچ وجه به معنی تایید فنی فروشگاه اینترنتی هما درباره محتویات
                                        نظر نیست.
                                    </p>
                                    <label className={"space-x-2 flex items-center gap-4 pt-5"}>
                                        <Checkbox
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <span
                                            className={"text-[10px] block"}>پذیرش قوانین و مقررات </span>
                                    </label>
                                </div>
                            )}
                            {activeStep === 1 && (
                                <div className={"pt-16"}>
                                    <div className={"w-full flex flex-col md:flex-row md:items-center "}>
                                        <div className={"flex-1"}>
                                            <div className={"grid grid-cols-1  w-full"}>
                                                <div className={" flex flex-col w-full  pt-4  space-y-3 "}>
                                                    <label className={"pr-2 text-[12px] font-bold"} htmlFor="first_name"> نام </label>
                                                    <input
                                                        onBlur={() => {
                                                            validationSchema.validateAt('first_name', formValues)
                                                                .then(() => setErrors({
                                                                    ...errors,
                                                                    // @ts-ignore
                                                                    first_name: ''
                                                                }))
                                                                .catch((error) => setErrors({
                                                                    ...errors,
                                                                    first_name: error.message
                                                                }));
                                                        }}
                                                        required
                                                        value={formValues.first_name}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        className={"focus:shadow-lg placeholder:text-[12px] w-full md:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                        placeholder={"نام خود را وارد کنید"}
                                                    />
                                                    {errors.first_name &&
                                                        <div className={"py-2 text-[12px] text-red-500"}>{errors.first_name}</div>}
                                                </div>
                                                <div className={" flex flex-col w-full  py-4  space-y-3 "}>
                                                    <label htmlFor="last_name" className={"pr-2 text-[12px] font-bold "}> نام خانوادگی </label>
                                                    <input type="text"
                                                           required
                                                           onBlur={() => {validationSchema.validateAt('last_name', formValues).then(() => setErrors({...errors,
                                                               // @ts-ignore
                                                               last_name: ''}))
                                                               .catch((error) => setErrors({
                                                                   ...errors,
                                                                   last_name: error.message
                                                               }));
                                                           }}
                                                           value={formValues.last_name}
                                                           onChange={handleInputChange}
                                                           id="last_name"
                                                           name="last_name"
                                                           className={" focus:shadow-lg placeholder:text-[12px] w-full md:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                           placeholder={"نام خود را وارد کنید"}
                                                    />
                                                    {errors.last_name &&
                                                        <div className={"py-2 text-[12px] text-red-500"}>{errors.last_name}</div>}
                                                </div>
                                                <div className={" flex flex-col w-full  pb-4  space-y-3 "}>
                                                    <label htmlFor="national_id"
                                                           className={"pr-2 text-[12px] font-bold"}> کد
                                                        ملی </label>
                                                    <input type="number"
                                                           required
                                                           onBlur={() => {
                                                               validationSchema.validateAt('national_id', formValues)
                                                                   .then(() => setErrors({
                                                                       ...errors,
                                                                       // @ts-ignore
                                                                       national_id: ''
                                                                   }))
                                                                   .catch((error) => setErrors({
                                                                       ...errors,
                                                                       national_id: error.message
                                                                   }));
                                                           }}
                                                           value={formValues.national_id}
                                                           onChange={handleInputChange}
                                                           id="national_id"
                                                           name="national_id"
                                                           className={"focus:shadow-lg placeholder:text-[12px] w-full md:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                           placeholder={"کد ملی  خود را وارد کنید"}
                                                    />
                                                    {errors.national_id &&
                                                        <div className={"py-2 text-[12px] text-red-500"}>{errors.national_id}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeStep === 2 && (
                                <div className={"w-full pt-16"}>

                                    <div className={"flex-1"}>
                                        <div className={" grid grid-cols-1 lg:grid-cols-1 w-full"}>
                                            <div className={" flex flex-col w-full  py-4  space-y-3  "}>
                                                <label htmlFor="accountNumber" className={"pr-2 text-[12px] font-bold"}>شماره
                                                    شبا </label>
                                                <input type="text"
                                                       required
                                                       onBlur={() => {
                                                           validationSchema.validateAt('sheba_number', formValues)
                                                               .then(() => setErrors({
                                                                   ...errors,
                                                                   // @ts-ignore
                                                                   sheba_number: ''
                                                               }))
                                                               .catch((error) => setErrors({
                                                                   ...errors,
                                                                   sheba_number: error.message
                                                               }));
                                                       }}
                                                       value={formValues.sheba_number}
                                                       onChange={handleInputChange}
                                                       id="sheba_number"
                                                       name="sheba_number"
                                                       className={"focus:shadow-lg placeholder:text-[12px] w-full lg:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                       placeholder={"شماره حساب را وارد کنید"}
                                                />
                                                {errors.sheba_number &&
                                                    <div className={"py-2 text-[12px] text-red-500"}>{errors.sheba_number}</div>}
                                            </div>
                                            <div className={" flex flex-col w-full  py-4  space-y-3  "}>
                                                <label
                                                    htmlFor="card_number"
                                                    className={"pr-2 text-[12px] font-bold "}>شماره کارت </label>
                                                <input
                                                    type="text"
                                                    value={formValues.card_number}
                                                    onBlur={() => {

                                                        validationSchema.validateAt('card_number', formValues)
                                                            .then(() => setErrors({
                                                                ...errors,
                                                                // @ts-ignore
                                                                card_number: ''
                                                            }))
                                                            .catch((error) => setErrors({
                                                                ...errors,
                                                                card_number: error.message
                                                            }));
                                                    }}
                                                    onChange={handleInputChange}
                                                    id="card_number"
                                                    name="card_number"
                                                    className={"focus:shadow-lg placeholder:text-[12px] w-full lg:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                    placeholder={"شماره کارت خود را وارد کنید"}
                                                />
                                                {errors.card_number &&
                                                    <div className={"py-2 text-[12px] text-red-500"}>{errors.card_number}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeStep === 3 && (
                                <div className={"w-full space-y-6  py-24"}>
                                    <div className={"flex flex-col font-semibold "}>احراز هویت بصری</div>
                                    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 "}>
                                        <div className={"w-1/2 bg-[#fafafa] rounded-md px-4 my-4 md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <div className={" flex flex-col   2xl:flex-row  items-center gap-12"}>
                                                <div>
                                                    <span className={"text-[13px] font-bold"}>تصویر کارت ملی </span>
                                                </div>
                                                {previewImage ? <img src={previewImage}
                                                                     className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                                     alt=""/> :
                                                    <img src="/images/img-min-p-800.png"
                                                         className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                         alt=""/>}

                                                <div>
                                                    <div className={"upload"}>
                                                        <label htmlFor="inputTag"
                                                               className={"flex py-2 items-center  gap-2"}>
                                                            انتخاب عکس <br/>
                                                            <i className="ri-camera-fill"></i>
                                                            <input id="inputTag"
                                                                   required
                                                                   type="file"
                                                                   name='national_card_photo'
                                                                   accept='image/*'
                                                                   onChange={handleFileInputChange}/>
                                                            <br/>
                                                            <span id="imageName"></span>
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className={"w-1/2 bg-[#fafafa] rounded-md px-4 my-4 md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                            <div
                                                className={" flex flex-col 2xl:flex-row  items-center gap-12"}>
                                                <div>
                                                    <span className={"text-[13px] font-bold"}>تصویر با کارت ملی</span>
                                                </div>
                                                {previewImagePerson ? <img src={previewImagePerson}
                                                                           className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                                           alt=""/> :
                                                    <img src="/images/img-min-p-800.png"
                                                         className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                         alt=""/>}
                                                <div>
                                                    <div className={"upload"}>
                                                        <label htmlFor="personPhoto"
                                                               className={"flex py-2 items-center  gap-2"}>
                                                            انتخاب عکس <br/>
                                                            <i className="ri-camera-fill"></i>
                                                            <input
                                                                required
                                                                id="personPhoto"
                                                                name={"verify_photo"}
                                                                type="file"
                                                                onChange={handleFileInputChangePerson}/>

                                                            <br/>
                                                            <span id="imageName"></span>
                                                        </label>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeStep === 4 && (
                                <div className={"w-full  py-12"}>
                                    <div className={"flex-1  lg:py-[3rem]"}>
                                        <div className={" grid grid-cols-1 xl:grid-cols-2 w-full"}>
                                            <div className={" flex flex-col w-full  py-4  space-y-3  "}>
                                                <label htmlFor="accountNumber"
                                                       className={" text-[12px] font-bold"}>آدرس و
                                                    نشانی </label>
                                                <textarea
                                                    required
                                                    onBlur={() => {

                                                        validationSchema.validateAt('address', formValues)
                                                            .then(() => setErrors({
                                                                ...errors,
                                                                // @ts-ignore
                                                                address: ''
                                                            }))
                                                            .catch((error) => setErrors({
                                                                ...errors,
                                                                address: error.message
                                                            }));
                                                    }}
                                                    id="Address"
                                                    onChange={handleInputChange}
                                                    value={formValues.address}
                                                    name="address"
                                                    className={"!h-[10rem] py-2 px-2 focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                    placeholder={"آدرس خود را وارد کنید"}
                                                />
                                                {errors.address &&
                                                    <div className={"py-2 text-[12px] text-red-500"}>{errors.address}</div>}
                                            </div>
                                            <div
                                                className={"flex items-center justify-center md:pr-[4rem] lg:pr-[47px] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                                <button
                                                    className={"w-full md:w-1/2  px-6 rounded-md py-4 text-white font-medium text-[12px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] "}>{activeStep === steps.length - 1 ? 'ثبت اطلاعات ' : 'بعد'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                        <div>
                            {
                                isChecked && (
                                    <div className={"flex items-center justify-between py-12"}>
                                        <button
                                            className={"w-full  md:w-[86px] p-[8px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] text-[1rem]"}
                                            disabled={activeStep === 0}
                                            onClick={handleBack}>
                                            بازگشت
                                        </button>
                                        <button
                                            onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
                                            className={" mx-4 w-full  md:w-[86px] p-[8px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] text-[1rem]"}>
                                            {activeStep === steps.length - 1 ? 'دوباره ' : 'بعد'}
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </>
                )}
            </div>
            <div  className={"block md:hidden px-6"}>
                {/*mobile  Mode*/}
                <Stepper activeStep={activeStep}  orientation="vertical" >
                    {steps.map((step, index) => (
                        <Step key={step} sx={styleStepper}>
                            <StepLabel >
                                <div className={"font-[IRANSans]"}>
                                    <span className={"!font-semibold !text-gray-700  sm:!text-[10px] font-[IRANSans]"}> {step}</span>
                                </div>
                            </StepLabel>
                            <StepContent style={{ fontFamily: 'IRANSans' }}>
                                <React.Fragment>
                                    <form id={"Mobile"} onSubmit={submitFormHandler}>
                                        {activeStep === 0 && (
                                            <div className={"py-16"}>
                                                <p className={"leading-10 text-[12px] py-8 text-justify"}>
                                                    استفاده از فروشگاه اینترنتی هما به معنی توافق کامل شما با شرایط
                                                    و ضوابط ذیل تلقی می گردد:
                                                    1- خرید کالا از فروشگاه اینترنتی هما بر مبنای قوانین و آئین نامه
                                                    های موجود در تجارت الکترونیک و با رعایت کامل تمام قوانین جمهوری
                                                    اسلامی ایران صورت می پذیرد.
                                                    2- محصولات این سایت براى استفاده شخصی و غیر تجارى مشتریان عرضه
                                                    شده است و مالکیت معنوی اطلاعات موجود در آن متعلق به این فروشگاه
                                                    بوده و هر گونه سوء استفاده از این اطلاعات پیگرد قانونی دارد.
                                                    استفاده غیرتجاری از محتویات سایت با ذکر منبع بلامانع است و اگر
                                                    مایلید از اطلاعات موجود در سایت جهت مقاصد تجاری استفاده نمایید
                                                    باید از طریق پست الکترونیکی info@homais.comدرخواست خود را ارسال
                                                    نموده و اجازه نامه کتبی اخذ نمایید.
                                                    3- کاربران هنگام سفارش کالا ملزم می باشند اطلاعات صحیح کامل را
                                                    در پایگاه درج کنند. بدیهی است کاستی یا نادرستی اطلاعات، مانع
                                                    تکمیل مراحل سفارش خواهد شد.
                                                    4- فروشگاه اینترنتی هما هیچ گونه مسئولیتی را در مورد کارکرد ناقص
                                                    سایت که می تواند ناشی از عوامل خارج از حوزه مدیریت این سایت باشد
                                                    (همانند نقص اینترنت، مسائل مخابراتی، تجهیزات سخت افزاری و غیره)
                                                    نمی پذیرد.
                                                    5- ارتباط فروشگاه اینترنتی هما با کاربران از طریق homais.com
                                                    برقرار می گردد و فقط با استفاده از اطلاعاتی که کاربران در سایت
                                                    درج کرده اند (همانند نشانی، تلفن و …) صورت می پذیرد.
                                                    9- فروشگاه اینترنتی هما به هیچ وجه اطلاعات منحصر بفرد کاربران را
                                                    به اشخاص و طرفین غیر، واگذار نخواهد کرد و ضمنا با استفاده از
                                                    آخرین فن آوری ها متعهد است حتی المقدور از حریم شخصی کاربران دفاع
                                                    کند.
                                                    10- هدف از ایجاد بخش نظرات در فروشگاه اینترنتی هما، اشتراک گذاری
                                                    تجربه خرید محصولاتی است که به فروش می رسد. بخش نظرات فروشگاه
                                                    اینترنتی هما با دیگر سایت ها و شبکه های اجتماعی متفاوت است. در
                                                    این بخش، هر کاربر مجاز است در چهارچوب شرایط و قوانین سایت، نظرات
                                                    خود را به اشتراک بگذارد که پس از بررسی و تایید کارشناسان، امکان
                                                    مشاهده وجود دارد. بدیهی است که اگر قوانین سایت در نظرات کاربری
                                                    رعایت نشود، تایید نمی‌شود و در نتیجه در سایت به نمایش درنمی آید.
                                                    فروشگاه اینترنتی هما در قبال درستی یا نادرستی نظرات منتشرشده در
                                                    این قسمت، هیچگونه مسئولیتی ندارد و نمایش نظرات کاربران در سایت
                                                    به هیچ وجه به معنی تایید فنی فروشگاه اینترنتی هما درباره محتویات
                                                    نظر نیست.
                                                </p>
                                                <label className={"space-x-2 flex items-center gap-4 pt-5"}>

                                                    <Checkbox
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                    <span
                                                        className={"text-[10px] block"}>پذیرش قوانین و مقررات </span>
                                                </label>
                                            </div>
                                        )}
                                        {activeStep === 1 && (
                                            <div className={"pt-16"}>
                                                <div className={"w-full flex flex-col mt-[30px] md:flex-row md:items-center "}>
                                                    <div className={"flex-1"}>
                                                        <div className={"grid grid-cols-1  w-full"}>
                                                            <div className={" flex flex-col w-full  pt-4  space-y-3 "}>
                                                                <label className={"pr-2 text-[12px] font-bold"} htmlFor="first_name"> نام </label>
                                                                <input
                                                                    onBlur={() => {
                                                                        validationSchema.validateAt('first_name', formValues)
                                                                            .then(() => setErrors({
                                                                                ...errors,
                                                                                // @ts-ignore
                                                                                first_name: ''
                                                                            }))
                                                                            .catch((error) => setErrors({
                                                                                ...errors,
                                                                                first_name: error.message
                                                                            }));
                                                                    }}
                                                                    required
                                                                    value={formValues.first_name}
                                                                    onChange={handleInputChange}
                                                                    type="text"
                                                                    id="first_name"
                                                                    name="first_name"
                                                                    className={"focus:shadow-lg placeholder:text-[12px] w-full md:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                                    placeholder={"نام خود را وارد کنید"}
                                                                />
                                                                {errors.first_name &&
                                                                    <div className={"py-2 text-[12px] text-red-500"}>{errors.first_name}</div>}
                                                            </div>
                                                            <div className={" flex flex-col w-full  py-4  space-y-3 "}>
                                                                <label htmlFor="last_name" className={"pr-2 text-[12px] font-bold "}> نام خانوادگی </label>
                                                                <input type="text"
                                                                       required
                                                                       onBlur={() => {validationSchema.validateAt('last_name', formValues).then(() => setErrors({...errors,
                                                                           // @ts-ignore
                                                                           last_name: ''}))
                                                                           .catch((error) => setErrors({
                                                                               ...errors,
                                                                               last_name: error.message
                                                                           }));
                                                                       }}
                                                                       value={formValues.last_name}
                                                                       onChange={handleInputChange}
                                                                       id="last_name"
                                                                       name="last_name"
                                                                       className={" focus:shadow-lg placeholder:text-[12px] w-full md:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                                       placeholder={"نام خود را وارد کنید"}
                                                                />
                                                                {errors.last_name &&
                                                                    <div className={"py-2 text-[12px] text-red-500"}>{errors.last_name}</div>}
                                                            </div>
                                                            <div className={" flex flex-col w-full  pb-4  space-y-3 "}>
                                                                <label htmlFor="national_id"
                                                                       className={"pr-2 text-[12px] font-bold"}> کد
                                                                    ملی </label>
                                                                <input type="number"
                                                                       required
                                                                       onBlur={() => {
                                                                           validationSchema.validateAt('national_id', formValues)
                                                                               .then(() => setErrors({
                                                                                   ...errors,
                                                                                   // @ts-ignore
                                                                                   national_id: ''
                                                                               }))
                                                                               .catch((error) => setErrors({
                                                                                   ...errors,
                                                                                   national_id: error.message
                                                                               }));
                                                                       }}
                                                                       value={formValues.national_id}
                                                                       onChange={handleInputChange}
                                                                       id="national_id"
                                                                       name="national_id"
                                                                       className={"focus:shadow-lg placeholder:text-[12px] w-full md:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                                       placeholder={"کد ملی  خود را وارد کنید"}
                                                                />
                                                                {errors.national_id &&
                                                                    <div className={"py-2 text-[12px] text-red-500"}>{errors.national_id}</div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {activeStep === 2 && (
                                            <div className={"w-full pt-16"}>

                                                <div className={"flex-1"}>
                                                    <div className={" grid grid-cols-1 lg:grid-cols-1 w-full"}>
                                                        <div className={" flex flex-col w-full  py-4  space-y-3  "}>
                                                            <label htmlFor="accountNumber" className={"pr-2 text-[12px] font-bold"}>شماره
                                                                شبا </label>
                                                            <input type="text"
                                                                   required
                                                                   onBlur={() => {
                                                                       validationSchema.validateAt('sheba_number', formValues)
                                                                           .then(() => setErrors({
                                                                               ...errors,
                                                                               // @ts-ignore
                                                                               sheba_number: ''
                                                                           }))
                                                                           .catch((error) => setErrors({
                                                                               ...errors,
                                                                               sheba_number: error.message
                                                                           }));
                                                                   }}
                                                                   value={formValues.sheba_number}
                                                                   onChange={handleInputChange}
                                                                   id="sheba_number"
                                                                   name="sheba_number"
                                                                   className={"focus:shadow-lg placeholder:text-[12px] w-full lg:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                                   placeholder={"شماره حساب را وارد کنید"}
                                                            />
                                                            {errors.sheba_number &&
                                                                <div className={"py-2 text-[12px] text-red-500"}>{errors.sheba_number}</div>}
                                                        </div>
                                                        <div className={" flex flex-col w-full  py-4  space-y-3  "}>
                                                            <label
                                                                htmlFor="card_number"
                                                                className={"pr-2 text-[12px] font-bold "}>شماره کارت </label>
                                                            <input
                                                                type="text"
                                                                value={formValues.card_number}
                                                                onBlur={() => {

                                                                    validationSchema.validateAt('card_number', formValues)
                                                                        .then(() => setErrors({
                                                                            ...errors,
                                                                            // @ts-ignore
                                                                            card_number: ''
                                                                        }))
                                                                        .catch((error) => setErrors({
                                                                            ...errors,
                                                                            card_number: error.message
                                                                        }));
                                                                }}
                                                                onChange={handleInputChange}
                                                                id="card_number"
                                                                name="card_number"
                                                                className={"focus:shadow-lg placeholder:text-[12px] w-full lg:w-1/2 text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                                placeholder={"شماره کارت خود را وارد کنید"}
                                                            />
                                                            {errors.card_number &&
                                                                <div className={"py-2 text-[12px] text-red-500"}>{errors.card_number}</div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {activeStep === 3 && (
                                            <div className={"w-full space-y-6  py-24"}>
                                                <div className={"flex flex-col font-semibold "}>احراز هویت بصری</div>
                                                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 "}>
                                                    <div className={"w-1/2 bg-[#fafafa] rounded-md px-4 my-4 md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                                        <div className={" flex flex-col   2xl:flex-row  items-center gap-12"}>
                                                            <div>
                                                                <span className={"text-[13px] font-bold"}>تصویر کارت ملی </span>
                                                            </div>
                                                            {previewImage ? <img src={previewImage}
                                                                                 className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                                                 alt=""/> :
                                                                <img src="/images/img-min-p-800.png"
                                                                     className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                                     alt=""/>}

                                                            <div>
                                                                <div className={"upload"}>
                                                                    <label htmlFor="inputTag"
                                                                           className={"flex py-2 items-center  gap-2"}>
                                                                        انتخاب عکس <br/>
                                                                        <i className="ri-camera-fill"></i>
                                                                        <input id="inputTag"
                                                                               required
                                                                               type="file"
                                                                               name='national_card_photo'
                                                                               accept='image/*'
                                                                               onChange={handleFileInputChange}/>
                                                                        <br/>
                                                                        <span id="imageName"></span>
                                                                    </label>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={"w-1/2 bg-[#fafafa] rounded-md px-4 my-4 md:pr-[4rem] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                                        <div
                                                            className={" flex flex-col 2xl:flex-row  items-center gap-12"}>
                                                            <div>
                                                                <span className={"text-[13px] font-bold"}>تصویر با کارت ملی</span>
                                                            </div>
                                                            {previewImagePerson ? <img src={previewImagePerson}
                                                                                       className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                                                       alt=""/> :
                                                                <img src="/images/img-min-p-800.png"
                                                                     className={"px-2 bg-white  block w-[10rem] h-[7rem] rounded-md"}
                                                                     alt=""/>}
                                                            <div>
                                                                <div className={"upload"}>
                                                                    <label htmlFor="personPhoto"
                                                                           className={"flex py-2 items-center  gap-2"}>
                                                                        انتخاب عکس <br/>
                                                                        <i className="ri-camera-fill"></i>
                                                                        <input
                                                                            required
                                                                            id="personPhoto"
                                                                            name={"verify_photo"}
                                                                            type="file"
                                                                            onChange={handleFileInputChangePerson}/>

                                                                        <br/>
                                                                        <span id="imageName"></span>
                                                                    </label>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {activeStep === 4 && (
                                            <div className={"w-full  py-12"}>
                                                <div className={"flex-1  lg:py-[3rem]"}>
                                                    <div className={" grid grid-cols-1 xl:grid-cols-2 w-full"}>
                                                        <div className={" flex flex-col w-full  py-4  space-y-3  "}>
                                                            <label htmlFor="accountNumber"
                                                                   className={" text-[12px] font-bold"}>آدرس و
                                                                نشانی </label>
                                                            <textarea
                                                                required
                                                                onBlur={() => {

                                                                    validationSchema.validateAt('address', formValues)
                                                                        .then(() => setErrors({
                                                                            ...errors,
                                                                            // @ts-ignore
                                                                            address: ''
                                                                        }))
                                                                        .catch((error) => setErrors({
                                                                            ...errors,
                                                                            address: error.message
                                                                        }));
                                                                }}
                                                                id="Address"
                                                                onChange={handleInputChange}
                                                                value={formValues.address}
                                                                name="address"
                                                                className={"!h-[10rem] py-2 px-2 focus:shadow-lg placeholder:text-[12px] w-full text-gray-800 px-2  h-[48px] border border-gray-200 rounded-md outline-0"}
                                                                placeholder={"آدرس خود را وارد کنید"}
                                                            />
                                                            {errors.address &&
                                                                <div className={"py-2 text-[12px] text-red-500"}>{errors.address}</div>}
                                                        </div>
                                                        <div
                                                            className={"flex items-center justify-center md:pr-[4rem] lg:pr-[47px] flex flex-col w-full  py-4  space-y-3 px-4 "}>
                                                            <button
                                                                className={"w-full md:w-1/2  px-6 rounded-md py-4 text-white font-medium text-[12px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] "}>{activeStep === steps.length - 1 ? 'ثبت اطلاعات ' : 'بعد'}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                    <>
                                        {
                                            isChecked && (
                                                <div className={"flex items-center justify-between py-12"}>
                                                    <button
                                                        className={"w-full  md:w-[86px] p-[8px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] text-[1rem]"}
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}>
                                                        بازگشت
                                                    </button>
                                                    <button
                                                        onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
                                                        className={" mx-4 w-full  md:w-[86px] p-[8px] transition-all duration-300 bg-black text-white rounded-md hover:bg-[#143fcd] text-[1rem]"}>
                                                        {activeStep === steps.length - 1 ? 'دوباره ' : 'بعد'}
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </>
                                </React.Fragment>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </div>

    );
}
export default MultiFormStepper;

