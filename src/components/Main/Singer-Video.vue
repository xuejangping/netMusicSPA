<template>
  <div>
    <div class="container">

        <Card
      v-for="(item, index) in mvs" :key="index"
      :video="true"
      :src="item.imgurl16v9"
      :count="item.playCount"
      :icon="'video-camera'"
      :time="item.duration"
      :name="item.name"
      :margin="'10px 30px'"
      :imgHeight="'108px'"
      @click="toVideo(item.id)"
      ></Card>

    </div>
  </div>

</template>

<script>
// import Tabs from '@/components/common/Tabs.vue'
import Card from '@/components/common/Card.vue'
export default {
  data () {
    return {
      mvs: []

    }
  },
  props: {
    singerId: {}
  },
  components: { Card },
  methods: {
    // 请求歌手MV信息
    getSingerMV (singId) {
      this.$axios.get('/artist/mv', { params: { id: singId, limit: 20 } }).then(res => {
        this.mvs = res.data.mvs
      })
    },
    // 路由视频页
    toVideo (vid) {
      this.$router.push(`/video/${vid}/0`)
    }

  },
  created () {
    this.getSingerMV(this.singerId)
  }

}
</script>

<style lang="less" scoped>
.container{
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 10px 0;

}

</style>
