/* eslint-disable no-unused-vars */
<template>
  <div id="music-app">
    <!-- 4角定位 -->
    <div>
      <span class="resize" v-for="(item, index) in 4" :key="index"
    :style="`${index%2===0?'left':'right'}:0;${index<=1?'top':'bottom'}:0;cursor: ${index===0||index===3?'nw-resize':'ne-resize'};`"
    @mousedown.stop="test(index,$event)"
    ></span>
    </div>
    <el-container>
      <!-- 头部header区域 -->
      <el-header>
       <div class="header" @mousedown.left="$diy.move($event,$el)" >
          <!-- logo制作 -->
        <div style="flex:1" class="logo" >
          <label @click="initPage" for=""><i class="el-icon-headset"></i><span>网易云音乐</span></label>
        </div>
        <!-- 前进后退按钮 -->
        <div style="display:flex;flex:2">
          <BackForward></BackForward>
        <!-- 搜索模块 -->
          <Search @closeWindow="PlayWindowState=false" > </Search>
        </div>
        <!-- 头像用户信息区 -->
        <!-- 只有登录验证成功后才会触发事件loginSuccess -->
        <!-- 将请求到的用户数据和当前登录的状态发送给Avatar组件 -->
         <div style="flex:3">
           <Avatar
         @showCard="loginCard=true"
         :userdata="userdata"
         :loginState="loginState"
         ></Avatar>
         <!-- 登录页面 -->
        <Login v-show="loginCard"
         @close="loginCard=false"
         @loginSuccess="loginSuccess"
        ></Login>
         </div>
       </div>

      </el-header>

      <!-- 中间内容区 -->
      <el-container id="main" >

        <!-- 左边栏 -->
        <el-aside width="250px" >

           <div id="aside">
              <Recomend :userplaylist="userplaylist" ></Recomend>
             <Playwindowmini @click="PlayWindowState=true"></Playwindowmini>
           </div>

        </el-aside>
        <!-- 右边内容区 -->
        <el-main  style="overflow:auto;">
          <!-- 路由视口 -->
          <i v-if="loadingState" class="el-icon-loading" style="font-size: 40px"></i>
          <router-view v-show="!loadingState"></router-view>
        </el-main>
        <!-- 播放页窗口 -->
        <transition name="fade" >
        <PlayWindow v-show="PlayWindowState" @closeWindow="PlayWindowState=false"></PlayWindow>
        </transition>
      </el-container>

      <!-- 播放控制区 -->
      <el-footer>
        <MusicPlayer></MusicPlayer>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import BackForward from './components/Header/Back-Forward.vue'
import Search from './components/Header/Search.vue'
import bus from '@/tools/eventBus'
// eslint-disable-next-line no-unused-vars
import Avatar from '@/components/Header/Avatar.vue'
// eslint-disable-next-line no-unused-vars
import Login from '@/components/Header/Login.vue'
import Recomend from '@/components/Aside/Recomend.vue'
import Playwindowmini from '@/components/Aside/Playwindow-mini.vue'
import PlayWindow from '@/components/Main/PlayWindow.vue'
import MusicPlayer from '@/components/Footer/MusicPlayer.vue'

export default {
  name: 'App',
  data () {
    return {

      loadingState: false,
      // 用户登录状态，已登录或未登录
      loginState: false,
      // 登录卡片状态
      loginCard: false,

      // 请求到的用户数据
      userdata: {},
      userplaylist: null,
      PlayWindowState: false

    }
  },
  watch: {
    loginState () {
      bus.$emit('loginStateChange', this.loginState)
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Search, BackForward, Avatar, Login, Recomend, MusicPlayer, Playwindowmini, PlayWindow
  },
  methods: {
    test (index, e) {
      if (index !== 3) return
      const hbox = this.$el.querySelector('#main')
      const wbox = this.$el
      let startX = e.pageX
      let startY = e.pageY
      document.addEventListener('mousemove', resize)
      document.addEventListener('mouseup', () => document.removeEventListener('mousemove', resize))
      function resize (e) {
        wbox.style.width = e.pageX - startX + wbox.offsetWidth + 'px'
        hbox.style.height = e.pageY - startY + hbox.offsetHeight + 'px'
        startX = e.pageX
        startY = e.pageY
      }

      //   if (index === 3) {

    //     this.$diy.move(e, this.$el, 0.5)
    //   }
    //   console.log(index)
    },

    // 登录验证成功。关闭登录卡片，更改用户登录状态为true,且将请求的用户数据存入userdata中
    loginSuccess (e) {
      this.loginState = true
      this.loginCard = false
      this.userdata = e
      this.getUserPlaylists(e.userId)
    },
    // 根据用户id请求用户歌单
    getUserPlaylists (uid) {
      this.$axios.get('/user/playlist', { params: { uid: uid } }).then(res => { this.userplaylist = res.data.playlist })
    },
    initPage () {
      if (this.$route.path === '/discover') return
      this.$router.push('/discover')
    }
  },
  created () {
    // 退出登录事件
    bus.$on('logOut', () => {
      this.loginState = false
      this.userdata = {}
      localStorage.setItem('token', '')
    })
    // 刷新页面后展示第一个发现音乐界面
    // this.initPage()
    // 默认展示我自己的歌单
    this.getUserPlaylists(295065835)
    // 给路由to绑定加载动画
    bus.$on('loadingAnimate', this.$diy.loading.bind(this, 800))
  },
  mounted () {
    // 阻止界面右键菜单
    document.addEventListener('contextmenu', e => e.preventDefault())
  }
}
</script>

<style lang="less" type="text/css" scoped>
#music-app {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1350px;
  min-width: 1180px;
  max-width: 1600px;

  transform: translate(-50%, -50%);
  user-select: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .resize{
    position: absolute;
    width: 15px;
    height: 15px;

  }
}
// 头部logo
.logo{
  display: inline-block;
  color: #fff;
  font-size: 20px;
  span{
    margin: 0 20px;
    font-weight: 700;
  }
}

.el-header,
.el-footer {
  background-color: #233d5f;
  color: #333;
  line-height: 60px;

}
.header{
  display: flex;
}
.el-footer{
  background: #f6f6f8;
  padding: 0 5px;
}
.el-aside {
  position: relative;
  background-color: #eaedf1;
  color: #333;
}
#aside{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#main{
  position: relative;
   height: 750px;
   min-height: 660px;
}

.el-main {

  background-color: rgba(255,255,255 1);
  color: #333;
  text-align: center;
  line-height: 100px;

}

body > .el-container {
  margin-bottom: 40px;
  margin: 50px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;

}

// 过渡动画
.fade-enter{
transform-origin: left bottom;
   transform: scale(.001);

  }

.fade-enter-active{
  transition: all .5s ease-in-out;
}
.fade-leave-active{
  transition: all .5s ease-in-out;
  transform: scale(.001);
  transform-origin: left bottom;
}
</style>
