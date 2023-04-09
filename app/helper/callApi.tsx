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
                if(res.status === 400  ) {
                    toast.error('خطا ', {
                        position: "top-center",
                        className:"toast-success-container",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",});
                }
            }
            throw err;
        }
    )

    return axiosInstance;
}


export default callApi;