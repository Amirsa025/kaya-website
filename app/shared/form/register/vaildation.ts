import * as yup from "yup";

let phonenumberPattern = /^0?9[0-9]{9}$/
const SginupSchema: any = yup.object().shape({
    phoneNumber: yup.string().required('لطفاشماره همراه خود را وارد کنید').min(4, 'لطفا در در وارد کردن تلفن همراه  خود دقت کنید')
        .matches(phonenumberPattern, 'لطفا شماره تلفن خود را به درستی وارد کنید. '),
    password: yup.string().required('لطفا در رمز خود را وارد کنید.').min(8, 'لطفا در در وارد کردن رمز عبور خود دقت کنید'),
    referralCode: yup.string().required('کد معرف شما معتبر نیست.')
});

export {SginupSchema}