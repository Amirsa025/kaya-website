import Cookies from 'universal-cookie';
import {useMutation} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
import axios from "axios";
import {useRouter} from "next/router";
 const storeToken = (token:string,tokenName:string)=>{
     const cookies = new Cookies();
     cookies.set(`${tokenName}`,token,{
         path:"/",
         maxAge:12000,
         secure:true,
         sameSite:'lax'
     })

 }
export const storeLoginToken = async (token : string , tokenName:string) => {
    await fetch('/api/token' , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ token })
    })
}
 const useLogin = () => {
    return useMutation((formPayload: void) => {
        return axios.post('https://apitest.kayadev.ir/api/v2/users/sign_in', {
            //@ts-ignore
            phone_number: formPayload?.loginNumber,
            //@ts-ignore
            password: formPayload?.password
        })
    });
};

const useSginUp = () => {
    return useMutation((formPayload: void) => {
        return callApi().post('/users/sign_up', {
            //@ts-ignore
            phone_number: formPayload?.phoneNumber,
            //@ts-ignore
            password: formPayload?.password,
            //@ts-ignore
            referral_code: formPayload?.referralCode,
        })
    });
};

 export {storeToken,useLogin,useSginUp}