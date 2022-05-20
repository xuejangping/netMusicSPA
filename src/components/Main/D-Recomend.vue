
<template>
  <div>
    <!-- 横幅 -->
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.pic" alt="" style="height: 100%" @click="bannerClick(item)" />
        <span class="tag" :style="`background:${item.titleColor}`">{{ item.typeTitle}}</span>
        <!-- <h3 class="medium">{{ item.pic }}</h3> -->
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <Column @click="morePlayList"></Column>
    <div class="container">

          <Card
        v-for="(item, index) in recommendPlayLists"
        :key="index"
        :imgHeight="'fit-content'"
        :src="item.picUrl"
        :name="item.name"
        :count="(item.playCount / 10000).toFixed(1) + '万'"
        @click="toSongList(item.id)"
      ></Card>

    </div>
    <!-- 独家放送 -->
    <Column :ltext="'独家放送'" ></Column>
    <div class="container a">
      <Card
      v-for="(item, index) in specialList" :key="index"
      @click="toVideo(item.id,0)"
      :src="item.sPicUrl"
      :name="item.name"
       :icon="'video-camera-solid'"
       :topPst="'left:0;'"
       :playState="false"
       :cardWidth="'31.3%'"></Card>
    </div>
   <!-- 最新音乐 -->
   <Column :ltext="'最新音乐'" @click="moreNewMusic"></Column>
   <div class="newMusic container">
     <span

      style="width:50%"
      v-for="(item, index) in newMusics" :key="index"
     > <RowList
     @dblclick="play(item)"
     :order="(index+1).toString().padStart(2,0)"
     :bgColor="index%2===0?'':'#f2f6fc'"
     :src="item.picUrl"
     :alias="item.song?item.song.alias:''"
     > <div slot="content" class="rowlist-solt ">
        <span ><b style="color:#333333">{{item.name}}</b>
           <span v-for="(item,index) in item.song.alias" :key="index">({{item}})</span>
        </span>
       <span ><span v-for="(item, index) in item.song.artists" :key="index">
         {{index>0?'/'+item.name:item.name}}</span></span>
     </div>
       </RowList></span>

   </div>

    <!-- 推荐MV -->
    <Column :ltext="'推荐MV'"></Column>
    <div class="container a">
      <Card
      v-for="(item, index) in recommendMV" :key="index"
      @click="toVideo(item.id,0)"
      :src="item.picUrl"
      :count="item.playCount"
     :cardWidth="'31.3%'"
     :name="item.name"
     :playState="false"
     :icon="'video-camera'"

      ></Card>
    </div>
  </div>
</template>

<script>
import bus from '@/tools/eventBus.js'
import Column from '@/components/common/Column.vue'
import Card from '@/components/common/Card.vue'
import RowList from '@/components/common/RowList.vue'
// import { Notify } from 'vant'
export default {
  components: { Card, Column, RowList },
  data () {
    return {
      banners: [],
      recommendPlayLists: [],
      // 独家放送
      specialList: [],
      recommendMV: [],
      newMusics: []
    }
  },
  methods: {
    // 播放事件,传入歌曲对象song播放
    play (item) {
      bus.$emit('play', item)
    },
    // 更多歌单
    morePlayList () {
      this.$emit('morePlayList')
    },
    // 更多新歌
    moreNewMusic () {
      // 切换动态组件到newmusic
      this.$emit('toNewMusic')
    },
    // 请求推荐歌单
    async getRecmmend () {
      this.$axios.get('/personalized', { params: { limit: 15 } }).then((res) => {
        this.recommendPlayLists = res.data.result
      })

      //   // this.recommends=(this.recommends,...res.playlists)
    },
    // 独家放送
    getspecialList () {
      this.$axios.get('/personalized/privatecontent').then(res => {
        this.specialList = res.data.result
      })
    },
    // 最新音乐
    getNewMusic () {
      this.$axios.get('/personalized/newsong').then(res => {
        this.newMusics = res.data.result
      })
    },
    // 推荐MV
    getrecommendMV () {
      this.$axios.get('/personalized/mv').then(res => {
        this.recommendMV = res.data.result
      })
    },
    // 请求横幅数据
    async getBanner () {
      const { data: res } = await this.$axios.get('/homepage/block/page')
      this.banners = res.data.blocks[0].extInfo.banners
    },
    // 横幅点击
    bannerClick (e) {
      switch (e.targetType) {
        // 新歌首发
        case 1:
          this.play(e.song)
          break
        case 10:
          this.$router.push({ path: '/albumlist/' + e.targetId, query: { name: 'album' } })
          break
          // 歌单
        case 1000:
          this.$router.push({ path: '/albumlist/' + e.targetId, query: { name: 'playlist' } })
          break
          // 活动，专区，独家策划
        case 3000:
          window.open(e.url, '_blank')
          break
          // 直播
        case 7001:
          window.open(`https://look.163.com/live?id=${e.targetId}`, '_blank')
          break
        default:
          this.$Toast('未知横幅信息')
          break
      }
    },
    // 点击歌单封面，跳转歌单列表
    toSongList (listId) {
      this.$router.push({
        path: '/albumlist/' + listId,
        query: { name: 'playlist' }
      })
      // this.$router.push('/songlist/' + listId)
    },
    // 视频点击路由
    toVideo (vid, type) {
      this.$router.push(`/video/${vid}/${type}`)
    },
    // 页面到底时，自动加载更多内容
    autoLoading () {}
  },
  created () {
    // 请求相关数据
    this.getBanner()
    this.getRecmmend()
    this.getspecialList()
    this.getrecommendMV()
    this.getNewMusic()
  },
  mounted () {}
}
</script>

<style lang="less" scoped>

/deep/ .a .cover-top{

 font-size: 22px;
}
// 横幅
// 横幅的标签
.tag{
  position: absolute;
  bottom: 10px;
  right: 0;
  padding:0 6px 0 10px;
  line-height: 24px;
  border-radius: 12px 0 0 12px;
  color: #fff;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.container {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.newMusic{
  flex-direction: column;
  height: 370px;
  span{
  flex: 1;

  }
  .rowlist-solt{
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    span{
      color: #888888;
      line-height: 30px;
      flex: 1;
    }

  }
}
</style>
