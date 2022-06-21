<template>
  <div class="card">
    <ul>
      <!-- 榜单名字 -->
      <li
      class="title"
        @click="toPlaylist"
        :style="`background: linear-gradient(145deg,${bgcolor} 30%,rgba(161, 164, 253, .8))`"
      >
        <!-- 左侧 -->
        <div style="display:flex">
          <span style="font-size: 60px; line-height: 60px"
            ><i><b>{{ topname.substr(0,1)}}</b></i></span
          >
          <span style=" padding: 0 10px">
            <div style="font-size: 31px; line-height: 37px">
              <i><b>{{topname.substr(1,) }}</b></i>
            </div>
            <div style="font-size:15px">{{ time|dateFormat}}更新</div>
          </span>
        </div>
        <!-- 右侧播放按钮 -->
        <div
          style="

            font-size: 50px;
            line-height: 65px;
            color: #f4e0d9;
          "
        >
          <i class="el-icon-video-play play" v-if="playState"></i>
          <i class="el-icon-video-pause" v-else></i>
        </div>
      </li>
      <!-- 榜单排行前八 -->
      <li
      class="item"
        v-for="(item, index) in playLists"
        @dblclick="play(item)"
        :key="index"
        :style="`display: flex; padding: 0 15px;line-height:34px;
        font-size:13px;background:${index % 2 === 0 ? '#f2f6fc' : ''}`"
      >
        <span style="flex: 7;overflow:hidden" class="left in-oneline">
          <span style="color: #303133; font-size: 18px">{{index + 1 }}</span>
          <span class="textcolor">123%</span>
          <!-- 歌名 -->
          <span>{{item.name}}</span>
          <!-- 歌曲别名 -->
          <span class="textcolor ">{{ item.alia[0]?`(${item.alia[0]})`:''}}</span>
        </span>

        <span class="in-oneline" style="flex: 3; text-align: right">
          <!-- 歌手 -->
          <span class="textcolor" v-for="(item2, index2) in item.ar" :key="index2">
            {{ item2.name}}
          </span>
        </span>
      </li>
      <!-- 查看全部 -->
      <li class="showall">
        <span @click="toPlaylist">查看全部</span>
        <i class="el-icon-arrow-right"></i></li>

    </ul>
  </div>
</template>

<script>
import bus from '@/tools/eventBus.js'
export default {
  data () {
    return {
      playLists: []
    }
  },

  props: {

    listId: {
      default: 19723756
    },
    topname: {
      default: '飙升榜'
    },
    playState: {
      default: true
    },

    bgcolor: {
      default: '#558be6'
    },
    time: {
      default: 'time'
    }
  },
  methods: {
    // 双击播放
    play (item) {
      bus.$emit('play', item)
    },
    // 跳转对应歌单页面
    toPlaylist () {
      this.$router.push({ path: '/albumlist/' + this.listId, query: { name: 'playlist' } })
    },
    getSongList () {
      this.$diy.getSongList(this.listId).then(res => {
        if (res.tracks) {
          res.tracks.some((item, index) => {
            this.playLists.push(item)
            return index > 6
          })
        }
        // console.log(arr.join(','))
      })
    }

  },
  created () {
    this.getSongList()
  }
}
</script>

<style lang="less" scoped>
// 列表项
.item:hover{
  background-color: #c6e2ff !important;
}
// 查看全部
.showall{
  background-color: #f2f6fc;
  padding: 0 15px;
  text-align: right;
  color: #888888;
  font-size:13px
}
.left {
  span {
    padding: 0 3px;
  }
}
.textcolor {
  color: #909399;
}
// 播放键
.play:hover {
  color: #fff;
}
.card {
  width: 30%;

  margin:0 15px 25px 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  ul li:first-child {
    display: flex;
    justify-content: space-between;
    height: 100px;
    box-sizing: border-box;
    color: #fff;
    padding: 20px 25px;

  }
  .in-oneline{
    display: -webkit-box;
     text-overflow: ellipsis;
   -webkit-line-clamp:1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  }
}
</style>
