<template>
  <div style="width: 200px;position: fixed;height: 100vh;">
    <a-menu style="max-width: 200px;" mode="inline" theme="dark" :items="items" @click="menuTo"></a-menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, computed, h } from 'vue';
import { useRouter } from 'vue-router'
// import api from '@/api'
import { userMenus } from "@/store/menus"
import * as icons from '@ant-design/icons-vue'

const menusStore = userMenus()
const router = useRouter()

//路由跳转
const menuTo = (item: any) => {
  router.push(item.key)
  console.log(item)
}

const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1'],
  menuRoutes: []
})

const items = computed(() => {
  // const menuItem = state.menuRoutes.find((item: MenuRouteItem) => item.path == '/')
  // if (menuItem) {
  //   return mapMenus(menuItem.children || [])
  // }
  if (menusStore.menusData) {
    return mapMenus((menusStore.menusData as any).children || [])
  }
  return []
})

// 处理 icon 的名字
const setIconName = (iconName: string) => {
  // console.log('iconName', iconName)

  const newIconName = (iconName.replace(/-o$/, '') + '-outlined')
    .replace(/(^[a-z])|(-[a-z])/g, (letter: string) => {
      if (letter.includes('-')) {
        return letter[1].toUpperCase()
      }
      return letter.toUpperCase()
    });
  return newIconName;

}

const mapMenus = (menusData: any): any => {
  return menusData.reduce((data: any, item: any) => {
    if (item.icon == 'none') {
      return data;
    }
    if (item.children) {
      console.log(item.icon)
      return [
        ...data,
        {
          key: item.path,
          label: item.name,
          icon: item.icon ? () => h((icons as any)[setIconName(item.icon)]) : null,
          children: mapMenus(item.children)
        }
      ]
    }
    return [
      ...data,
      {
        key: item.path,
        label: item.name,
        icon: item.icon ? () => h((icons as any)[setIconName(item.icon)]) : null,
        // icon: item.icon && React.createElement(
        //   (icons as any)[setIconName(item.icon)]
        // ),
      }
    ]
  }, [])
}

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  },
)
</script>
  
  