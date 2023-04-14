import axios from "axios";
import {toast} from "react-toastify";
const callApi = () => {
    const axiosInstance = axios.create({
        baseURL : 'https://apitest.kayadev.ir/api/v2'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        },
        err => { throw err }
    )

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },
        err => {
            const res = err?.response
            if(res) {
                console.log("error 404")
            }
            throw err;
        }
    )

    return axiosInstance;
}


export default callApi;