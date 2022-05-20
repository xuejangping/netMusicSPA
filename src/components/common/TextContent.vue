<template>
  <div>
    <div class="describle" >
      <h4>{{title}}</h4>
      <p v-html="text"></p>
    </div>
  </div>

</template>

<script>
// import Tabs from '@/components/common/Tabs.vue'
export default {
  data () {
    return {

    }
  },
  props: {
    title: {
      default: '介绍'
    },
    text: {
      default: '文本内容'
    }

  }
}

</script>

<style lang="less" scoped>
.describle{
  text-align: left;
  padding: 20px;
  line-height: 2em;
  p{
  text-indent: 2em;
  color: #666666;
}

}

</style>
