import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 全局样式
import '@/assets/css/reset.css'
import "//at.alicdn.com/t/c/font_4672946_0ri4feihrrd.js"
import "@/assets/common/font.css"
// 表格列框自适应
// import Plugin from 'v-fit-columns';
// 引入插件
// import Focus from "@/directives/index"
// 导入动态背景图
import * as THREE from "three"; //导入样式
//导入动态样式逻辑
// 解决通知没有样式的问题
import "element-plus/theme-chalk/el-message.css";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)

import pinia from '@/stores'
// 状态存储
app.use(pinia)
// 路由配置

app.use(router)

// 汉化
app.use(ElementPlus, {
    locale: zhCn,
})
// 引入自定义指令
import { ishasbut } from './views/directive/has'
ishasbut(app)
// 引入v-md-editor
// import VMdEditor from './components/vmdEditor/index.js'
// app.use(VMdEditor)
// 引入评论组件
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
app.use(UndrawUi)

app.mount('#app')
