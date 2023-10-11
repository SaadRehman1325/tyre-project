import axios from "axios";
import Cookies from "js-cookie";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL + "/api";
axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

axiosClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : Cookies.get("access_token");

    // const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.response.use(
  function (response) {
    //Dispatch any action on success
    return response;
  },

  function (error) {
    if (error.response.status === 401) {
      if (error.response.config.url != "/user/login") {
        window.location.href = "/login";
        window.localStorage.setItem("user", null);
      }
    }
    return Promise.reject(error);
  }
);
