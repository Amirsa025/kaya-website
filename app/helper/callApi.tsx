import axios from "axios";
import Cookies from "universal-cookie";
const callApi = () => {
    const axiosInstance = axios.create({
        baseURL : 'https://apitest.kayadev.ir/api/v2'
    })
    axiosInstance.interceptors.request.use( (request) => {
        const cookie = new Cookies()
        const token = cookie.get('signUp') || cookie.get('token')
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
            return request;
        } , error=> {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        res => {
            return res;
        },

    )

    return axiosInstance;
}


export default callApi;