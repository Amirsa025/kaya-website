import * as yup from "yup";

const massageSchema: any = yup.object().shape({
    message: yup.string().required('لطفا پیامتان را بنویسید'),

});
export {massageSchema}