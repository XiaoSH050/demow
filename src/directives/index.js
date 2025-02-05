import { createApp } from 'vue'

export default (vue) => {
    // 注册全局自定义指令
    vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
            console.log(el);
            // 聚焦元素
            el.focus()
        }
    })
}