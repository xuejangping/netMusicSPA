<template>
  <div>
    <!-- 列表行组件 -->
  <Row

  v-for="(item, index) in singersRes" :key="index"
  :bgColor="index%2!==0?'#f5f5f7':''"
  :order="index+1"
  :icon="item.id.toString().length===4?true:false"
  :src="item.picUrl"
  :name="item.name"
  :alias="item.alias?item.alias:''"
  @click="toSingerList(item)"

  ></Row>
  </div>
</template>

<script>
import Row from '@/components/common/RowList.vue'
export default {
  data () {
    return {
      singersRes: {}
    }
  },
  components: {
    Row
  },
  props: ['keyword'],
  watch: {
    keyword () {
      this.getSingerData()
    }
  },
  methods: {
    toSingerList (item) {
      this.$router.push({ path: '/albumlist/' + item.id, query: { singerData: item, name: 'singer' } })
      // console.log(item)
    },
    // 请求歌手数据
    getSingerData () {
      this.$diy.getSearchResult(this.keyword, 100).then(res => {
        this.singersRes = res.result.artists
      })
    }
  },
  created () {
    this.getSingerData()
  }

}
</script>

<style lang="less" scoped>

</style>
