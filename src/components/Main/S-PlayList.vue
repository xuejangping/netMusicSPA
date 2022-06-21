<template>
  <div>
  <Row
  v-for="(item, index) in playListsRes" :key="index"
  :order="false"
  :name="item.name"
  :src="item.coverImgUrl"
  :bgColor="index%2!==0?'#f5f5f7':''"
   @click="toSongList(item.id)"
  > <span slot="middle">{{item.trackCount}}首</span> <span slot="right">by {{ item.creator.nickname}}</span></Row>
  </div>
</template>

<script>
import Row from '@/components/common/RowList.vue'
export default {
  data () {
    return {
      playListsRes: []
    }
  },
  components: {
    Row
  },
  props: {
    keyword: {}
  },
  watch: {
    keyword () {
      this.getPlayListData()
    }

  },
  methods: {
    test () {
      console.log('歌单')
    },
    // 请求歌单详情页
    getPlayListData () {
      this.$diy.getSearchResult(this.keyword, 1000).then(res => {
        if (res.result) this.playListsRes = res.result.playlists
      })
    },
    //
    // 路由到列表页
    toSongList (listId) {
      this.$router.push({ path: '/albumlist/' + listId, query: { name: 'playlist' } })
    }

  },
  created () {
    this.getPlayListData()
  }

}
</script>

<style lang="less" scoped>

</style>
