import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Login } from "@/apis/login"
import { constanRoute, asyncRoutes, anyRoute } from "@/router/routes"
import { useRouter } from 'vue-router'
import { cloneDeep } from 'lodash'

function filter_routers(asyncRoutes, menus) {
    // 使用列表推导式筛选出 name 字段在 menus 列表中的元素
    const filterFirst = asyncRoutes.filter(router => {
        if (menus.includes(router['name'])) {
            return router
        }
    })
    // console.log(filterFirst);
    filterFirst.forEach(item => {
        if (item.children) {
            item.children = filter_routers(item.children, menus)
        }
    });
    return filterFirst
}
export const useUserInfoStore = defineStore('userInfo', () => {
    const userInfo = ref({})
    const token = ref("")
    const router = useRouter()
    const menulist = ref([])

    const getUserInfo = async (data) => {
        const res = await Login(data)
        userInfo.value = res.data
        token.value = res.data.token
        localStorage.setItem('menus', res.data.menus)
        await setMenuList()
    }
    const setMenuList = async () => {
        const filtered_routers = filter_routers(cloneDeep(asyncRoutes), localStorage.getItem('menus'))
        menulist.value = [...constanRoute, ...filtered_routers, ...anyRoute]
        // console.log(menulist.value);
        const allasyncRoutes = [...filtered_routers, ...anyRoute]
        allasyncRoutes.forEach(route => {
            router.addRoute(route)
        })
    }
    const clearInfo = () => {
        userInfo.value = {}
        token.value = ""
        menulist.value = []
    }
    return { userInfo, token, getUserInfo, clearInfo, menulist, setMenuList }
},
    {
        persist: true
    }
)
