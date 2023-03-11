import baseService from "./baseService";
// import dynamic from "next/dynamic";

export const authenticateService = {
    authenticate: async (data:any) => baseService(data, "/sign_up", "POST", false),
    getNewToken: async (refreshToken:string | null) => baseService(refreshToken, "/auth/login" + refreshToken, "POST"),
    logout: () => localStorage.clear(),
}
