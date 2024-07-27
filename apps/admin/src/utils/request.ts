import axios, { type AxiosInstance } from "axios";
import qs from "qs";
import config from "/@/api/config";
import { Session } from "@blog/utils";
import { message } from "ant-design-vue";

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
    if (Session.get("token")) {
      config.headers.Authorization = Session.get("token")
    }
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
          message.error("请求错误，请检查参数是否正确");
          break;
        case 500:
          message.error("系统错误");
          break;
        default:
          break;
      }
      return Promise.reject(data);
    }
  },
  (error) => {
    if (error.message.indexOf("timeout") != -1) {
      message.error("网络超时");
    } else if (error.message == "Network Error") {
      message.error("网络连接错误");
    } else {
      if (error.response?.data) message.error(error.response.data.message);
      else message.error("接口路径找不到");
    }
    return Promise.reject(error);
  },
);

// 导出示例
export default service;
