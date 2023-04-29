import * as yup from "yup";

const SendBidSchema: any = yup.object().shape({
    description: yup.string().required('لطفا توضیحات خود را وارد کنید.'),
    amount: yup.string().required('لطفا در مقدار بید خود را وارد کنید'),
    period: yup.string().required('لطفا دوره زمانی  خود را وارد کنید')

});
export {SendBidSchema}