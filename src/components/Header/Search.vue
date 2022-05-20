<template>
  <div class="search" @click.stop="" @mousedown.stop="">
    <span  @keyup.enter="search(0)">
      <el-input
      placeholder="搜索音乐，视频，歌单，专辑"
      v-model.trim="searchtext"
      size="small"

      @focus="showSuggest"

     >
      <i
        slot="suffix"
        class="el-input__icon el-icon-search"
        @click="search(0)"
      ></i>
    </el-input></span>

    <!-- 搜索建议卡片-->
    <div class="showsuggest" v-if="state"  tabindex=tabindex>
      <div class="main">
        <div class="search-history">
        <span
          >搜索历史 <i class="el-icon-delete" @click="removeHisotry" style="padding:0 5px"></i
        ></span>
        <span style="float: right" @click="showAllHistory">查看全部</span>
        <div>
          <!-- 每一个历史记录 -->
          <span class="item" v-for="(item, index) in history" :key="index" @click="search(item)">{{
            item
          }}</span>
        </div>
      </div>
      <!-- 热搜榜 -->
      <ol class="hot">
        <span>热搜榜</span>
        <li v-for="(item, index) in hot" :key="index" @click="search(item.searchWord)">
          <span style="color: red"> {{ index+1}}</span>
          <span>{{item.searchWord}}</span>
          <span style="color: #d1d1d1; font-size: 13px">{{item.score}}</span>
          <span> <img :src="item.iconUrl||''" alt="" style="width:17px;height:15px;"></span>

        </li>
      </ol>
      </div>
    </div>

  </div>
</template>

<script>
import bus from '@/tools/eventBus.js'
export default {
  name: 'Search',
  data () {
    return {
      // 搜索内容
      searchtext: '',
      state: false,
      hot: [],

      shareInfo: {},
      // localStorage中的历史记录
      MusicHistory: [],
      // 当前会话中的历史搜索历史
      history: []

    }
  },
  props: [],
  methods: {
    // 搜索功能
    search (item) {
      this.$emit('closeWindow')
      // 关闭搜索卡片
      this.hideSuggest()
      // 判断是否来自卡片的搜索点击，为防止item被识别为鼠标事件，鼠标触发搜索功能时必须加实参0
      if (item) { this.searchtext = item } else {
        // 将搜索值存入localStorage，方便之后刷新显示搜索记录
        if (this.searchtext && this.history.indexOf(this.searchtext) === -1) { this.addHistory(this.searchtext) }
      }

      // 路由到搜索界面
      // if (this.$route.path === '/searchinfo') return
      this.$router.push('/searchinfo/' + this.searchtext)
      // 坑！！！一定要用nextTick() ,先路由生成界面，再触发search事件
      this.$nextTick(() => { bus.$emit('search') })
    },
    // 展示搜索卡片
    showSuggest () {
      setTimeout(() => {
        this.state = true
      }, 300)
    },
    // 影藏搜索卡片
    hideSuggest () {
      this.state = false
    },
    // 展示全部搜索记录
    showAllHistory () {
      this.history = this.MusicHistory
    },

    // 清除所有搜索记录
    removeHisotry () {
      this.history = []
      localStorage.setItem('MusicHistory', '')
    },
    // 向localStorage添加搜索记录
    addHistory (item) {
      this.history.unshift(item)

      this.MusicHistory.unshift(item)
      localStorage.setItem('MusicHistory', JSON.stringify(this.MusicHistory))
    },
    // 卡片热搜榜
    async getHotList () {
      const { data: res } = await this.$axios('/search/hot/detail')
      this.hot = res.data
    }

  },

  created () {
    // eslint-disable-next-line no-eval
    if (localStorage.getItem('MusicHistory')) this.MusicHistory = eval(localStorage.getItem('MusicHistory'))

    // 打开页面时只展示4个历史记录
    this.history = this.MusicHistory.filter((item, index) => index < 4)
    // 全局绑定影藏搜索卡片
    document.addEventListener('click', () => {
      this.hideSuggest()
    })
    // 给回车键绑定搜索功能
    // document.addEventListener('keyup', (e) => {
    //   if (e.target.placeholder === '搜索音乐，视频，歌词，电台' && e.key === 'Enter') {
    //     this.search()
    //   }
    // })
    this.getHotList()
  }
}
</script>

<style lang="less" scoped>
.search {

  position: relative;
::-webkit-scrollbar{
  width: 8px;
}
::-webkit-scrollbar-thumb{
  border-radius: 4px;
  background-color: #e1e1e2;
}
  // 搜索展示栏
  .showsuggest {
    position: absolute;
    z-index: 10;
    top: 60px;
    left: 0px;
    width: 360px;
    height: 370px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    overflow: auto;

  }
  .showsuggest::before {
    content: "";
    position: absolute;
    top: -14px;
    left: 20px;
    width: 0px;
    height: 0px;
    border: 8px solid;
    border-color: transparent transparent #fff transparent;
  }
  .search-history {
    line-height: 40px;
    span,
    i {
      cursor: pointer;
    }
    .item {
      display: inline-block;
      border-radius: 10px;
      line-height: 24px;
      min-width: 40px;
      border: 1px solid #cacaca;
      text-align: center;
      font-size: 10px;
      padding: 0 5px;
      margin: 0 4px;
    }
  }
  // 热搜榜
  .hot {
    line-height: 50px;
    list-style: none;
    padding: 10px;
    span {
      padding: 0 10px;
    }

    li:hover{
      background-color: #ededed
    }

  }
  .el-input{
    width: 120%;
  }
}

</style>
