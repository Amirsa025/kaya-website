import Cookies from 'universal-cookie';
import {useMutation} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
 const storeToken = (token:string,tokenName:string)=>{
     const cookies = new Cookies();
     cookies.set(`${tokenName}`,token,{
         path:"/",
         maxAge:1200,
         secure:true,
         sameSite:'lax'
     })
 }

 const useLogin = () => {
    return useMutation((formPayload: void) => {
        return callApi().post('/users/sign_in', {
            //@ts-ignore
            phone_number: formPayload?.loginNumber,
            //@ts-ignore
            password: formPayload?.password
        })
    });
};
const useSginUp = () => {
    return useMutation((formPayload: void) => {
        console.log(formPayload)
        return callApi().post('/users/sign_up', {
            //@ts-ignore
            phone_number: formPayload?.phoneNumber,
            //@ts-ignore
            password: formPayload?.password
        })
    });
};
 export {storeToken,useLogin,useSginUp}