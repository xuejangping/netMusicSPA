import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchInfo from '@/views/Header/Search-info.vue'
import Content from '@/views/content.vue'
import Discover from '@/views/Aside/Discover.vue'
import Video from '@/views/Aside/Video.vue'
import SongList from '@/views/common/SongList.vue'
import VideoPlay from '@/views/common/VideoPlay.vue'
import bus from '@/tools/eventBus.js'
// import App from '@/App.vue'
// 安装VueRouter插件

Vue.use(VueRouter)
// 跳转同一地址会报错，处理方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 路由规则
const routes = [
  { path: '/', redirect: '/discover/' },

  {
    // 此路由无实际用处，做测试路由使用
    path: '/content',
    component: Content

  },
  // 搜索结果
  {
    path: '/searchinfo/:keyword',
    component: SearchInfo,
    props: true

  },
  // 发现音乐
  {
    path: '/discover/',
    component: Discover
  },
  // 视频
  {
    path: '/videolist/',
    component: Video
  },
  // 歌手，专辑，歌单详情页公用组件SongList
  {
    path: '/albumlist/:listId',
    component: SongList,
    props: true

  },
  {
    path: '/video/:vid/:type',
    component: VideoPlay,
    props: true

  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to) {
    bus.$emit('loadingAnimate')
  }
  next()
})
export default router
