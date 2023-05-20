import * as yup from "yup";
  export  interface Message {
    text: string;
    id: number;
    thread_id:number,
    user_id:number,
    is_received:boolean,
    date:number,
    timestamp: Date;
}
const CompleteRegisterSchema: any = yup.object().shape({
    first_name: yup.string().required('نام خود را وارد کنید'),
    last_name: yup.string().required('نام خانوادگی خود را وارد کنید'),
    national_id: yup.string().required('کد ملی را وارد کنید').min(10,'طول کد ملی باید 10 رقم باشد').max(10,'طول کد ملی باید 10 رقم باشد'),
    sheba_number: yup.string().required('شماره حساب را وارد کنید').min(10,'طول شماره حساب باید 10 رقم باشد').max(10,'طول شماره حساب باید 10 رقم باشد'),
    card_number: yup.string().required('شماره کارت را وارد کنید').min(16,'طول شماره حساب باید 16 رقم باشد').max(16,'طول شماره حساب باید 16 رقم باشد'),
    address: yup.string().required('آدرس خود را وارد کنید.'),
    // national_card_photo: yup.string().required('عکس کارت ملی خود را وارد کنید'),
    // verify_photo: yup.string().required('عکس خود را وارد کنید'),
});
export {CompleteRegisterSchema,}