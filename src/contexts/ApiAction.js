import axios from "axios";
import toast from "react-hot-toast";

import { getAccessToken } from "../utils/GlobalUtil";

const baseUrl = "http://172.17.100.159:7777/";

// Auth ##################################################
export const logOut = async (authDispatch) => {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  localStorage.clear();
  await authDispatch({
    type: "LOGOUT",
  });
  // window.location.reload();
  toast.success("Logout Successfully");
};

export const loginReq = (data) => {
  return authReq.post("/account/login/", data);
};

export const meReq = (params) => {
  return baseReq.get("/account/me/", { params });
};

//###################################################
//########## ########## authReq ########## ##########
const authReq = axios.create({
  baseURL: baseUrl,
  headers: {
    accept: "application/json",
  },
});

//########## ########## baseReq ########## ##########

export const baseReq = axios.create({
  baseURL: baseUrl,
  headers: {
    accept: "application/json",
  },
});

// interceptors
baseReq.interceptors.request.use(
  (config) => {
    // const accessToken = localStorage.getItem("access_token");
    const cookie_accessToken = getAccessToken();

    if (cookie_accessToken) {
      config.headers["Authorization"] = `Bearer ${cookie_accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseReq.interceptors.response.use(
  (res) => {
    // console.log(">>>interceptors.response");
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        // console.log("interceptors.response err response 401");

        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.clear();

        // originalConfig._retry = true;
        // try {
        //   // const refresh = getLocalRefreshToken();
        //   // const refresh_res = await refreshToken(refresh);
        //   // const { access } = refresh_res.data;
        //   // setLocalAccessToken(access);
        //   return baseReq(originalConfig);
        // } catch (_error) {
        //   if (_error.response && _error.response.data) {
        //     return Promise.reject(_error.response.data);
        //   }
        //   return Promise.reject(_error);
        // }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);
