<template>
  <div class="playwindow" >
    <!--  -->
    <!-- 影藏播放页按钮 -->
    <span class="closebtn" @click="closeWindow"
      ><i class="el-icon-bottom-left"></i
    ></span>

    <div class="top" v-if="playingInfo">
      <!-- 背景模糊层 -->
      <span
        class="blur"
        :style="`background-image:url(${playingInfo.al?playingInfo.al.picUrl:playingInfo.album.picUrl}) ;`"
      ></span>
      <!-- 左边旋转专辑图 -->
      <span class="le">
        <div class="a1" :style="`animation-play-state:${playState}`">
          <div class="album-pic" :style="`animation-play-state:${playState}`">
            <img style="width: 100%" :src="playingInfo.al?playingInfo.al.picUrl:playingInfo.album.picUrl" alt="" />
          </div>
        </div>

      </span>
      <!-- 右边区域信息，歌词 -->
      <span class="ri">
        <h2 style="padding: 5px 0">{{ playingInfo.name }}</h2>
        <span v-if="playingInfo.alia?playingInfo.alia.length:playingInfo.alias.length">{{
         playingInfo.alia?playingInfo.alia[0]:playingInfo.song.alias[0]
        }}</span>
        <span class="ri-three">
          <!-- 专辑路由 -->
          <span @click="closeWindow"
            >专辑：
            <router-link

              :to="{
                path: `/albumlist/${playingInfo.al?playingInfo.al.id:playingInfo.album.id}`,
                query: { name: 'album' },
              }"
              >{{ playingInfo.al?playingInfo.al.name:playingInfo.album.name }}</router-link>
            <!-- 歌手信息路由 --> </span
          ><span @click="closeWindow">歌手：
            <router-link

              v-for="(item, index2) in playingInfo.ar||playingInfo.artists"
              :key="index2"
              :to="{ path: `/albumlist/${item.id}`, query: { name: 'singer' } }"
              >{{ index2 > 0 ? "/" + item.name : item.name }}</router-link
            ></span
          >
          <span>来源：</span></span
        >
        <!-- 歌词显示区域 -->
          <span class="lyric" v-if="lyric">
            <ul id="lyric-list" style="line-height:40px">
              <li  class="in-one-line" style="height:40px" v-for="(item, index) in lyric.text" :key="index">{{ item}}</li>
            </ul>
        </span>
      </span>
    </div>
  <div class="action" >
     <span
       v-for="(item, index) in actionBtns" :key="index"
       @click="action(item)">
       <el-button size="small" ><van-icon :name="item.icon" color="red" /> {{item.text}}</el-button>
     </span>

  </div>

  <!-- 评论区 -->
  <div v-if="comments" class="comment">
    <div class="le">
      <Comment
      :headername="'歌友评论'"
      :content="false"
      :commentCount="comments.total"
      @comment="submitComment"
      ></Comment>
      <h5 style="border-bottom: 1px solid #ebeef5; padding:30px 0 5px" >精彩评论</h5>
      <Comment
      :header="false"
      v-for="(item, index) in comments.hotComments" :key="index"
       :avaSrc="item.user.avatarUrl"
          :uname="item.user.nickname"
          :text="item.content"
          :time="item.time"
          :praise="item.likedCount"

      ></Comment>
      <h5 style="border-bottom: 1px solid #ebeef5; padding:30px 0 5px" >最新评论({{comments.total }})</h5>
      <Comment
      :header="false"
      v-for="(item, index) in comments.comments" :key="index+'b'"
       :avaSrc="item.user.avatarUrl"
          :uname="item.user.nickname"
          :text="item.content"
          :time="item.time"
          :praise="item.likedCount"

      ></Comment>

    </div>
    <!-- 右边相似歌单，相似音乐 -->
    <div class="ri">
      <!-- 相似歌单 -->
      <div class="same-palylist" v-if="simiplaylists&&simiplaylists.length">
        <h3 style="border-bottom: 1px solid lightgray;padding:40px 0 5px">包含这首歌的歌单</h3>
        <RowList :imgwidth="'56px'" :imgheight="'56px'" :order="false"
          v-for="(item, index) in simiplaylists" :key="index"
          :src="item.coverImgUrl" @click="toPlayList(item.id)"
          :playbtn="true"
        >
          <div slot="content" class="slot-content">
            <span style="inoneline">{{ item.name}}</span>
            <span style="color:#ababab"> 播放：{{ item.playCount/10000+'万'}}</span>
          </div>
        </RowList>
      </div>

       <!-- 相似歌曲 -->
      <div class="same-palylist" v-if="simisongs&&simisongs.length">
        <h3 style="border-bottom: 1px solid lightgray;padding:40px 0 5px">相似歌曲</h3>
        <RowList :imgwidth="'56px'" :imgheight="'56px'" :order="false"
          v-for="(item, index) in simisongs" :key="index"
          :src="item.album.picUrl" @click="play(item)"
          :playbtn="true"
        >
          <div slot="content" class="slot-content">
            <span style="inoneline">{{ item.name}}</span>
            <span style="color:#ababab"> {{ item.artists[0].name}}</span>
          </div>
        </RowList>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
