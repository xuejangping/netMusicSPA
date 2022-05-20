<template>
  <div>
    <Tabs :items="['专辑','MV','歌手详情','相似歌手']"
    :marginLR="'50'"
    @click="tab"
    ></Tabs>
    <keep-alive>
      <component :is="componentName"
      :singerId="singerId"
      :singerName="singerName"
      ></component>

    </keep-alive>
  </div>

</template>

<script>
import Tabs from '@/components/common/Tabs.vue'
import SingerAl from '@/components/Main/Singer-Album.vue'
import SingerDescrible from '@/components/Main/Singer-Describle.vue'
import SingerVideo from '@/components/Main/Singer-Video.vue'
import SingerSimi from '@/components/Main/Singer-SimiSinger.vue'
export default {
  data () {
    return {
      componentName: SingerAl

    }
  },
  props: {
    singerId: {},
    singerName: {}
  },
  components: { Tabs },
  methods: {
    // 切换标签
    tab (index) {
      switch (index) {
        case 0:this.componentName = SingerAl

          break
        case 1:this.componentName = SingerVideo

          break
        case 2:this.componentName = SingerDescrible

          break
        case 3:this.componentName = SingerSimi

          break

        default:
          break
      }
    }
  }

}
</script>

<style lang="less" scoped>

</style>
