<template>
  <div id="video" style="line-height: 35px">
    <div class="container" style="margin: 0 auto; ">
      <!-- 左边视频播放区 -->
      <div class="left">
        <!-- 标题 -->
        <div>
          <span class="title" @click="$router.back()"
            ><i class="el-icon-arrow-left"></i>
            <span
              v-if="!parseInt(type)"
              style="
                border: 1px solid red;
                color: red;
                padding: 0 3px;
                font-size: 16px;
              "
              >MV</span
            >
            <span style="padding: 0 8px">{{
              videoData.name
                ? videoData.name
                : videoData.title
                ? videoData.title
                : ""
            }}</span>
          </span>
          <!-- 作者 -->
          <span class="gray">{{
            videoData.artistName
              ? videoData.artistName
              : videoData.creator
              ? videoData.creator.nickname
              : ""
          }}</span>
        </div>
        <!-- 视频播放器 -->
        <div style="width: 690px; background: #000000" class="video-container">
          <video id="video-track" :src="vUrl" @click="play"></video>
          <!-- 播放控制区 -->
          <div style="background-color: #111111; margin-top: -30px">
            <!-- 播放进度条 -->
            <div style="text-align: center">
              <Progress
                :percentage="trackPercentage"
                :inline="true"
                :width="'685px'"
                @input="adjustTrack"
              ></Progress>
            </div>
            <div class="controller">
              <!-- 播放，暂停 按钮 -->
              <span
                class="play"
                @click="play"
                style="font-size: 30px; vertical-align: middle"
                ><i class="el-icon-video-play" v-if="playState"></i>
                <i class="el-icon-video-pause" v-else></i
              ></span>
              <!-- 播放时间 -->
              <span class="curtime"
                ><span>{{ curtimeFormat }}</span
                ><span>/</span>
                <span>{{
                  videoData.duration
                    ? videoData.duration
                    : videoData.durationms | timeFormat
                }}</span></span
              >
              <div style="float: right; padding: 0 10px">
                <!-- 音量控制 -->
                <span class="padding" style="border: 0"
                  >V<i class="el-icon-pear"></i>L</span
                >

                <span style="padding: 0 8px">
                  <Progress
                    :inline="true"
                    :percentage="volPercentage"
                    :width="'120px'"
                    @input="adjustVol"
                  ></Progress>
                </span>
                <!-- 全屏按钮 -->
                <span class="padding" @click="fullScreen">
                  F<i class="el-icon-apple"></i>LL</span
                >
              </div>
            </div>
          </div>
        </div>
        <!-- 操作按钮，点赞，收藏 -->
        <div style="padding: 20px 0">
          <el-button size="small" icon="good-job-o">
            <span style="padding: 0 2px 0 0"
              ><van-icon name="good-job-o"
            /></span>
            赞({{ videoData.price }})
          </el-button>
          <el-button size="small" icon="el-icon-folder-add"
            >收藏({{ videoData.subCount }})</el-button
          >
          <el-button size="small" icon="el-icon-share"
            >分享({{ videoData.shareCount }})</el-button
          >
          <el-button size="small" icon="el-icon-download" v-if="!-type"
            >下载MV</el-button
          >
        </div>
        <!-- 评论区 -->
        <!-- 输入框 -->
        <Comment
          v-if="comments.hotComments && comments.hotComments.length"
          :content="false"
          :commentCount="comments.total"
          :title="'精彩评论'"
          @comment="comment"
        ></Comment>
        <!-- 热评 -->
        <Comment
          v-for="(item, index) in comments.hotComments"
          :key="index"
          :header="false"
          :gradient="index % 2 === 0 ? false : true"
          :avaSrc="item.user.avatarUrl"
          :uname="item.user.nickname"
          :text="item.content"
          :time="item.time"
          :praise="item.likedCount"
        ></Comment>
        <!-- 最新评论 -->
        <Comment
          :header="false"
          :content="false"
          :title="`最新评论(${comments.total})`"
        ></Comment>
        <Comment
          v-for="(item, index2) in comments.comments"
          :key="index2 + 'a'"
          :header="false"
          :avaSrc="item.user.avatarUrl"
          :uname="item.user.nickname"
          :text="item.content"
          :time="item.time"
          :praise="item.likedCount"
        ></Comment>
      </div>
      <!-- 右边栏部分 -->
      <div class="right">
        <div class="title">{{ type === 1 ? "视频" : "MV" + "介绍" }}</div>
        <div class="gray">
          <span
            >发布时间:
            {{
              typeof videoData.publishTime === "string"
                ? videoData.publishTime
                : videoData.publishTime | dateFormat
            }}</span
          >
          <span style="padding-left: 15px"
            >播放次数：{{
              videoData.playCount
                ? playCountFormat(videoData.playCount)
                : videoData.playTime
                ? playCountFormat(videoData.playTime)
                : ""
            }}</span
          >
        </div>

        <div class="content" style="min-height: 100px">
          <div
            v-if="videoData.videoGroup ? videoData.videoGroup.length : false"
          >
            标签：
            <router-link
              to=""
              v-for="(item, index) in videoData.videoGroup"
              :key="index"
              >{{ index > 0 ? "/" + item.name : item.name }}</router-link
            >
          </div>
          <div v-if="videoData.description || videoData.desc">
            简介：{{ videoData.description || videoData.desc }}
          </div>
        </div>
        <!-- 相关推荐 -->
        <div class="title">{{ "相关推荐" }}</div>
        <div
          style="display: flex; height: 110px; margin: 10px 0"
          v-for="(item, index) in relatedVideo"
          :key="index"
          @click="initPage(item.type, item.vid)"
        >
          <!-- 推荐栏视频封面 -->
          <span style="">
            <Card
              :src="item.coverUrl"
              :count="item ? item.playTime : 0"
              :icon="'video-camera'"
              :video="'video'"
              :bottomState="false"
            ></Card>
          </span>
          <span class="between" style=";line-height: 20px; padding: 3px 5px">
            <!-- 推荐视频标题 -->
            <div style="color: #333333">
              <span>{{ item.title }}</span>
            </div>
            <div class="gray">
              <!-- 推荐视频时间 -->
              <div>
                <span>{{ item.durationms | timeFormat }}</span>
              </div>
              <!-- 推荐视频作者 -->
              <div>
                <span v-for="(item, index) in item.creator" :key="index">{{
                  index > 0 ? "/" + item.userName : item.userName
                }}</span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import bus from '@/tools/eventBus.js'
