
<template>
  <div id="toplist">
    <!-- 官方榜 -->
   <h1 class="title">官方榜</h1>
   <div class="container">
     <!-- 排行榜名字 -->
   <ToplistCard
   v-for="(item, index) in allTopList.filter((item,index)=>index<4)" :key="index"
   :bgcolor="index===0?'#4e88e3':index===1?'#189ab6':index===2?'#c9305d':index===3?'red':''"
   :listId="item.id"
   :topname="item.name"
   :time="item.trackUpdateTime"
   ></ToplistCard>

   </div>
   <!-- 全球榜 -->
   <h1 class="title">全球榜</h1>
   <div class="container">
     <Card
     v-for="(item, index) in allTopList.filter((item,index)=>index>=4)" :key="index"
     :cardWidth="'14.7%'"
     :imgHeight="''"
     :src="item.coverImgUrl"
     :name="item.name"
     :count="Math.floor(item.playCount/10000) +'万'"
     @click="toPlayList(item.id)"
     ></Card>
   </div>
  </div>
</template>

<script>
import ToplistCard from '@/components/common/ToplistCard.vue'
import Card from '@/components/common/Card.vue'

export default {
  data () {
    return {
      allTopList: []
    }
  },
  components: {
    ToplistCard, Card
  },
  methods: {
    // 请求所有排行榜数据
    getAllTopList () {
      this.$axios.get('/toplist').then(res => {
        this.allTopList = res.data.list
      })
    },
    // 路由到歌单页
    toPlayList (id) {
      this.$router.push({ path: '/albumlist/' + id, query: { name: 'playlist' } })
    }
  },
  created () {
    this.getAllTopList()
  }

}

</script>

<style lang="less" scoped>
#toplist{
  text-align: left;

}
.title{
font-weight: normal;
font-size: 25px;
border-bottom: 1px solid pink;
padding-bottom: 5px;
margin-top: 20px;
}
.container{
  display: flex;

  flex-wrap: wrap;
}
</style>
