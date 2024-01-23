import { defineStore } from 'pinia'
import api from '@/api'

export const userMenus = defineStore('menus', {
    state: () => ({
        menuRoutes: []
    }),
    getters: {
        menusData: (state) => state.menuRoutes.find((Item: any) => Item.path == '/')
    },
    actions: {
        
        async getMenuRoutes() {
            const user = localStorage.user
            if (user) {
                const { username } = JSON.parse(user)
                const res: any = await api.global.getMenus({ username })
                this.menuRoutes = res
                console.log('menu',this.menuRoutes)
            }
        }
    }
})