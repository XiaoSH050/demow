import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { constanRoute } from '@/router/routes'

export const useMenuStore = defineStore('menu', () => {
    const menulist = ref(constanRoute)


    return { menulist }
})
