import { createRouter, createWebHistory } from 'vue-router'
import { useUserInfoStore } from '@/stores/user'
import { constanRoute } from './routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constanRoute
})
// 路由守卫
router.beforeEach(async (to, from, next) => {
  console.log('to', to, to.matched.length);
  if (to.matched.length === 0) {
    const userInfo = useUserInfoStore()
    await userInfo.setMenuList()
    next({ path: to.fullPath })
  }
  // 字符串转json
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const token = userInfo?.token
  if (!token) {
    console.log("未登录", token);
    if (to.path == "/login") {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else {

    console.log("已登录", token);
    if (to.path == "/login") {
      next({ path: '/home' })
    } else {
      next()
    }
  }
}
)

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '后台管理'
  }
})


export default router
