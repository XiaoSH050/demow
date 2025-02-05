import { request } from '@/utils/http.js'


// 爬虫汇总
export const spiderManager = async () => {
    const res = await request(
        {
            url: `/spider/manger`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}