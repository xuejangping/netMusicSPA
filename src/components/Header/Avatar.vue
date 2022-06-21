<template>
  <div class="avatar">
    <el-avatar :src="userdata.avatarUrl" :size="size"></el-avatar>
    <!-- 用户姓名 -->
    <label @click.stop="change"
      ><span class="username">{{ userdata.nickname?userdata.nickname:'未登录' }}</span>
      <i class="el-icon-caret-bottom" ></i
    ></label>

    <UserInfoCard v-if="userInfoCardState"
    :userdata=userdata

    @logOut="userInfoCardState=false"

    ></UserInfoCard>
  </div>
</template>

<script>
import UserInfoCard from '@/components/Header/UserInfo-card.vue'
export default {
  data () {
    return {
      // 头像尺寸
      size: 'medium',

      // 用户信息卡片，用户登录成功后可用
      userInfoCardState: false
    }
  },
  components: {
    UserInfoCard
  },
  methods: {
    // 头像区域点击事件，若登录状态loginState为FALSE则告知App组件打开Login登录卡片，
    // 若为true则打开当前组件下的userInfoCard卡片
    change () {
      if (this.loginState) {
        this.userInfoCardState = true
      } else {
        this.$emit('showCard')
      }
    },

    test () {
      console.log('测试')
    }
  },
  created () {
    // 页面绑定点击事件，关闭userInfoCard卡片，当前Avatar组件需要阻止冒泡，才能正常打开userInfoCard卡片
    document.addEventListener('click', () => {
      this.userInfoCardState = false
    })
  },
  // 用户信息区域
  props: {
    userdata: {
      type: Object,
      default: function () {
        return {
          uname: '未登录',
          age: '0',
          src: ''
        }
      },
      require: true
    },
    loginState: {
      type: Boolean,
      default: false
    },
    // 头像区域点击事件
    click: {}
  }
}
</script>

<style lang="less" >
.avatar {
  position: relative;
  display: inline-block;
  margin: 0 10px 0 200px;
  line-height: 60px;
  span {
    cursor: pointer;
  }

  vertical-align: middle;
  .el-avatar {
    vertical-align: middle;
    background-color: oldlace;
  }
  .username {
    margin: 0 12px;

  }
  label {
    cursor: pointer;
    color: rgb(248, 240, 240);
  }
  label:hover {
    color: #fff;
  }
}
</style>
