
<template>
  <div class="singer">
    <!-- 分类标签 -->
<HotTag
v-for="(item, index) in tagCats" :key="index"
:tagTitle="index"
:name="index"
:hottags="item"
@click="getSingerList"
></HotTag>
<hr style="">
<!-- 卡片内容区 -->
 <div class="container">
    <Card
    :playState="false"
     v-for="(item, index) in singerListData" :key="index"
     :cardWidth="'14.7%'"
     :imgHeight="'fit-content'"
     :src="item.img1v1Url"
     :name="item.name"
     :count="item.musicSize"
     :icon="'sugar'"
    @click="toSingerList(item.id)"
     ></Card>
 </div>
  </div>
</template>

<script>
import HotTag from '@/components/common/HotTag.vue'
import Card from '@/components/common/Card.vue'
export default {
  data () {
    return {
      singerListData: [],
      // 根据标签选择的请求参数
      lang: '10',
      sex: '01',
      initial: ''
    }
  },
  components: {
    HotTag, Card
  },
  methods: {
    // 请求歌手分类数据
  // 男：01 女：02 组合：03
  // 华语：10 欧美：20 日本：60 韩国：70 其他：40
  // initial： 首字母
    getSingerList (e) {
      switch (e[1]) {
        case '语种':
          this.lang = e[0]
          break
        case '分类':
          this.sex = e[0]
          break
        case '筛选':
          this.initial = e[0]
          break

        default:
          break
      }
      this.$axios.get('/artist/list', { params: { cat: this.lang + this.sex, initial: this.initial, limit: 20 } }).then(res => {
        this.singerListData = res.data.artists
      })
    },
    // 生成大写字母A-Z数组
    creatAtoZ (code) {
      const arr = []
      // eslint-disable-next-line prefer-const
      for (let i = 0; i < 26; i++) {
        const obj = {}
        obj.name = String.fromCharCode((code + i))
        obj.num = String.fromCharCode((code + i))
        arr.push(obj)
      }

      return arr
    },
    // 去歌手页
    toSingerList (singerId) {
      this.$router.push({ path: '/albumlist/' + singerId, query: { name: 'singer' } })
    }
  },
  computed: {
  // 分类标签数据
    tagCats () {
      return {
        语种: [{ name: '全部', num: '' }, { name: '华语', num: '10' }, { name: '欧美', num: '20' }, { name: '日本', num: '60' }, { name: '韩国', num: '70' }, { name: '其他', num: '40' }],
        分类: [{ name: '全部', num: '' }, { name: '男歌手', num: '01' }, { name: '女歌手', num: '02' }, { name: '乐队组合', num: '03' }],
        筛选: [{ name: '热门' }, ...this.creatAtoZ(65), { name: '#' }]
      }
    }
  },
  created () {
    this.getSingerList([])
  }

}
</script>

<style lang="less" scoped>
.singer{
  text-align: left;
}
.container{
  display: flex;
  flex-wrap: wrap;
}
</style>
