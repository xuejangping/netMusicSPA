
<template>
  <div class="seach-info">
    <h3 style="text-align: left; font-weight: 500">
      搜索内容：<span style="color: red">"{{ keyword }}" </span>, 找到
      <span style="color: #9cdcfe">{{ resCount }}</span>
    </h3>
    <div class="search-nav">
      <el-tabs v-model="activeName" @tab-click="handleClick" value="">
        <el-tab-pane label="单曲" name="first"></el-tab-pane>
        <el-tab-pane label="歌手" name="second"></el-tab-pane>
        <el-tab-pane label="专辑" name="third"></el-tab-pane>
        <el-tab-pane label="视频" name="fourth"></el-tab-pane>
        <el-tab-pane label="歌单" name="fifth"></el-tab-pane>
      </el-tabs>
    </div>

    <!-- 加载动画 -->
    <i v-if="loadingState" class="el-icon-loading" style="font-size: 40px"></i>
    <!-- 搜索模块需要保留，所以使用v-show -->
      <div v-show="!loadingState">
        <!-- 搜索模块切换 -->
        <keep-alive >
          <component
           :is="componentName"
           :keyword="keyword"
          >
          </component>
        </keep-alive>
      </div>

  </div>
</template>

<script>
import bus from '@/tools/eventBus'
import SearchMusic from '@/components/Main/S-Music.vue'
import SearchSinger from '@/components/Main/S-Singer.vue'
import SearchAlbum from '@/components/Main/S-Album.vue'
import SearchVideo from '@/components/Main/S-Video.vue'
import SearchPlayList from '@/components/Main/S-PlayList.vue'
export default {
  components: {
    /* eslint-disable vue/no-unused-components */
    SearchMusic,
    SearchSinger,
    SearchAlbum,
    SearchVideo,
    SearchPlayList
  },

  data () {
    return {

      loadingState: false,
      activeName: 'first',
      componentName: 'SearchMusic',

      // 搜索结果数量
      resCount: ''

    }
  },
  props: {
    keyword: {
      default: ''
    }

  },

  methods: {
    // 加载动画
    loading () {
      this.loadingState = true
      setTimeout(() => {
        this.loadingState = false
      }, 800)
    },
    // 点击选项卡，切换搜索内容
    handleClick (tab) {
      this.loading()
      switch (parseInt(tab.index)) {
        case 0:
          this.componentName = 'SearchMusic'
          break
        case 1:
          this.componentName = 'SearchSinger'
          break
        case 2:
          this.componentName = 'SearchAlbum'
          break
        case 3:
          this.componentName = 'SearchVideo'
          break
        case 4:
          this.componentName = 'SearchPlayList'
          break

        default:
          break
      }
    }

  },
  created () {
    // 初始化数据请求和组件
    bus.$on('search', () => {
      this.loading()
    })
  }

}
</script>

<style lang="less" scoped>
.search-nav {
  line-height: 30px;
  text-align: center;
  /deep/.el-tabs__nav {
    float: none;
  }
  /deep/.el-tabs__active-bar {
    left: 36%;
  }
  /deep/.el-tabs__item.is-active {
    color: red;
  }
  /deep/.el-tabs__active-bar {
    background-color: red;
  }
}

// 页面行高
div {
  line-height: 40px;
}
</style>
