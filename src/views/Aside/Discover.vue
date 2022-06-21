
<template >
  <div class="discover" ref="discover">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      value=""
      style="font-size: 30px"
    >
      <el-tab-pane label="个性推荐" name="first"></el-tab-pane>
      <el-tab-pane label="歌单" name="second"></el-tab-pane>
      <el-tab-pane label="主播电台" name="third"></el-tab-pane>
      <el-tab-pane label="排行榜" name="fourth"></el-tab-pane>
      <el-tab-pane label="歌手" name="fifth"></el-tab-pane>
      <el-tab-pane label="最新音乐" name="sixth"></el-tab-pane>
    </el-tabs>
    <!-- 加载动画 -->
    <i v-if="loadingState" class="el-icon-loading" style="font-size: 40px"></i>
    <div v-show="!loadingState">
      <keep-alive>
        <component
          :is="componentName"
          @morePlayList="
            componentName = 'Playlist';
           activeName = 'second';
          "
          @toNewMusic="
            componentName = 'NewMusic';
            activeName = 'sixth';
          "
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Recomend from '@/components/Main/D-Recomend.vue'
import Toplist from '@/components/Main/D-Toplist.vue'
import Singer from '@/components/Main/D-Singer.vue'
import NewMusic from '@/components/Main/D-NewMusic.vue'

// 歌单列表
import Playlist from '@/components/Main/D-PlayList.vue'
export default {
  name: 'Discover',

  data () {
    return {
      loadingState: false,
      activeName: 'first',
      componentName: 'Recomend'
    }
  },

  components: {
    Recomend,
    Toplist,
    Singer,
    Playlist,
    NewMusic
  },
  methods: {
    // 加载动画
    // loading () {
    //   this.loadingState = true
    //   setTimeout(() => {
    //     this.loadingState = false
    //   }, 800)
    // },

    // 切换tab
    switchTab (tabId) {
      switch (tabId) {
        case 0:
          this.componentName = 'Recomend'
          break
        case 1:
          this.componentName = 'Playlist'
          break
        case 2:
          this.componentName = 'Playlist'
          break
        case 3:
          this.componentName = 'Toplist'
          break
        case 4:
          this.componentName = 'Singer'
          break
        case 5:
          this.componentName = 'NewMusic'
          break

        default:
          break
      }
    },
    // tab栏点击事件，tab.index是每个选项卡的id
    handleClick (tab) {
      this.$diy.loading.call(this, 600)
      this.switchTab(parseInt(tab.index))
    }
  }
}
</script>

<style lang="less" scoped>
.discover {
  line-height: 30px;
  text-align: center;
  /deep/.el-tabs__nav {
    float: none;
  }
  /deep/.el-tabs__active-bar {
    left: 28%;
  }
  /deep/.el-tabs__item.is-active {
    color: red;
  }
  /deep/.el-tabs__active-bar {
    background-color: red;
  }
}
</style>
