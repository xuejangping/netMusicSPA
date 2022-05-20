<template>
  <div class="seach-info">

    <div class="match">最佳匹配</div>
    <!-- 内容区 -->
    <div >
       <!-- 匹配卡片 -->

      <div style="margin:20px 0;overflow:hidden">
        <el-col :span="6">
        <el-card shadow="hover">
         <div class="matchCard" @click="test">
            <img
            :src="songsRes[0]?songsRes[0].al.picUrl:'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'"
            style="width: 60px; height: 60px;"
            alt="12333"
          />
          <span>{{ `${matchItem}：${keyword}` }}</span>
          <i
            class="el-icon-arrow-right"
            style="font-size: 20px; "
          ></i>
         </div>
        </el-card>
      </el-col>
      </div>

    <MusicList

      :table_data="songsRes"
    >

    </MusicList>
    </div>
  </div>
</template>

<script>

import MusicList from '@/components/common/MusicList.vue'
import bus from '@/tools/eventBus'
export default {
  components: {
    MusicList
  },

  data () {
    return {
      // 歌曲列表
      songsRes: {},

      matchItem: ''

    }
  },
  props: {
    keyword: {
      default: null

    }

  },
  watch: {
    // 监听搜索关键词，请求新搜索数据，更新卡片信息
    keyword () {
      this.getSongsData()
      this.match()
    }
  },
  methods: {
    // 匹配用户搜索的类型，歌曲还是歌手
    match () {
      let i = 0
      // eslint-disable-next-line array-callback-return
      this.songsRes.some(item => {
        // 若用户输入值和歌曲名匹配5次以上，则表明用户搜索的是歌曲，否则用户搜索的是歌手
        i = item.name === this.keyword ? i + 1 : i

        this.matchItem = i > 5 ? '歌曲' : '歌手'
        if (i > 5) return true
      })
    },
    // 请求单曲数据
    getSongsData () {
      this.$diy.getSearchResult(this.keyword, 1).then(res => {
        if (res.result) this.songsRes = res.result.songs
        this.match()
      })
    },
    // 卡片点击功能
    test () {
      if (this.keyword) {
        // const id = this.matchItem === '歌曲' ? this.songsRes[0].id : this.songsRes[0].ar[0].id
        if (this.matchItem === '歌曲') { bus.$emit('play', this.songsRes[0]) } else {
          this.$router.push({ path: `/albumlist/${this.songsRes[0].ar[0].id}`, query: { name: 'singer' } })
        }
      }
    }

  },
  created () {
    this.getSongsData()
  }
}
</script>

<style lang="less" scoped>

// 匹配卡片
.matchCard {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.navbar {
  a {
    font-size: 16px;
    text-decoration: none;
    padding: 0 60px;
  }
}
.match {
  text-align: left;
  padding: 0 30px;
  margin-top: -17px;
  // border-top: 1px solid #e1e1e2;
  border-bottom: 1px solid #e1e1e2;
  line-height: 40px;

}
// mathc卡片
.el-card {
  background-color: rgba(255, 255, 255, 0.4);
  line-height: 60px;
  padding: 5px;
}
/deep/.el-card__body {
  padding: 0px;
}
</style>
