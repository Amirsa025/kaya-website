import * as yup from "yup";

export const validationSchema = yup.object().shape({
    first_name: yup.string().required('نام را وارد کنید'),
    last_name: yup.string().required('نام خانوادگی را وارد کنید'),
    national_id: yup.string().required('شماره ملی را وارد کنید'),
    sheba_number: yup.string().required('شماره  شبا را وارد کنید'),
    card_number: yup.string().required('شماره  کارت  را وارد کنید'),
    address: yup.string().required('آدرس  را وارد کنید'),
});