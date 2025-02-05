import { request } from '@/utils/http.js'

// 用户列表数据
export const UserList = async (page, page_size, keword, order = "-ct_create") => {
    const res = await request(
        {
            url: `/user/set/?page=${page}&page_size=${page_size}&user_name=${keword}&ordering=${order}`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 添加用户
export const addUser = async (data) => {
    const res = await request(
        {
            url: `/user/set/`,
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 修改用户
export const updateUser = async (data, id) => {
    const res = await request(
        {
            url: `/user/set/${id}/`,
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 删除用户
export const DeleteUser = async (id) => {
    const res = await request(
        {
            url: `/user/set/delete_user?ids=${id}`,
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 用户角色列表数据
export const UserRoleList = async () => {
    const res = await request(
        {
            url: `/user/role/`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 角色列表数据
export const RoleList = async (page = 1, page_size = 2, keword, order = "-ct_create") => {
    const res = await request(
        {
            url: `/user/role/?page=${page}&page_size=${page_size}&role_name=${keword}&ordering=${order}`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 角色新增
export const RoleAdd = async (data) => {
    const res = await request(
        {
            url: `/user/role/`,
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 角色更新
export const RoleUpdate = async (data, id) => {
    const res = await request(
        {
            url: `/user/role/${id}/`,
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 角色删除
export const RoleDel = async (id) => {
    const res = await request(
        {
            url: `/user/role/${id}/`,
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 角色权限分配
export const RolePerm = async (data) => {
    const res = await request(
        {
            url: `/user/role/perm/`,
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        })
    return res
}

// 角色默认权限
export const defaultRolePerm = async (id) => {
    const res = await request(
        {
            url: `/user/role/perm/?id=${id}`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return res
}

// 权限列表
export const PermList = async () => {
    const res = await request(
        {
            url: `/user/perm/`,
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}

// 添加权限
export const PermAdd = async (data) => {
    const res = await request(
        {
            url: `/user/perm/`,
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 修改权限
export const PermPut = async (data, id) => {
    const res = await request(
        {
            url: `/user/perm/${id}/`,
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }
    )
    return res
}

// 删除权限
export const PermDel = async (id) => {
    const res = await request(
        {
            url: `/user/perm/${id}/`,
            method: "delete",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return res
}