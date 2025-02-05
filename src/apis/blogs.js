import { request } from '@/utils/http.js'


// 博客类表数据接口
export const blogsList = async (keword = "", order = "-ct_create") => {
    const res = await request(
        {
            url: `/blogs/set/?ordering=${order}&title=${keword}`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 博客详情数据
export const blogsDetail = async (id) => {
    const res = await request(
        {
            url: `/blogs/set/${id}`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 新增博客数据
export const blogsAdd = async (data) => {
    const res = await request(
        {
            url: `/blogs/set/`,
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 新增博客数据
export const blogsUpdate = async (data, id) => {
    const res = await request(
        {
            url: `/blogs/set/${id}/`,
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 删除博客数据
export const blogsRemove = async (id) => {
    const res = await request(
        {
            url: `/blogs/set/${id}/`,
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}


// 评论列表
export const CommentList = async (blogs, order = "-ct_create") => {
    const res = await request(
        {
            url: `/blogs/comment/?blogs=${blogs}&ordering=${order}`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 评论列表
export const CommentAdd = async (data) => {
    const res = await request(
        {
            url: `/blogs/comment/`,
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}



// 文件上传
export const fileUpload = async (files) => {
    const file = files[0]
    let formData = new FormData()
    formData.append('file', file)
    formData.append('file_type', 'blogs')
    const res = await request(
        {
            url: `/file/set/`,
            method: "post",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }
    )
    return res
}