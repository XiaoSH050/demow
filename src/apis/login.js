import { request } from '@/utils/http.js'

// 用户登录
export const Login = async (data) => {
    const res = await request(
        {
            url: '/login/',
            method: "post",
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}


// 获取数据汇总
export const getTobaccoALl = async () => {
    const res = await request(
        {
            url: '/user/tobacco/all/',
            method: 'GET'
        }
    )
    return res
}