import bus from '@/tools/eventBus'
import Comment from '@/components/common/Comment.vue'
import RowList from '@/components/common/RowList.vue'
export default {
  data () {
    return {
      actionBtns: [{ text: '喜欢', icon: 'like-o' }, { text: '收藏', icon: 'add-square' }, { text: '下载', icon: 'down' }, { text: '分享', icon: 'share' }],
      // 动画状态
      playState: 'paused',
      // 当前播放歌曲的数据
      playingInfo: null,
      // 格式化后的歌词
      lyric: { text: null },
      // 请求到的评论
      comments: null,
      simiplaylists: null,
      simisongs: null
    }
  },
  components: { Comment, RowList },
  methods: {
    // 相似歌曲的播放功能
    play (item) {
      bus.$emit('play', item)
    },
    // 请求相似歌曲
    getSimiSongs (id) {
      this.$axios('/simi/song', { params: { id: id } }).then(res => { this.simisongs = res.data.songs })
    },
    // 路由歌单页面
    toPlayList (id) {
      this.closeWindow()
      this.$router.push({ path: '/albumlist/' + id, query: { name: 'playlist' } })
    },
    // 请求相似歌单
    getSimiPlayLists (id) {
      this.$axios('/simi/playlist', { params: { id: id } }).then(res => { this.simiplaylists = res.data.playlists })
    },
    // 请求歌曲评论
    getSongComment (id) {
      this.$axios('/comment/music', { params: { id: id } }).then(res => { this.comments = res.data })
    },
    // 发表评论
    submitComment () {
      this.$toast('还没有登录哦')
    },
    // 影藏播放窗口
    closeWindow () {
      this.$emit('closeWindow')
    },
    action () {
      this.$toast('还没有登录哦')
    },
    // 歌词数据格式化
    lyricFormat (lyric) {
      const t = []; const c = []

      lyric.split('\n').forEach((item) => {
        const arr = item
          .substring(item.indexOf('[') + 1, item.indexOf(']'))
          .split(':')
        t.push(arr[0] * 60 + parseFloat(arr[1]))

        c.push(item.substring(item.indexOf(']') + 1))
      })
      this.lyric.time = t; this.lyric.text = c
    },
    // 当前歌词高亮，滚动
    activeLrc (active) {
      const lrclists = Array.from(this.$el.querySelector('#lyric-list').children)
      // 歌词显示盒子
      const lrcDispalybox = this.$el.querySelector('.lyric')

      //  当前行显示高亮
      lrclists.forEach(item => item.classList.remove('active-lrc'))
      lrclists[active].classList.add('active-lrc')
      //  若当前歌词顶部距离大于歌词显示盒子一半，泽调整显示盒子的scrollTop，使当前歌词始终居中
      if (lrclists[active].offsetTop > lrcDispalybox.clientHeight * 0.5) {
        lrcDispalybox.scrollTop = lrclists[active].offsetTop - lrcDispalybox.clientHeight * 0.4
      }
    }

  },
  computed: {},
  created () {
    // 接收当前播放的歌曲信息
    bus.$on('shareMusicInfo', (e) => {
      this.playingInfo = e[0]
      // e[1]为真代表播放音乐，需要开启动画，若为假代表初始化播放器信息，不需要开启动画
      if (e[1]) { this.playState = 'running' }
      // 根据id请求歌词数据
      this.$diy.getLyric(e[0].id).then((res) => {
        this.lyricFormat(res.lrc.lyric)
      })
      // 请求评论、相似歌单、相似歌曲
      this.getSongComment(e[0].id)
      this.getSimiPlayLists(e[0].id)
      this.getSimiSongs(e[0].id)
    })
    // 当前歌词高亮
    bus.$on('timeupdate', (e) => {
      // e是audio标签当前的播放时间
      if (!this.lyric.time) return
      // 通过对比当前播放时间和请求的歌词时间戳对比,匹配条件：99.6%<=x<=100.5%，定位当前所在歌词的index
      // 若为纯音乐即5940，直接输出i=index
      let i = 0
      const flag = this.lyric.time.some((item, index) => {
        if (item >= 5940) i = index
        if (item / e >= 0.996 && item / e <= 1.004) i = index
        return (item / e >= 0.996 && item / e <= 1.004) || item >= 5940
      })
      // 若匹配到歌词后，执行当前行歌词高亮，并分享当前歌词到musicPlayer组件中，供桌面歌词功能使用
      if (flag) {
        this.activeLrc(i)
        // 当前歌词时间dt
        const dt = this.lyric.time[i + 1] ? this.lyric.time[i + 1] - this.lyric.time[i] : 0
        bus.$emit('currentLineLrc', [this.lyric.text[i], dt])
      }
    })
    // 播放状态改变事件
    bus.$on('paused', e => { this.playState = e ? 'paused' : 'running' })
  }

}
</script>

