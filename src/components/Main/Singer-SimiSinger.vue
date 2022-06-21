<template>
  <div class="simisinger" v-if="simiArtists">

     <Card
     v-for="(item, index) in simiArtists" :key="index"
     :margin="'20px 20px'"
     :name="item.name"
     :namealign="'center'"
     :cardWidth="'15%'"
     :imgHeight="'160px'"
     :playState="false"
     :icon="null"
     :src="item.img1v1Url"
     @click="toSinger(item.id)"

     ></Card>

  </div>

</template>

<script>
import Card from '@/components/common/Card.vue'
export default {
  data () {
    return {
      simiArtists: null

    }
  },
  props: {
    singerId: {}
  },
  components: { Card },
  methods: {
    // 请求相似歌手
    getSimiSinger (singerId) {
      this.$axios.get('/simi/artist', { params: { id: singerId } }).then(res => {
        this.simiArtists = res.data.artists
      })
    },
    toSinger (singerId) {
      this.$router.push({ path: '/albumlist/' + singerId, query: { name: 'singer' } })
    }

  },
  created () {
    this.getSimiSinger(this.singerId)
  }

}
</script>

<style lang="less" scoped>
.simisinger{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

</style>
