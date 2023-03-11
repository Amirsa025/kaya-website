import axios from "axios";
import {authenticateService} from "./authenticateService"
import {storageKeys} from "../constant/storage-key";
import Cookies from "universal-cookie"
const TIMEOUT_DELAY = 30000;//change time with be m second
const cookies = new Cookies();
// let token : string | null = localStorage.getItem("token") ?? null;
// let token : string | null = localStorage.getItem("token") ?? null;
let token : string | null = cookies.get("token") ?? null;
const baseApiUrl = 'https://apitest.kayadev.ir/api/v2';

export const setToken = (newToken:string) =>  token = newToken ;

export default async function baseService(
  data: any | undefined,
  path: string | undefined,
  method: string | undefined,
  needAuthenticated = true,
  wwwHeaderType = false,
  params? : any | undefined,
  otherOptions? : any | undefined,
  isFormData : boolean = false,
  absolutePath :boolean = false,
  getCancelToken? : any,
  retry : boolean = false
) : Promise<any> {

  let timeout;
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  getCancelToken && getCancelToken(source);
  timeout = setTimeout(() => {
    source.cancel();
  }, TIMEOUT_DELAY);

  const api = absolutePath ? "" : baseApiUrl;

  if (needAuthenticated && !token)
    return Promise.reject({ isTimeout: false, error: 401 });

  let formData : any;
  if (isFormData) {
    formData = new FormData();
    Reflect.ownKeys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });
  }

  const headers = needAuthenticated
    ? {
      "content-type": wwwHeaderType
        ? "application/x-www-form-urlencoded"
        : "application/json",
      Authorization: "Bearer " + token,
    }
    : { "content-type": "application/json" };

  try {
    const response = await axios({
      url: `${api}${path}`,
      method: method === "get" && data ? "POST" : method,
      headers:
        method === "get" && data
          ? { ...headers, "X-HTTP-Method-Override": method.toUpperCase() }
          : headers,
      cancelToken: source.token,
      data: isFormData ? formData : data,
      params,
      ...otherOptions,
    });

    if (response && response.status >= 200 && response.status < 300) {
      if (timeout) clearTimeout(timeout);
      return response.data;
    } else {
      if (timeout) clearTimeout(timeout);
      return Promise.reject({ isTimeout: false, error: 101 });
    }
  } catch (error: any) {
    if (timeout) clearTimeout(timeout);
    if (!axios.isCancel(error)) {
      //error.response && toastAnyWhere.show("خطا در دریافت توکن", "error");
      if (error && error?.response && error.response.status === 401) {
        if (retry) {
          await authenticateService.logout();
        }
        const refreshToken : string | null = cookies.get(storageKeys.refreshToken);
        let refreshTokenResult:any = await authenticateService.getNewToken(refreshToken);
        if (refreshTokenResult && refreshTokenResult.data) {
          cookies.set(
            "token",
            JSON.stringify(refreshTokenResult.data)
          );
          setToken(refreshTokenResult.data.token);
        }

        return baseService(
          data,
          path,
          method,
          needAuthenticated,
          params,
          otherOptions,
          null,
          isFormData,
          absolutePath,
          getCancelToken,
          true
        );
      }
      else if (error.response.status === 500) {
        //message.error(error.response.data.message)
      }
      else if (error.response.status === 404 || error.response.status === 400 || error.response.status === 415) {
        //message.error("An Error has Occurred ")
      }
    }


    return {
      isTimeout: axios.isCancel(error),
      response: error.response && error.response.data,
      status: error.response && error.response.status,
      isSuccess: error.response?.data?.isSuccess,
      message: error.response ? "" :"An Error has Occurred ",
      data:[]
    };


  }
}
