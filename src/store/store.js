
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state: {
    // 个性推荐页面tab栏名称
    recomendTabs: ['个性推荐', '歌单', '主播电台', '排行榜', '歌手', '最新音乐'],
    // 桌面歌词当前内容
    currentLineLrc: '浮生浪迹笑明月，千愁散尽一剑轻'
  },
  mutations: {
    changeCurrentLineLrc (state, newLrc) {
      state.currentLineLrc = newLrc
    }
  }
})

export default store
