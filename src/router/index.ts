import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import { userMenus } from '@/store/menus'

const routes = [
    {
        path: '/login',
        component: LoginView
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})


const mapChildrenRoutes = (routesData: any) => {
    return routesData.reduce((data: any, item: any) => {
        if (item.children) {
            return [
                ...data,
                ...mapChildrenRoutes(item.children)
            ]
        }
        // 没有子菜单，保留当前菜单的路由
        return [
            ...data,
            {
                path: item.path,
                // component: () => import(`../views/${item.component}.vue`),
                component: () => import('../views/' + item.component + '.vue'),
            }
        ]
    }, [])
}

//全局前置守卫
router.beforeEach(async (to) => {
    if (to.path.includes('login')) {
        return true
    }
    
    const user = localStorage.user
    if (!user) {
        return '/login'
    }
    
    if(to.path == '/'){
        return '/home'
    }

    //发送请求获取用户路由菜单
    if (router.getRoutes().length == 1) {
        const menuStore = userMenus()
        await menuStore.getMenuRoutes()

        //动态生成路由配置
        menuStore.menuRoutes.forEach((item: any) => {
            if (item.path.includes('*')) {
                router.addRoute({
                    path: "/:catchAll(.*)*",
                    component: () => import(`../views/404/NotFonud.vue`)
                })
            } else {
                router.addRoute({
                    path: '/:catchAll(.*)*',
                    component: () => import(`../views/${item.component}.vue`),
                    children: mapChildrenRoutes(item.children || [])
                })
            }
        })
        //获取当前所有路由
        return to.fullPath
    }
})

export default router