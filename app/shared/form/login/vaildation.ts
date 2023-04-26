import * as yup from "yup";
let phonenumberPatterns = /^0?9[0-9]{9}$/
export const SginINSchema: any = yup.object().shape({
    loginNumber: yup.string().required('لطفاشماره همراه خود را وارد کنید').min(4, 'لطفا در در وارد کردن تلفن همراه  خود دقت کنید').matches(phonenumberPatterns, 'لطفا شماره تلفن خود را به درستی وارد کنید. '),
    password: yup.string().required('لطفا در رمز خود را وارد کنید.').min(8, 'لطفا در در وارد کردن رمز عبور خود دقت کنید')
});