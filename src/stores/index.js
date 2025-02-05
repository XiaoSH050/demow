import { createPinia } from 'pinia'
// 安装持久化插件npm i pinia-plugin-persistedstate

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export default pinia
