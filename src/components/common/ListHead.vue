<template>
  <div>
    <div class="header">
      <div class="le"><img :src="coverPicSrc" alt="" /></div>
      <div class="ri">
        <!-- 标题 -->
        <div style="font-size: 25px">
          <span :class="avatar ? 'type' : 'type bgcolor'">{{ type }}</span>
          {{ title }}
          <span v-if="alias.length === 0 ? false : true"
            >(<span style="color: #9d939e">{{ alias[0] }}</span
            >)</span
          >
        </div>
        <!-- 头像插槽 -->
        <slot name="avatar">
          <div style="color: #666666; margin: 8px 0" v-if="avatar">
            <el-avatar
              :src="avatarSrc"
              style="vertical-align: middle"
            ></el-avatar>
            <span style="padding: 0 10px">{{ nikeName }}</span>
            <span>{{ publishTime | dateFormat }}</span>
          </div>
        </slot>

        <!-- 操作部分插槽 -->
        <slot name="action">
          <div :class="avatar ? '' : 'noavatar'" v-if="action" >
            <el-button
            @click="click(0)"
              size="small"
              style="background-color: #c62f2f; color: #fff"
              ><van-icon name="play-circle" /><span style="padding: 2px 6px;border-right:1px solid #ee8491;"
                >播放全部</span
              ><i class="el-icon-plus" style="padding-left:4px"></i
            ></el-button>

            <el-button size="small" @click="click(1)"
              ><i class="el-icon-collection-tag"></i
              ><span style="padding: 0 5px"
                >收藏({{ collectCount }})</span
              ></el-button
            >

            <el-button size="small" @click="click(2)"
              ><van-icon name="share-o" /><span style="padding: 0 5px"
                >分享({{ shareCount }})</span
              ></el-button
            >

            <el-button size="small" @click="click(3)"
              ><i class="el-icon-download"></i><span>下载全部</span></el-button
            >
          </div>
        </slot>
        <!-- 标签插槽 -->
        <slot name="tag">
          <div style="font-size: 15px; margin: 6px 0" class="tag">
            <span style="font-weight: 700; color: #333333"
              >{{ biaoqian }}:</span
            >
            <span style="padding: 0 10px">
              <span v-if="!avatar&&typeof tags==='number'">{{tags}}</span>
              <router-link :to="{path:'/albumlist/'+tags[1],query:{name:'singer'}}" v-else-if="!avatar">{{ tags[0]}}</router-link>
              <a
                href="#"
                v-else
                style="color: #0a63a8"
                v-for="(item, index) in tags"
                :key="index"
                >{{ index > 0 ? "/" + item : item }}</a>
            </span>
          </div>
        </slot>
        <!-- 简介插槽 -->
        <slot name="describle">
          <div style="font-size: 15px; line-height: 25px" class="discribe">
            <span style="font-weight: 700; color: #333333">{{ jianjie }}:</span>
            <span style="padding: 0 10px">{{ describe }}</span>
          </div>
        </slot>
        <!-- 补充内容 -->
        <span v-if="extraContent" style="font-size: 15px;line-height:40px">
          <span style="font-weight: 700; color: #333333">{{
            extraContent.substr(0, 4)
          }}</span>
          <span style="padding: 0 10px">{{ extraContent.substr(4) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coverPicSrc: {
      default: ''
    },
    type: {
      default: '歌单'
    },
    title: {
      default: 'title'
    },
    avatarSrc: {
      default: ''
    },
    nikeName: {
      default: 'nikeName'
    },
    publishTime: {
      default: 'publishTime'
    },
    collectCount: {
      default: 'collectCount'
    },
    shareCount: {
      default: 'shareCount'
    },
    tags: {
      default: 'tag'
    },
    describe: {
      default: 'describe'
    },
    avatar: {
      default: true
    },
    biaoqian: {
      default: '标签'
    },
    jianjie: {
      default: '简介'
    },
    alias: {
      default: null
    },

    // 按钮栏是否使用
    action: {
      default: true
    },
    // 补充内容
    extraContent: {
      default: null
    }
  },
  methods: {
    click (index) {
      this.$emit('click', index)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 220px;
  margin: 10px 0 30px 0;
  padding: 0 10px;
  line-height: 30px;
  text-align: left;
  .le {
    img {
      width: 220px;
    }
  }

  .ri {
    padding-left: 30px;
    .type {
      display: inline-block;
      height: 25px;
      line-height: 25px;
      vertical-align: middle;
      color: #b12323;
      border: 1px solid #c62f2f;
      padding: 0 8px;

      font-size: 13px;

      span {
        margin: 0 10px;
      }
    }
    //  专辑模式
    .noavatar {
      margin: 50px 0 30px 0;
    }
    .bgcolor {
      background-color: #c62f2f;
      color: #fff;
    }
    .discribe {
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; /* 这里是超出几行省略 */
      overflow: hidden;
    }
  }
}
</style>
