<template>
  <div class="audio-player">

    <audio :src="activeSrc"  autoplay id="audio"></audio>
     <!-- 播放按钮控制区域 -->
    <div class="le" style="flex:1">
      <span class="pre" @click="prev"><i class="iconfont icon-bofangqi-pre"></i>
      </span><span class="play" @click="playBtnChange">
         <i v-if="paused" class="el-icon-caret-right"></i>
         <i v-else class="iconfont icon-pause pause-btn"></i></span>
      <span class="next" @click="next"><i class="iconfont icon-bofangqi-next"></i></span>

    </div>
    <!-- 播放进度条 -->
     <div class="mid" style="flex:3">
       <span class="start-time">{{currenttime|timeFormat}}</span>
        <span style="flex:1"><Progress :width="'100%'"
         :percentage="playPercentage"
         @input="adjustAudioTrack"
         ></Progress></span>
        <span class="end-time">{{playingInfo.currentMusic.dt||playingInfo.currentMusic.duration|timeFormat}}</span>
     </div>
     <!-- 音量等控制区域 -->
      <div class="ri" style="flex:1.5">

      <!-- 音量控制 -->

         <i v-if="mute"  class="iconfont icon-bxs-volume"></i>
         <i v-else class="iconfont icon-volume"></i>
       <Progress :width="'100%'"
       :percentage="volumepercentage"
       @input="adjustVol"
       ></Progress>

        <!-- 当前播放列表 -->
        <span class="crtplaylist"  @click.stop="">
          <i class="iconfont  icon-gedan playlistbtn"
          :class="listCardStatu?'lrc-btn-active':''"
          @click="listCardStatu=!listCardStatu"></i>
          <transition name="fade-scale">
            <span class="listcard" v-show="listCardStatu">
            <CurrentPlayList :currentPlayList="currentPlayList"
            @play="e=>{playEvent(e)}"
            ></CurrentPlayList>
          </span>
          </transition>
       </span>
       <!-- 桌面歌词 -->
       <span ><span  @click="desktopLrcState=!desktopLrcState"
       style="padding: 3px;border-radius: 3px;"
       :class="desktopLrcState?'lrc-btn-active':''">歌词</span></span>
       <!-- 歌词窗口 -->
       <!-- InBody组件将插槽内容插入到body中，方便以body来做定位 -->
       <InBody>
         <div class="desktoplrc" ref="desktoplrc" @mousedown="$diy.move($event,$refs.desktoplrc)" @mouseenter="desktopLrcCloseBtn=true"
         @mouseleave="desktopLrcCloseBtn=false"
          v-if="desktopLrcState">
          <!-- 关闭桌面歌词按钮 -->
           <span style="position:absolute;right:5px;font-size:35px">
             <i class="el-icon-close" v-show="desktopLrcCloseBtn" @click="desktopLrcState=false"></i>
           </span>
           <!-- 歌词文本 -->
           <span class="lrctext"
           :style="`background-image:linear-gradient(to right,#e4ffc3 ${percentage}%,#fff ${percentage}%);`" >
           {{ currentLineLrc}}</span>
         </div>

       </InBody>

      </div>

  </div>
</template>

<script>
// import { m } from '@/tools/comMethods'
import bus from '@/tools/eventBus'
import Progress from '@/components/common/Progress.vue'
import CurrentPlayList from '@/components/Footer/CurrentPlayList.vue'
import InBody from '../common/InBody.vue'

