import axios, { type AxiosInstance } from 'axios';
import qs from 'qs';
import config from '/@/api/config'
import {Session} from "@blog/utils";
import { Notyf } from 'notyf';

const notyf = new Notyf();

const service: AxiosInstance = axios.create({
    baseURL: config.baseURL,
    timeout: 60000,
    headers: {
        'content-type': 'application/json',
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
        if (Session.get('token')) {
            (<any>config.headers).common['Authorization'] = `${Session.get('token')}`
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
        console.log(response)
        return response
    },
    (error) => {
        if (error.message.indexOf('timeout') != -1) {
            notyf.error('网络超时')
        } else if (error.message == 'Network Error') {
            notyf.error('网络连接错误')
        } else {
            if (error.response?.data) notyf.error(error.response.data.message)
            else notyf.error('接口路径找不到')
        }
        return Promise.reject(error)
    },
);

// 导出示例
export default service;
