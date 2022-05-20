/* eslint-disable vue/no-parsing-error */
<template>
  <div class="login" @mousedown.left.stop="$diy.move($event,$el)" >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <!-- 返回登录按钮 -->
        <el-button
        v-if="!loginINfoState"
          style="float: left; padding:10px;"
          type="text"
          @click="toLogin">
         <span style="font-size:18px"> <van-icon name="arrow-left"/> <span>返回登录</span></span>
          </el-button>
 <!-- 关闭登录卡片按钮 -->
        <el-button
          style="float: right; padding:10px"
          type="text"
          @click="closeCard"
          ><van-icon name="cross" size="18px"
        /></el-button>
<!-- <img src="@/assets/uploader/今朝.jpg" alt=""> -->
        <img src="@/assets/uploader/今朝.jpg" alt="" v-show="loginINfoState">
        <img src="@/assets/uploader/明绣.jpg" alt="" v-show="!loginINfoState">
      </div>

      <!-- 登录框 -->
      <LoginInfo
      v-if="loginINfoState"
        placeholder1="请输入手机号"
        placeholder2="请输入密码"
        @shareTel="
          (val) => {
            tel = val;
          }
        "
        @sharePsd="
          (val) => {
            password = val;
          }
        "
        @checkState="
          (val) => {
            checkState = val;
          }
        "
        reg1="/^[0-9]{11}$/"
        reg2="/^[a-zA-Z]\w{5,17}$/"
        :click="login"
        :reset="test"
        :regist="toRegist"
        @itemChecked="itemCheckedChange"

      ></LoginInfo>

       <!-- 注册框 -->
      <LoginInfo
        v-else
        placeholder1="请输入手机号"
        placeholder2="设置登录密码，不少于6位"
        @shareTel="
          (val) => {
            tel = val;
          }
        "
        @sharePsd="
          (val) => {
            password = val;
          }
        "
        reg1="/^[0-9]{11}$/"
        reg2="/^[a-zA-Z]\w{5,17}$/"
        :click="regist"
        :registBox="false"
        :checkbox="false"
        :resetBox="false"
        :itemBox="false"
        btntext="注册"
        :regist="test"
        @itemChecked="itemCheckedChange"
      ></LoginInfo>

    </el-card>
  </div>
</template>

<script>
import LoginInfo from '@/components/common/loginInfo.vue'

export default {

  components: { LoginInfo },
  data () {
    return {
      tel: null,
      password: null,
      // 自动登录状态
      checkState: false,
      // 条款条件状态
      itemChecked: false,
      // 登录界面状态
      loginINfoState: true

    }
  },
  methods: {
    // 点击关闭登录页面
    closeCard () {
      // 将登录界面改为true，确保每次打开界面都在登录页
      this.loginINfoState = true
      this.$emit('close')
    },
    // 若用户勾选自动登录，储存 Token
    setItem (content) {
      if (this.checkState) { localStorage.setItem('token', JSON.stringify(content)) }
    },

    // 登录验证信息
    login () {
      if (this.itemChecked === false) {
        this.$Toast('请勾选同意《服务条款》《隐私条款》《儿童隐私条款》')
        return
      }
      // 模拟登陆验证,账户验证通过，发送请求的数据到App组件渲染，并且设置token下次免登陆
      if (this.tel && this.password) {
        this.$axios('/login/cellphone', {
          params: { phone: this.tel, password: this.password }
        }).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.$emit('loginSuccess', res.data.profile)
            console.log('登录成功了')
          } else {
            console.log('登录失败了')
            this.$Toast.fail('密码或账号不正确')
          }
        }).catch((error) => {
          console.log(error.message) || console.log(error.response) || console.log(error.request)
        })
      } else {
        // 没有收到账号和密码提示格式不正确
        this.$Toast('格式不正确')
      }
    },
    // 切换到注册页面
    toRegist () {
      if (this.itemChecked === false) {
        this.$Toast('请勾选同意《服务条款》《隐私条款》《儿童隐私条款》')
        return
      }
      this.loginINfoState = false
      console.log('切换去注册')
    },
    // 切换到登录页面
    toLogin () {
      this.loginINfoState = true
    },
    // 注册功能
    regist () {
      alert('没了，真没了')
    },
    // 条款条件状态
    itemCheckedChange (e) {
      this.itemChecked = e
    },
    test () {
      console.log('测试')
    },
    // 自动登录函数
    autoLogin () {
      if (
        localStorage.getItem('token') &&
        localStorage.getItem('token') !== ''
      ) {
        // localStorage.getItem('token')
        this.$emit('loginSuccess', JSON.parse(localStorage.getItem('token')))
      }
    }

  },
  created () {
    // 若保留用户自动登录信息，载入时自动登录
    this.autoLogin()
  },
  computed: {

  }

}
</script>

<style lang="less" scope>

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  z-index: 999;

  img {
    width: 100%;
  }
  .el-card__header {
    padding: 0;
  }
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 400px;
  line-height: 50px;
}
</style>
