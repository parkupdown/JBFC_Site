import axios from "axios";
import { getToken, removeToken } from "../store/authStore";
import { removeNickName } from "../store/nickNameStore";

const BASE_URL = "http://localhost:3060";
const DEFAULT_TIMEOUT = 30000;

const customAxios = (config) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken() ? getToken() : "",
      //여기서 http 요청할 때 마다 JWT를 담아 보낼것임
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        alert("세션이 만료되었습니다.");
        removeToken();
        removeNickName();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export const httpClient = customAxios();
