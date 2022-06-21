<template>
  <div>
    <AllPlayList
      textAlign="left"
      @share="getListsFromAllPlayList"
    ></AllPlayList>
    <div class="hottags" style="padding: 10px 0">
      <span>热门标签：</span>
      <span
        v-for="(item, index) in hottags"
        :key="index"
        class="tag"
        @click="getPlaylists(item.name)"
      >
        {{ item.name }}</span
      >
    </div>
    <i v-if="loadingState" class="el-icon-loading" style="font-size: 40px"></i>
    <div v-show="!loadingState">
      <!-- 歌单卡片 -->
    <div class="container">
      <Card
        v-for="(item, index) in playListsFromOther"
        :key="index"
        :imgHeight="'fit-content'"
        :src="item.coverImgUrl"
        :name="item.name"
        :count="(item.playCount / 10000).toFixed(1) + '万'"

        @click="toSongList(item.id)"
      ></Card>

    </div>
    <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :page-size="50"
          :pager-count="7"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentpage"
          @current-change="getPlaylists(currenttag,currentpage)"
        >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import AllPlayList from '@/components/common/AllPlayList.vue'
import Card from '@/components/common/Card.vue'
export default {
  data () {
    return {
      // 获取到的热门分类
      hottags: [],
      // 根据分类目录，请求到的歌单数据
      playListsFromOther: [],
      // 总条数
      total: 50,
      // 当前页码
      currentpage: 1,
      // 当前标签内容
      currenttag: '',
      // 加载动画
      loadingState: false
    }
  },
  components: {
    AllPlayList,
    Card
  },
  methods: {
    // 根据标签请求数据
    getPlaylists (tag, page) {
      this.$diy.loading.call(this, 600)
      this.$diy.getPlayListUser(tag, page).then((res) => {
        this.playListsFromOther = res.playlists

        this.currenttag = tag
        this.total = res.total
        // this.$forceUpdate()
      })
    },
    // 从歌单allPlayList卡片得到的歌单
    getListsFromAllPlayList (e) {
      this.playListsFromOther = e.playlists
      this.currenttag = e.cat
    },
    // 热门歌单目录
    async getHotTags () {
      const { data: res } = await this.$axios.get('/playlist/hot')

      this.hottags = res.tags
      // 利用得到热门歌单标签，初始化页面内容
      this.initPage(res.tags)
    },
    // 分页功能

    // 初始化页面
    initPage (hottags) {
      const b = Math.floor(Math.random() * hottags.length)

      this.getPlaylists(hottags[b].name)
    },
    toSongList (listId) {
      this.$router.push({ path: '/albumlist/' + listId, query: { name: 'playlist' } })
      // this.$router.push('/songlist/' + listId)
    }
  },
  created () {
    // 请求热门标签
    this.getHotTags()
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
.tag {
  padding: 0 10px;
  border-right: 1px solid pink;
  color: #666666;
}
.tag:last-child {
  border: 0;
}
.tag:hover {
  color: #333333;
}
// 卡片容器
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

</style>
