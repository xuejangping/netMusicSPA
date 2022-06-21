<template>
  <div>
    <!-- 视频,MV切换 -->
    <Tabs :items="['MV', '视频']" :align="'center'" @click="switchTab"></Tabs>
    <div class="MV" v-if="isMV">
      <!-- MV标签分类 -->
      <HotTag
        v-for="(item, index) in MVHottags"
        :key="index"
        :tagTitle="index"
        :hottags="item"
        :name="index"
        @click="checked"
      ></HotTag>
      <!-- 内容展示 -->
      <div class="container a">
        <Card
          v-for="(item, index) in MvData"
          :key="index"
          @click="toVideo(item.id, 0)"
          :src="item.cover"
          :count="item.playCount"
          :cardWidth="'31.3%'"
          :name="item.name"
          :playState="false"
          :icon="'video-camera'"
        ></Card>
      </div>
    </div>
    <div class="video" v-else>
      <!-- 全部视频分类 -->
      <AllPlayList :video="true"></AllPlayList>
      <!-- 热门分类 -->
      <HotTag :tagTitle="'分类'" :hottags="videoHottags"></HotTag>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/common/Tabs.vue'
import AllPlayList from '@/components/common/AllPlayList.vue'
import HotTag from '@/components/common/HotTag.vue'
import Card from '@/components/common/Card.vue'
export default {
  data () {
    return {
      isMV: true,
      MVHottags: {
        地区: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
        类型: ['全部', '官方', '原声', '现场版', '网易出品'],
        排序: ['上升最快', '最热', '最新']
      },
      // 请求参数
      area: null,
      type: null,
      order: null,
      MvData: null,
      videoHottags: [{ name: '现场', num: 23 }]
    }
  },
  components: { Tabs, AllPlayList, HotTag, Card },
  methods: {
    // 切换顶部标签
    switchTab (tabId) {
      // eslint-disable-next-line no-unneeded-ternary
      this.isMV = tabId === 0 ? true : false
    },
    checked (e) {
      console.log(e)
      if (e[1] === '地区') {
        this.area = e[0]
      } else if (e[1] === '类型') {
        this.type = e[0]
      } else if (e[1] === '排序') {
        this.order = e[0]
      }
      this.getMVList(this.area, this.type, this.order)
    },
    // 请求MV数据
    getMVList (area, type, order) {
      this.$axios
        .get('/mv/all', { params: { area: area, type: type, order: order } })
        .then((res) => {
          this.MvData = res.data.data
        })
    },
    // 去MV页
    toVideo (vid, type) {
      this.$router.push(`/video/${vid}/${type}`)
    }
  },
  created () {
    this.getMVList()
  }
}
</script>

<style lang="less" scoped>
/deep/.video {
  .active {
    color: red;
    border-bottom: 3px solid red;
  }
}
.container {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
