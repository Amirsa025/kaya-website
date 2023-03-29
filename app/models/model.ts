import * as yup from "yup";

const ComplateRegisterSchema: any = yup.object().shape({
    firstName: yup.string().required('نام خود را وارد کنید'),
    lastName: yup.string().required('نام خانوادگی خود را وارد کنید'),
    NationalCode: yup.string().required('کد ملی را وارد کنید').min(10,'طول کد ملی باید 10 رقم باشد').max(10,'طول کد ملی باید 10 رقم باشد'),
    accountNumber: yup.string().required('شماره حساب را وارد کنید').min(10,'طول شماره حساب باید 10 رقم باشد').max(10,'طول شماره حساب باید 10 رقم باشد'),
    creditCart: yup.string().required('شماره کارت را وارد کنید').min(16,'طول شماره حساب باید 16 رقم باشد').max(16,'طول شماره حساب باید 16 رقم باشد'),
    Address: yup.string().required('آدرس خود را وارد کنید.')
});
export {ComplateRegisterSchema}