export default {

  name: 'Player',
  data () {
    return {
      percentage: 0,
      // 桌面歌词当前内容
      currentLineLrc: '浮生浪迹笑明月，千愁散尽一剑轻',
      // 当前歌词持续时间
      currentLineLrcDt: null,
      // 歌词窗口状态
      desktopLrcState: false,
      // 歌词窗口关闭按钮
      desktopLrcCloseBtn: false,
      // 当前播放列表状态
      listCardStatu: false,
      // audioDom元素
      audio: null,
      activeSrc: '',
      // 当前播放列表
      currentPlayList: [],

      // 储存在localStorage的音乐播放信息
      playingInfo: {},
      // 暂停状态，控制播放页动画暂停
      paused: true,
      // 监听当前播放时间
      currenttime: null,
      // 音量百分比
      volumepercentage: 10,
      mute: false,
      startX: 0,
      startY: 0
    }
  },
  props: {

  },
  computed: {
    playPercentage () {
      const currentMusic = this.playingInfo.currentMusic
      const dt = currentMusic.dt || currentMusic.duration
      return this.currenttime * 100 / dt
    }

  },
  components: { Progress, CurrentPlayList, InBody },
  methods: {
    // 当前播放中的音乐索引
    activeIndex () {
      return this.currentPlayList.indexOf(this.playingInfo.currentMusic)
    },
    // 上一曲
    prev (e) {
      if (this.activeIndex() - 1 < 0) return this.$Toast({ message: '没有上一首了', icon: 'cross' })
      this.playEvent(this.currentPlayList[this.activeIndex() - 1])
    },
    // 下一曲
    next (e) {
      if (this.activeIndex() + 1 > this.currentPlayList.length - 1) return this.$Toast.fail('已经是最后一首了')
      this.playEvent(this.currentPlayList[this.activeIndex() + 1])
    },

    // 请求歌曲Url
    getSongUrl (musicId, br, pause) {
      this.$axios.get('/song/url', { params: { id: musicId, br: br } }).then(res => {
        this.activeSrc = res.data.data[0].url
        if (pause) { this.audio.autoplay = false } else { this.audio.autoplay = true }
      })
    },
    // 根据记录信息初始化播放器
    initPlayer () {
      // 读取上次储存的播放信息，初始化播放窗口

      this.activeSrc = this.playingInfo.currentSrc
      this.audio.autoplay = false
      this.currentPlayList = this.playingInfo.currentPlayList

      bus.$emit('shareMusicInfo', [this.playingInfo.currentMusic, 0])
      this.audio.volume = this.playingInfo.currentVolume
      this.volumepercentage = this.playingInfo.currentVolume * 100
      this.audio.currentTime = this.playingInfo.currentTime
    },
    // 设置当前播放信息到本地储存
    setPlayingInfo () {
      const audio = document.querySelector('#audio')
      this.playingInfo.currentTime = audio.currentTime
      this.playingInfo.currentVolume = audio.volume
      this.playingInfo.currentSrc = this.activeSrc
      this.playingInfo.currentPlayList = this.currentPlayList

      localStorage.setItem('playingInfo', JSON.stringify(this.playingInfo))
    },
    // 播放按钮
    playBtnChange () {
      this.paused = !this.audio.paused
      this.audio.paused ? this.audio.play() : this.audio.pause()
    },
    // 播放事件
    playEvent (e) {
      this.paused = false

      // 接收歌曲信息,并请求歌曲Url
      this.getSongUrl(e.id)
      this.playingInfo.currentMusic = e
      // 发送信息到播放play-view,第二项1
      bus.$emit('shareMusicInfo', [e, 1])
    },
    // 调整播放进度
    adjustAudioTrack (e) {
      this.audio.currentTime = e / 100 * this.playingInfo.currentMusic.dt / 1000
    },
    // 调整音量
    adjustVol (e) {
      this.mute = parseFloat(e) === 0
      this.volumepercentage = e
      this.audio.volume = e / 100
    }

  },

  watch: {
    currentLineLrcDt () {
      // 当下一句歌词时，重置歌词渐变百分比
      this.percentage = 0
    },
    // 判断歌曲播放结束
    currenttime () {
      if (this.currenttime / (this.audio.duration * 1000) >= 0.9999) {
        this.paused = true
        this.currentLineLrc = '可爱软萌徐敏静'
        const a = this.currentPlayList.indexOf(this.playingInfo.currentMusic) + 1
        // 当歌曲播放结束时，若播放列表不为空，则继续播放下一首
        if (this.currentPlayList.length && a <= this.currentPlayList.length - 1) {
          this.playEvent(this.currentPlayList[a])
          this.currentLineLrc = this.currentPlayList[a].name + `--${this.currentPlayList[a].ar[0].name}`
        }
      }
    },
    // 监听播放暂停状态，控制播放页的旋转动画
    paused () {
      bus.$emit('paused', this.paused)
    }

  },
  created () {
    // 绑定播放歌曲事件
    bus.$on('play', e => {
      //  保存当前播放歌曲信息
      if (e.song) e = e.song
      // 去重后将当前点击的歌曲加入播放列表
      const index = this.activeIndex()
      if (this.currentPlayList.indexOf(e) === -1) this.currentPlayList.splice(index, 0, e)

      this.playEvent(e)
    })
    // 读取上次离开时音乐数据
    if (localStorage.getItem('playingInfo')) this.playingInfo = JSON.parse(localStorage.getItem('playingInfo'))
    // 给窗口绑定离开时储存当前播放音乐信息
    window.onunload = () => this.setPlayingInfo()
    // 添加歌单到播放列表
    bus.$on('sharePlayListInfo', e => {
      if (e) {
        this.currentPlayList = e
        this.playEvent(e[0])
        this.$Toast({ message: '已添加到当前播放列表', icon: 'success' })
      }
    })
    // 接收playWindow组件中得到的当前行歌词，展示到桌面歌词中
    bus.$on('currentLineLrc', e => { this.currentLineLrc = e[0]; this.currentLineLrcDt = e[1] })
  },

  mounted () {
    document.onclick = () => { this.listCardStatu = false }
    this.audio = this.$el.querySelector('audio')
    // // 根据记录信息初始化播放器
    this.initPlayer()
    // 绑定播放时间更新自定义事件,timeupdate更新每次约350ms,所以当前歌词时间/350s可得到当前歌词期间更新次数，
    // 渐变总百分比 100/次数得到每次timeupdate时间时应该变化的百分比
    this.audio.addEventListener('timeupdate', e => {
      this.percentage += 100 / (this.currentLineLrcDt * 1000 / 350)
      bus.$emit('timeupdate', e.target.currentTime)
      this.currenttime = e.target.currentTime * 1000
    })
  }
}
</script>

