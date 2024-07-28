import axios, { type AxiosInstance } from "axios";
import qs from "qs";
import config from "/@/api/config";
import { Notyf } from "notyf";

const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});

const service: AxiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 60000,
  headers: {
    "content-type": "application/json",
  },
  // 参数序列化
  paramsSerializer: {
    serialize(params) {
      return qs.stringify(params);
    },
  },
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { status: code, data } = response;
    if (code === 200) {
      return data;
    } else {
      switch (code) {
        case 400:
          notyf.error("请求错误，请检查参数是否正确");
          break;
        case 500:
          notyf.error("系统错误");
          break;
        default:
          break;
      }
      return Promise.reject(data);
    }
  },
  (error) => {
    if (error.message.indexOf("timeout") != -1) {
      notyf.error("网络超时");
    } else if (error.message == "Network Error") {
      notyf.error("网络连接错误");
    } else {
      if (error.response?.data) notyf.error(error.response.data.message);
      else notyf.error("接口路径找不到");
    }
    return Promise.reject(error);
  },
);
// 导出示例
export default service;
