<template>
  <div style="padding:5px" v-if="currentPlayList" >
    <RowSmall
    :listData="currentPlayList"
    :border="0"
    :title="`总${currentPlayList.length}首`"
    :order="false"
    :titleIcon="[]"
    @dblclick="play"

    ></RowSmall>

  </div>
</template>

<script>
import RowSmall from '@/components/common/RowSmall.vue'
export default {
  props: {
    currentPlayList: {
      default: null
    }
  },
  components: { RowSmall },
  methods: {
    play (e) {
      this.$emit('play', e)
    }
  }

}
</script>

<style lang="less" scoped>

</style>
