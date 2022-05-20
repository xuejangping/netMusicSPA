<template>
  <div>
    <!-- 按钮切换 -->
    <Btn :items="['新歌速递', '新碟上架']" @click="swichBtn"></Btn>

    <!-- 语种切换 -->
    <Tabs
      :items="['全部', '华语', '欧美', '韩国', '日本']"
      @click="switchLang"
    ></Tabs>
<!-- 内容区 -->
<!-- 新歌速递 -->
    <div class="list-content" v-if="isMusic">
      <RowList
        v-for="(item, index) in musicData"
        :key="index"
        :bgColor="index % 2 === 0 ? '#f5f5f7' : ''"
        :order="(index + 1).toString().padStart(2, '0')"
        :src="item.album.picUrl"
        :name="item.name"
        :alias="item.alias"
        :playbtn="true"
        @dblclick="play(item)"
      >
        <span slot="left" @click="toSingerList(item.artists[0].id)">{{
          item.artists[0].name
        }}</span>
        <span slot="middle" @click="toAlbumList(item.album.id)">{{
          item.album.name
        }}</span>
        <span slot="right">{{ item.duration | timeFormat }}</span>
      </RowList>
    </div>
<!-- 新碟上架 -->
  <div v-else>
    <div class="week">
      <div class="le">本周新碟</div>
      <div class="ri">
          <Card
        v-for="(item, index) in weekData" :key="index"
        :src="item.picUrl"
        :icon="''"
        :name="item.name"
        :cardWidth="'20%'"
        @click="toPlayList(item.id)"
        > <div style="text-align:left;color:#968888;font-size:13px">{{item.artist.name}}</div></Card>
      </div>

    </div>
  </div>
  </div>
</template>

<script>
import bus from '@/tools/eventBus.js'
import Card from '@/components/common/Card.vue'
import Btn from '@/components/common/Btn.vue'
import Tabs from '@/components/common/Tabs.vue'
import RowList from '@/components/common/RowList.vue'

export default {
  data () {
    return {
      // 语种类型
      langType: {
        default: 0
      },
      // 新歌或者新碟
      isMusic: true,
      // 歌曲数据
      musicData: {},
      // 本周新碟
      weekData: {}
    }
  },
  components: {
    Btn,
    Tabs,
    RowList,
    Card
  },
  methods: {
    // 新碟和新歌切换
    swichBtn (index) {
      if (index === 0) {
        this.isMusic = true
      } else if (index === 1) {
        this.isMusic = false
      }
    },
    toPlayList (id) {
      this.$router.push({ path: `/albumlist/${id}`, query: { name: 'album' } })
    },
    // 切换语种
    switchLang (index) {
      switch (index) {
        case 0:
          this.langType = 0
          break
        case 1:
          this.langType = 7
          break
        case 2:
          this.langType = 96
          break
        case 3:
          this.langType = 16
          break
        case 4:
          this.langType = 8
          break
        default:
          break
      }
      // 新歌数据
      this.$axios
        .get('/top/song', { params: { type: this.langType, limit: 20 } })
        .then((res) => {
          const arr = []
          res.data.data.some((item, index) => { arr.push(item); return index > 10 })

          this.musicData = arr
        })
    },
    // 双击播放
    play (item) {
      bus.$emit('play', item)
    },
    toSingerList () {},
    toAlbumList (id) {
      this.$router.push({ path: 'albumlist/' + id, query: { name: 'album' } })
    }
  },
  created () {
    // 初始化页面华语
    this.switchLang(0)
    this.$axios.get('/top/album').then(res => {
      const arr = []
      res.data.weekData.some((item, index) => { arr.push(item); return index > 10 })
      this.weekData = arr
    })
  }
}
</script>

<style lang="less" scoped>
.list-content{
 border: 1px solid #ededed;
 margin: 10px 0;
}
// 新碟上架
.week{
  display: flex;
  width: 100%;
  padding: 15px 0px;
  .le{
    flex: 1;
    line-height: 24px;
    padding: 0 5px;
font-weight: 600;
    font-size: 22px;
  }
  .ri{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    flex: 22;

  }
}
</style>
