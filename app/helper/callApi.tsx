import axios from "axios";
import {toast} from "react-toastify";
import Router from "next/router";
const callApi = () => {
    const axiosInstance = axios.create({
        baseURL : 'https://apitest.kayadev.ir/api/v2'
    })

    axiosInstance.interceptors.request.use(
        (config) => {
            return config;
        }
    )

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },

    )

    return axiosInstance;
}


export default callApi;