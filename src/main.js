import Vue from 'vue'
import App from './App.vue'
import store from '@/store/store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入bootstrap

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/common.css'

import axios from 'axios'
// 导入vant Icon图标,和轻提示功能
import Vant, { Toast } from 'vant'
import 'vant/lib/index.less'
import InBody from '@/components/common/InBody.vue'
// 导入一些自定义的公用方法或属性
import diy from '@/tools/comMethods'

Vue.use(Vant)
Vue.prototype.$Toast = Toast
Vue.prototype.$diy = diy

// 挂载axios到vue,设置基本地址
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000'
  // https://autumnfish.cn'
})

Vue.use(ElementUI)
// 全局组件
Vue.component('InBody', InBody)

// 时间戳过滤器
Vue.filter('dateFormat', (dataStr) => {
  const time = new Date(dataStr)

  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str
    }
    return str
  }
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d)
})
Vue.filter('timeFormat', (str) => {
  const m = Math.floor(str / 1000 / 60).toString().padStart(2, '0')
  const s = Math.floor(str / 1000 % 60).toString().padStart(2, '0')
  return m + ':' + s
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
