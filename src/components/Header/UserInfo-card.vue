
<template>
  <div class="userinfo"  @click.stop="">

    <!-- 资料卡片 -->
    <div class="userinfo-card">
      <div>
        <el-avatar
         :src="userdata.avatarUrl"
        ></el-avatar>
        <span class="username">{{userdata.nickname}}
           <i :class="userdata.gender===1? 'el-icon-male':userdata.gender===0?'el-icon-female':''"
           style="color:skyblue"></i>
           </span><el-button size="mini"  @click="check">{{
          checkState
        }}</el-button>
      </div>
      <div class="dongtai" style="overflow:hidden">
        <div >
          <span><b>动态</b></span
          ><span>{{ userdata.eventCount }}</span>
        </div>
        <div >
          <span><b>关注</b></span
          ><span>{{ userdata.follows }}</span>
        </div>
        <div >
          <span><b>粉丝</b></span
          ><span>{{ userdata.followeds }}</span>
        </div>

      </div>
      <div class="set">
        <div style="line-height: 45px">
          <i class="el-icon-s-tools"></i>个人信息设置
        </div>
        <div style="line-height: 45px;height:45px">
          <i class="el-icon-mobile-phone"></i>绑定社交账号
           <i class="el-icon-camera-solid"
            style=" color:gray"
          ></i>
        </div>
        <div  @click="logOut"><i class="el-icon-switch-button"></i>退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/tools/eventBus'
export default {
  data () {
    return {
      checkState: '签到'

    }
  },
  props: {
    userdata: {}
  },
  methods: {
    check () {
      this.checkState = '已签到'
      setTimeout(() => {
        this.checkState = '签到'
      }, 5000)
    },
    // 退出登录
    logOut () {
      this.$axios('/logout').then((res) => {
        if (res.data.code === 200) console.log('退出成功了\n' + res.data)
      }).catch(err => console.log(err))
      // 触发退出登录事件，App组件收到后会更改登录状态为FALSE，且会将当前用户数据清除
      bus.$emit('logOut')
      // 告知父组件Avatar关闭
      this.$emit('logOut')
    }
  }

}
</script>

<style lang="less" scoped>
.userinfo {
  position: absolute;
  top:60px;
  z-index: 10;

  span{
    cursor: pointer;
  }

  vertical-align: middle;
  .el-avatar {
    vertical-align: middle;
  }
  .username {
    margin: 0 10px;
  }
  label {
    color: rgb(236, 231, 231);
  }
  label:hover {
    color: #fff;
  }
}
.userinfo-card {
  width: 300px;

  background-color: #fff;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .username{
  display: inline-block;
  width: 50%;
  }
  .dongtai {
    div {
      box-sizing: border-box;
      float: left;
      width: 33%;

      border-right: 1px solid #ebeef5;
      line-height: 28px;
      span {
        display: block;
        text-align: center;
      }
    }
  }
  // 资料设置
  .set {
    div:hover {
      background-color: #ebeef5;
      cursor: pointer;
    }
    i {
      padding: 0 20px 0 20px;
      font-size: 20px;
    }
  }
}
</style>