<style lang="less" scoped >
.lrc-btn-active{
  background: #666666;
  color: #fff;

}
// 歌词文本
.lrctext{
    margin:auto;
    white-space: nowrap;
    max-width: 1000px;
    background-clip: text;
    color:transparent;
    overflow: hidden;

}
.desktoplrc{

  display: flex;
  position: absolute;
  top:70% ;
  left: 50%;
  transform: translate(-50%,-50%);
  min-width: 800px;

  min-height: 120px;
  padding: 0 50px;
  transition: background 1s;
  font-size: 50px;
  color: #fff;
  font-weight: 600;
  user-select: none;
  // 文字边框

  -webkit-text-stroke: 1px #000;

}
.desktoplrc:hover{
background: rgba(0, 0, 0, .2);
border:1px solid #858282;
}

::-webkit-scrollbar{
  width: 0;
}

// 当前播放列表过渡效果
.fade-scale-enter{
   perspective: 400px;
   transform-style: preserve-3d;
  transform: translateX(140px)  scale(0);
}
.fade-scale-enter-active{
  transition: all .6s ease-in-out;
  transform-origin: bottom;
}

.fade-scale-leave-active{
  transform:translateX(140px) scale(0);
  transform-origin: bottom ;
  transition: all .6s ;

}

.audio-player{
  display: flex;
  div{
    margin:0 5px;
  }
  .le{
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .next,.pre,.play{
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #d33030;
      vertical-align: middle;
      line-height: 40px;
      text-align: center ;
      color: #fff;
    }

     .play{
      width: 45px;
      height: 45px;
      font-size: 33px;
      line-height: 45px;
      .pause-btn{
        font-size: 33px;
      }
    }

  }
  .mid{
    display: flex;
    .start-time,.end-time{
      padding: 0 10px;
      line-height: 65px;
    }
  }
  .ri{
    display: flex;
    >span{
      padding:0 20px;
    }
    .crtplaylist{
      .playlistbtn{
        font-size: 26px;
        border-radius: 3px;
      }
      position: relative;
      .listcard{
        position: absolute;
        z-index: 3;
        top: -500px;
        left: -409px;
        width: 620px;
        height: 500px;
        background: rgb(245, 245, 237);

        overflow: auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
      }
    }
    i{

      line-height:65px
    }
  }

}

</style>
