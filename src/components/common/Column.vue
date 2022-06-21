<template>
    <div class="column">
      <span style="float: left; font-size: 18px">{{ltext }}</span>
      <span style="float: right; font-size: 15px" @click="click"
        >{{ rtext}} <i class="el-icon-arrow-right"></i
      ></span>
    </div>

</template>

<script>
export default {
  props: {
    ltext: {
      default: '推荐歌单'
    },
    rtext: {
      default: '更多'
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style>
.column{
  line-height: 50px;
  height: 50px;
  margin-top: 20px;
 border-bottom: 1px solid pink;
}
</style>