<style lang="less" scoped>
.inoneline{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
.active-lrc {

  color: #fff;
}
// 影藏滚动条
::-webkit-scrollbar {
  width: 0px;
}
.playwindow {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #f5f3ff;
  padding: 20px 130px;
  .closebtn {
    width: 40px;
    height: 30px;
    border: 1px solid #d3d0d6;
    position: fixed;
    right: 40px;
    top: 90px;
    border-radius: 5px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
  }
  overflow: auto;
  .top {
    position: relative;
    height: 550px;
    display: flex;

    .blur {
      position: absolute;
      top: 0;
      left: 0;
      width: 90%;
      height: 90%;
      filter: blur(100px);
      opacity: 0.6;
      background: no-repeat;
      background-size: 100%;
      z-index: -1;
    }
    .le {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 50px;

      .a1,
      .album-pic {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid;
      }

      .a1 {
        width: 310px;
        height: 310px;
        animation: albumscale 1.5s linear infinite alternate;
      }

      .album-pic {
        width: 300px;
        height: 300px;
        border: 0;
        overflow: hidden;
        animation: albumrotate 36s linear infinite;
      }
      //  旋转动画
      @keyframes albumrotate {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes albumscale {
        0% {
          border-color: rgba(128, 0, 128, 0);
        }
        25% {
          width: 320px;
          height: 320px;
          border-color: rgba(128, 0, 128, 0.1);
        }
        50% {
          width: 330px;
          height: 330px;
          border-color: rgba(128, 0, 128, 0.5);
        }
        100% {
          width: 360px;
          height: 360px;
          border-color: rgba(128, 0, 128, 0.1);
        }
      }
    }
    .ri {
      flex: 1;
      max-width: 50%;
      display: flex;
      flex-direction: column;
      padding: 20px 0 10px 20px;
      span {
        flex: 1;
      }
      .ri-three {
        display: flex;
        span {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 5px;
        }
      }
      .lyric {
        position: relative;
        flex: unset;
        height: 360px;

        overflow: auto;
      }
    }
  }
  // 喜欢收藏 操作按钮
  .action{
    padding: 0 70px;
     span {
          padding: 0 10px;
        }
  }

  // 评论区
  .comment{
    height: 300px;
    display: flex;
    .le{
      flex: 3;

    }
    .ri{
      flex: 2;
      .same-palylist{
        padding-left: 50px;
      .slot-content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2px 10px;
        line-height: unset;
        span{
          line-height: normal;
        }

      }

      }

    }

  }
}

</style>