import Card from '@/components/common/Card.vue'
import Progress from '@/components/common/Progress.vue'
import Comment from '@/components/common/Comment.vue'

export default {
  components: {
    Card,
    Progress,
    Comment
  },
  data () {
    return {
      videoData: {},
      relatedVideo: [],
      vUrl: '',
      playState: true,
      // 歌曲当前播放时间
      curtime: '',
      // 声音百分比
      volPercentage: 50,
      fullScreenState: false,
      // 评论数据
      comments: {}
    }
  },
  props: {
    vid: {
      default: ''
    },
    // 1 视频 ; 0 MV
    type: {}
  },
  computed: {
    // 动态格式化当前播放时间
    curtimeFormat () {
      const m = Math.floor(this.curtime / 60)
        .toString()
        .padStart(2, '0')
      const s = Math.floor(this.curtime % 60)
        .toString()
        .padStart(2, '0')
      return m + ':' + s
    },
    trackPercentage () {
      const totaltime = this.videoData.duration
        ? this.videoData.duration
        : this.videoData.durationms
          ? this.videoData.durationms
          : ''
      if (!this.curtime) return 0
      const a = (this.curtime * 1000) / totaltime
      return a * 100
    }
  },
  methods: {

    // 格式化播放次数
    playCountFormat (count) {
      return count.toString().length > 4
        ? (count / 10000).toFixed() + '万次'
        : count + '次'
    },
    // 获取视频详细信息
    getVideoInfo (vid) {
      this.$diy.getVideoInfo(vid).then((res) => {
        this.videoData = res.data

        // this.vUrl = res.data.url
      })
    },
    // 获取视频详Url
    getVideoUrl (vid) {
      this.$diy.getVideoUrl(vid).then((res) => {
        if (res.urls) this.vUrl = res.urls[0].url
      })
    },
    // 获取相关推荐
    getRelatedVideo (vid) {
      this.$axios
        .get('/related/allvideo', { params: { id: vid } })
        .then((res) => {
          this.relatedVideo = res.data.data
        })
    },
    // 获取MV详细信息
    getMVInfo (vid) {
      this.$diy.getMVInfo(vid).then((res) => {
        this.videoData = res.data
      })
    },

    // 获取Mv Url
    getMVUrl (vid) {
      this.$diy.getMVUrl(vid).then((res) => {
        this.vUrl = res.data.url
      })
    },
    // 获取评论
    getComments (type, id, limit, offset) {
      this.$diy.getComments(type, id, limit, offset).then((res) => {
        if (res) this.comments = res
      })
    },
    // 获取热评
    getHotComments (type, id, limit, offset) {
      this.$diy.getHotComments(type, id, limit, offset).then((res) => {
        if (res) console.log(res)
      })
    },
    // 发表评论
    async comment (input) {
      // 查询登录状态
      const { data: res } = await this.$axios.get('/login/status')

      if (res.data.account) {
        // MV 评论的type是1，视频评论的type是5
        const type = this.type === 0 ? 1 : 5
        this.$diy
          .submitComment(1, type, this.vid, input)
          .then((res) => console.log(res))

        this.$Toast.success('评论成功了')
      } else {
        this.$Toast({ message: '还没有登录哦', icon: 'warning' })
      }
    },
    // --------------------------------------------------------------
    // 读取当前播放时间
    getVideoTrack () {
      const track = document.querySelector('#video-track')

      track.addEventListener('timeupdate', () => {
        this.curtime = track.currentTime
      })
    },
    // 播放控制
    play () {
      if (document.fullscreen) return
      const track = document.querySelector('#video-track')

      if (track.paused) {
        track.play()
      } else {
        track.pause()
      }
    },
    // 音量控制
    adjustVol (e) {
      const track = document.querySelector('#video-track')
      this.volPercentage = e

      track.volume = e / 100
    },
    // 播放进度控制
    adjustTrack (e) {
      const track = document.querySelector('#video-track')
      track.currentTime = (e / 100) * track.duration
    },
    // 全屏
    fullScreen () {
      document.querySelector('#video-track').requestFullscreen()
      // document.querySelector('.video-container').requestFullscreen()
    },
    // 初始化页面数据
    initPage (type, vid) {
      // 判断是MV还是普通Video，执行对应的请求
      if (parseInt(type)) {
        this.getVideoInfo(vid)
        this.getVideoUrl(vid)
        // 请求评论

        this.getComments('video', vid)
      } else {
        this.getMVInfo(vid)
        this.getMVUrl(vid)
        // 请求评论

        this.getComments('mv', vid)
      }
      // 请求相关视频
      this.getRelatedVideo(vid)
    }
  },
  created () {
    // 初始化页面
    this.initPage(this.type, this.vid)
  },
  mounted () {
    // 获取视频播放时间
    this.getVideoTrack()
    // 设置视频初始音量
    document.querySelector('#video-track').volume = this.volPercentage / 100
    // 监听播放和暂停事件，同步palyState状态
    document.querySelector('#video-track').addEventListener('pause', () => {
      this.playState = true
    })
    document.querySelector('#video-track').addEventListener('play', () => {
      this.playState = false
    })
  },
  beforeDestroy () {}
}
</script>

