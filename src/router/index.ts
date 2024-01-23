import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import { userMenus } from "@/store/menus";


//'../views'文件夹及其子文件夹下的所有 .vue 文件
const modules = import.meta.glob("../views/**/*.vue");

const routes = [
  {
    path: "/login",
    component: LoginView,
  }
];

const router = createRouter({
  routes,
  history: createWebHistory()
  // history: createWebHashHistory(),
});

const mapChildrenRoutes = (routesData: any) => {
  return routesData.reduce((data: any, item: any) => {
    // console.log('查看modules',modules[`../views/${item.component}.vue`])
    if (item.children) {
      return [...data, ...mapChildrenRoutes(item.children)];
    }
    
    // 没有子菜单，保留当前菜单的路由
    return [
      ...data,
      {
        path: item.path,
        // component: () => import(`../views/${item.component}.vue`),
        // component: () => import("../views/" + item.component + ".vue"),
        component: modules[`../views/${item.component}.vue`],
      },
    ];
  }, []);
};

//全局前置守卫
router.beforeEach(async (to) => {
  if (to.path.includes("login")) {
    return true;
  }

  const user = localStorage.user;
  if (!user) {
    return "/login";
  }

  if (to.path == "/") {
    return "/home";
  }

  //发送请求获取用户路由菜单
  if (router.getRoutes().length == 1) {
    const menuStore = userMenus();
    await menuStore.getMenuRoutes();

    //动态生成路由配置
    menuStore.menuRoutes.forEach((item: any) => {
      if (item.path.includes("*")) {
        router.addRoute({
          path: "/:catchAll(.*)*",
          component: () => import(`../views/404/NotFonud.vue`),
        });
      } else {
        router.addRoute({
          path: "/:catchAll(.*)*",
          // component: () => import(`../views/${item.component}.vue`),
          component: modules[`../views/${item.component}.vue`],
          children: mapChildrenRoutes(item.children || []),
        });
      }
    });
    //获取当前所有路由
    return to.fullPath;
  }
});

// router.onError((error,to)=>{
//     if(error.message.includes('Failed to fetch dynamically imported module')){
//         window.location.href = '/ts-super-web/#' + to.fullPath
//     }
// })

export default router;
