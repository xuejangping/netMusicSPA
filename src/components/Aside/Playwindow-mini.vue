<template>
      <!-- 播放视窗 -->
    <div class="play-view" @click="click" @mouseenter="expandIcon=true" @mouseleave="expandIcon=false" v-if="playingInfo" >
      <RowList :order="false"
        :src="playingInfo.al?playingInfo.al.picUrl:playingInfo.album.picUrl "
      >
        <div slot="content" class="slot-content ">
          <span > <span >{{playingInfo.name?playingInfo.name:'歌曲'}} </span> <span @click.stop="like=!like"><van-icon name="like" :color="like?'red':'#666666'" size="18"/></span>
          </span>
           <span>
           <span style="color:#666666"> <span v-for="(item, index) in playingInfo.ar?playingInfo.ar:playingInfo.artists" :key="index">{{index>0?'/'+item.name:item.name}}</span></span>
                 <span style=""> <van-icon name="share" color="brown" size="18px" /></span> </span>
        </div>
        </RowList>
        <!-- 模态窗 -->
        <transition name="fade">
          <span class="expand-icon " v-show="expandIcon"   >
            <i style="align-self: flex-end" class="el-icon-top-right"></i>
            <i class="el-icon-bottom-left"></i>
        </span>

        </transition>

    </div>
</template>

<script>
import RowList from '@/components/common/RowList.vue'
import bus from '@/tools/eventBus'
export default {
  data () {
    return {
      expandIcon: false,
      like: false,
      playingInfo: null

    }
  },
  components: {
    RowList
  },
  methods: {
    click () {
      this.$emit('click')
    }
  },
  created () {
    // 接收当前播放的歌曲信息
    bus.$on('shareMusicInfo', e => {
      this.playingInfo = e[0]
    })
  }

}
</script>

<style lang="less" scoped>
 .inoneline{
    // white-space:nowrap;
    overflow:hidden;
    // text-overflow:ellipsis;
    // width: 100%;
  }
  .play-view {
    width: 100%;
    position: relative;
    padding: 0 5px;
    .slot-content{
      display: flex;
      flex-direction: column;
     background: #f5f3ff;
      line-height: normal;
      padding:0 10px;
      font-size: 13px;
      width: 100%;

      >span{

        display: flex;
        justify-content: space-between;
        flex: 1;
        align-items: center;
      }
    }
  }

  .expand-icon{
    display: flex;
    position: absolute;
    top: 5px;
    left: 5px;
    opacity: .6;
    flex-direction: column;
    width: 60px;
    height: 60px;

    padding: 5px;
    color:#fff;

    font-size: 26px;
    background: rgba(78, 64, 82, );
    line-height: 0;

  }
  .fade-enter{
    opacity: 0;
    // transform: rotate(160deg);
  }
.fade-enter-active{

  transition: all .2s ease-in;
}
.fade-leave-active{
  opacity: 0;
  transition: all .2s ease-in;

}
</style>
