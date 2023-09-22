import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import router from './router'
import VueEcharts from 'vue-echarts'
import 'echarts'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App);
const pinia = createPinia()

//全局自定义指令
app.use(Antd);
app.use(pinia)
app.use(router)
app.component('ECharts', VueEcharts)
app.mount('#app');
