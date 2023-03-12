import axios from "axios";
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
                if(res.status === 400) {
                   alert("این کاربر وجود دارد.")
                }
            }
            throw err;
        }
    )

    return axiosInstance;
}


export default callApi;