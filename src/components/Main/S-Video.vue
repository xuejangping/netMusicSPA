<template>
  <div class="container">
<Card
v-for="(item, index) in videoRes" :key="index"

:video="'video'"
:icon="'video-camera'"
:count="item.playTime"
:src="item.coverUrl"
:time="item.durationms"
@click="toVideo(item.vid,item.type)"
>
<!-- 通过预留的插槽添加数据 -->
<div style="line-height:25px;font-size:14px;text-align:left;padding:0 5px">
  <div class="inline">
    <span v-if="!item.type" style="border:1px solid red;color:red;padding:0 3px;">MV</span> <span >{{item.title}}</span>
  </div>
  <div class="inline">  <span style="color:#888888"  v-for="(item2, index2) in item.creator" :key="index2">{{index2>0?'/'+item2.userName:item2.userName}}</span>
</div>
</div>
</Card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
export default {
  data () {
    return {
      videoRes: {}
    }
  },
  components: {
    Card
  },
  props: {
    keyword: {}
  },
  watch: {
    keyword () {
      this.getVideoData()
    }

  },

  methods: {
    getVideoData (offset, limit) {
      this.$diy.getSearchResult(this.keyword, 1014, offset, limit).then(res => {
        if (res.result) this.videoRes = res.result.videos
      })
    },
    toVideo (vid, type) {
      this.$router.push(`/video/${vid}/${type}`)
    }
  },
  created () {
    this.getVideoData()
  }

}
</script>

<style lang="less" scoped>
.container{
  display: flex;
  flex-wrap: wrap;
}
.inline{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}

</style>
