<template>
  <div v-if="describle">
    <!-- 简介 -->
    <TextContent
    :title="`${singerName}简介`"
    :text="describle.briefDesc"
    ></TextContent>
    <!-- 介绍 -->
    <TextContent
    v-for="(item, index) in describle.introduction" :key="index"
    :title="item.ti"
    :text="item.txt.replace(/\n/g,'<br>')"
    ></TextContent>

  </div>

</template>

<script>
import TextContent from '@/components/common/TextContent.vue'
export default {
  data () {
    return {

      describle: null

    }
  },
  props: {
    singerId: {},
    singerName: {}
  },
  components: { TextContent },
  methods: {
    getSingerDescrible (singerId) {
      this.$axios.get('/artist/desc', { params: { id: singerId } }).then(res => {
        this.describle = res.data
      })
    }

  },
  created () {
    this.getSingerDescrible(this.singerId)
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