<style lang="less"  scoped>
.container{
  display: flex;
}
.between{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.gray {
  color: #949494;
  font-size: 13px;
}
.padding {
  padding: 1 5px;
  border-left: 1px solid #9a9c9d;
}

.content {
  color: #666666;
}
/deep/.card img {
  height: 90px !important;
}
/deep/.card .cover {
  width: 180px !important;
}
// video标签
.controller {
  background: linear-gradient(to left, #333, #0f0f0f);
  span {
    transition: all 0.5s;
  }
  span:hover {
    color: #fff;
  }
}
#video {
  position: absolute;
  left: 0px;
  padding: 30px;
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin-top: -20px;
  background: #fff;
  text-align: left;
  z-index: 1;
  .left {
    padding-right: 30px;
    .title {
      font-size: 22px;
    }
    button {
      color: #333333;
      font-size: 16px;
    }
  }
  // 右边推荐部分
  .right {

    line-height: 25px;

    .title {
      font-size: 18px;
      border-bottom: 1px solid #e1e1e2;
    }
  }
}
// 视频video标签
#video-track {
  width: 690px;
  height: 390px;
}
// 控制器部分
.controller {
  padding: 0 10px;
  color: #989a9b;
  line-height: 40px;
  height: 40px;
  margin-top: -12px;
  text-align: left;

  .curtime {
    font-size: 15px;
    padding: 0 10px;
    span {
      padding: 2px;
    }
  }
}
</style>
