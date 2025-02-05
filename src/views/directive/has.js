// 自定义指令
import { useUserInfoStore } from "@/stores/user"


export const ishasbut = (app) => {
    // 获取用户的的按钮权限列表
    const userInfoStore = useUserInfoStore()
    app.directive('has', {
        // 代表使用这个全局自定义指令的DOM｜组件挂载完毕会执行一次
        mounted(el, options) {
            // console.log(el);
            // console.log(options);
            if (!userInfoStore.userInfo.btns.includes(options.value)) {
                // console.log('ss');
                // 如果没有权限，则移除这个DOM元素
                // el.parentNode.removeChild(el)
                // 如果没有权限隐藏
                el.style.display = 'none'
                // 如果没有权限按钮disable
                // el.setAttribute('disabled', true)

            }
        },

    })
}