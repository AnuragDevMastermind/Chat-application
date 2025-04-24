import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";
import { setLoading, setIdle } from "../store/slice/loadingIndicatorSilce";
import {
  handleSuccessPopupMessage,
  handleErrorPopupMessage,
} from "./popupMessage";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8081/",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  store.dispatch(setLoading());
  return config;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // instance.defaults.headers['Authorization'] = `Bearer ${getAccessTokenCookie()}`
    handleSuccessPopupMessage(response);
    store.dispatch(setIdle());
    return response;
  },
  (error: AxiosError) => {
    handleErrorPopupMessage(error);
    store.dispatch(setIdle());
    return Promise.reject(error);
  }
);

export default instance;
