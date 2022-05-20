<template>
  <div>
 <Row
  v-for="(item, index) in albumsRes" :key="index"
  :order="false"
  :name="item.name"
  :src="item.picUrl"
  :bgColor="index%2!==0?'#f5f5f7':''"
   @click="toAlbumList(item.id)"
   > <span slot="middle">{{ item.artist.name}}</span>

   </Row>
  </div>
</template>

<script>
import Row from '@/components/common/RowList.vue'
export default {
  components: {
    Row
  },
  data () {
    return {
      albumsRes: {},
      apple: 999
    }
  },
  props: {
    keyword: {}
  },
  watch: {
    keyword () {
      this.getAlbumData()
    }
  },

  methods: {
    // 路由到专辑详情页
    toAlbumList (albumId) {
      this.$router.push({ path: '/albumlist/' + albumId, query: { name: 'album' } })
    },
    // 请求专辑数据
    getAlbumData () {
      this.$diy.getSearchResult(this.keyword, 10).then(res => {
        if (res.result) this.albumsRes = res.result.albums
      })
    }

  },
  created () {
    // 请求专辑数据
    this.getAlbumData()
  }

}
</script>

<style lang="less" scoped>

</style>
