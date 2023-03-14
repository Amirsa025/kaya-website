import * as yup from "yup";

 const codeVerifySchema: any = yup.object().shape({
    codeVerify: yup.string().required('لطفا کد تایید را وارد کنید.')
});

 export {codeVerifySchema}