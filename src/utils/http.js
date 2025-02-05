import axios from 'axios'
import { useUserInfoStore } from "@/stores/user";
import router from '@/router/index'

export function request(config) {
    const instance = axios.create({
        baseURL: "http://0.0.0.0:8000",
        timeout: 5000,
    })
    // 请求拦截器
    instance.interceptors.request.use(config => {

        const userInfo = useUserInfoStore();
        config.headers.token = userInfo.token
        return config
    }, err => {
        return Promise.reject(err)
    })
    // 响应拦截器
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        if (err.response.data.msg == "验证失败") {
            localStorage.setItem('userInfo', JSON.stringify({}))
            router.push('/login')
        };
        return Promise.reject(err)
    })
    return instance(config)
}