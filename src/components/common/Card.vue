<template>

<!-- 事件:click
封面：src
名字：name
播放数：count -->

      <div class="card" @click="click"
      :style="`width:${cardWidth};margin: ${margin};`" >
    <!-- 遮罩层 -->

    <div class="cover"  style="position: relative;">
      <img :class="video" :style="`height:${imgHeight}`" :src="src" alt="" @mouseover="show" @mouseleave="hide"  />
      <span class="cover-top" :style="`${topPst}`"
      ><i :class="`el-icon-${icon}`"></i>
      {{ count  }}</span>
      <!-- 视频模式 -->
      <span v-if="video" v-show="bottomState" class="cover-bottom"
      > {{ time|timeFormat}}</span>
      <transition name="slide-fade">
      <span v-if="playState"><span class="play" v-if="!video" v-show="flag" ><van-icon name="play-circle" /></span></span>
      </transition>

    </div>

    <span class="name" :style="`text-align:${namealign};`">{{ name }}</span>
    <!-- 卡片内容区插槽 -->
    <slot></slot>

  </div>

</template>

<script>
export default {
  data () {
    return {
      flag: false
    }
  },
  props: {
    namealign: {
      default: 'left'
    },
    // 播放按钮
    playState: {
      default: true
    },
    // 卡片宽度
    cardWidth: {
      default: '18%'
    },
    imgHeight: {
      default: '190px'
    },
    // 上边按钮位置
    topPst: {
      default: 'right:0;'
    },
    src: {},
    name: {},
    count: {},
    time: {},
    bottomState: {
      default: true
    },
    icon: {
      default: 'headset'
    },
    video: {
      default: null
    },
    margin: {
      default: '5px 10px'
    }

  },
  methods: {
    show () {
      this.flag = true
    },
    hide () {
      this.flag = false
    },
    // click (e) {
    //   this.$emit('click', e)
    // },
    // 点击歌单封面，跳转歌单列表
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>

.card {
  border: 0;
  line-height: 20px;
  transition: transform .5s;

  cursor: pointer;
  .cover-top,
  .cover-bottom {
    position: absolute;
    line-height: 25px;
    height: 23px;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.2));
    padding: 0 5px;
  }
  .cover-top{

    top: 0px;
  }
  .cover-bottom{
  top : 84px ;
  left: 0px;
  background: linear-gradient(to left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.2));
}
  .play {
    position: absolute;
    right: 10px ;
    bottom: 10px;
    font-size: 33px;
    color: rgba(0, 0, 0, 0.5);
  }
    img {
      width:100%;
    }
    .video{
  height: 110px !important ;
}

  // 设置文字样式，不超过两行
  .name {
    font-size: 15px;
    padding: 3px 0;
    line-height: 23px;
    color: #333;
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  // 设置渐变
.slide-fade-enter-active {transition: all .3s ease;}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);

  }
.slide-fade-enter, .slide-fade-leave-to{opacity: .1;}
}
.card:hover{
  transform: scale(1.1);

}

</style>
