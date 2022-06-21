/* eslint-disable no-eval */
<template>
  <div class="loginBox">
    <!-- 登录框 -->
    <div class="text item">
      <van-cell-group inset>
        <van-field
          v-model="tel"
          :label="label1"
          type="tel"
          :placeholder="placeholder1"
          left-icon="phone-o"
          :right-icon="regState1"
          clickable
        />

        <van-field
          v-model="password"
          :label="label2"
          type="password"
          :placeholder="placeholder2"
          left-icon="lock"
          :right-icon="regState2"
          clickable
        />
      </van-cell-group>
    </div>

    <div style="line-height: 40px">
      <el-checkbox v-model="checked" v-if="checkbox">自动登录</el-checkbox>
      <span style="float: right; font-size: 13px" v-if="resetBox" @click="reset"
        >重设密码</span
      >
    </div>
    <!-- 提交按钮 -->
    <van-button color="#ea4848" round size="large"  @click="click">{{
      btntext
    }}</van-button>
    <div style="text-align: center" v-if="registBox">
      <span @click="regist">注册</span>
    </div>
     <!-- 条款条件,同意才能注册和登录 -->
      <div  style="color:#969696;text-align:center;" v-if="itemBox">
        <el-checkbox v-model="itemChecked">
        <span> 同意</span><a href="#">《服务条款》</a
        ><a href="#">《隐私条款》</a><a href="#">《儿童隐私条款》</a>
      </el-checkbox>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tel: '',
      password: '',
      checked: false,
      regState1: '',
      regState2: '',
      itemChecked: false
    }
  },
  props: {
    placeholder1: {},
    placeholder2: {},
    label1: {},
    label2: {},
    // 输入框正则
    reg1: {},
    reg2: {},
    // 按钮文字
    btntext: {
      default: '登录'
    },
    // 盒子状态
    checkbox: {
      default: true
    },
    registBox: {
      default: true
    },
    resetBox: {
      default: true
    },
    itemBox: {
      default: true
    },
    // 事件
    click: {},
    reset: {},
    regist: {}
  },

  methods: {

  },
  watch: {
    tel () {
      // 通过正则验证则显示正确图标
      // eslint-disable-next-line no-eval
      if (eval(this.reg1).test(this.tel)) {
        this.regState1 = 'passed'
        this.$emit('shareTel', this.tel)
      } else {
        this.regState1 = ''
      }
    },
    password () {
      // eslint-disable-next-line no-eval
      if (eval(this.reg2).test(this.password)) {
        this.regState2 = 'passed'
        this.$emit('sharePsd', this.password)
      } else {
        this.regState2 = ''
      }
    },
    checked () {
      this.$emit('checkState', this.checked)
    },

    // 条款条件状态
    itemChecked () {
      this.$emit('itemChecked', this.itemChecked)
    }

  }
}
</script>

<style lang="less" scoped>
.loginBox {
  .el-checkbox {
    float: left;
  }
  /deep/i {
    font-size: 20px ;
    padding: 0 20px 0 5px;
    margin-left: -20px;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
}
</style>
