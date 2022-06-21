
<template>
  <div class="recomend">
    <NavList :listdata="listdata" @click="activeColor"></NavList>

  </div>
</template>

<script>

import NavList from '@/components/common/navList.vue'

export default {
  data () {
    return {

      listdata: [
        {
          title: '推荐',

          lists: [
            {
              icon: 'el-icon-headset',
              name: '发现音乐',
              path: '/discover'
            },
            {
              icon: 'el-icon-film',
              name: '视频',
              path: '/videolist'
            },
            {
              icon: 'el-icon-user',
              name: '朋友',
              path: '/content'
            },
            {
              icon: 'el-icon-video-camera',
              name: 'LOOK直播',
              path: '/content'
            }
          ]
        },
        {
          title: '我的音乐',

          lists: [
            {
              icon: 'el-icon-folder',
              name: '本地音乐',
              path: '/locallist'
            },
            {
              icon: 'el-icon-download',
              name: '下载管理',
              path: '/content'
            }
          ]
        },
        {
          title: '创建的歌单',

          lists: []
        }
      ]
    }
  },
  props: {
    // 登录后得到的用户歌单数据，添加到创建歌单lists中渲染用户歌单列表
    userplaylist: {}
  },
  watch: {
    // 添加用户歌单
    userplaylist () {
      this.listdata[2].lists = []
      this.userplaylist.forEach(item => {
        this.listdata[2].lists.push({ icon: 'el-icon-star-off', name: item.name, path: '/albumlist/' + item.id })
      })
    }
  },
  methods: {
    activeColor (e) {
      document
        .querySelector('#aside')
        .querySelectorAll('#le')
        .forEach((item) => {
          item.classList.remove('active')
          item.parentNode.style.backgroundColor = ''
          //  匹配点击点击项
          if (e.target.getAttribute('index') === item.getAttribute('index')) {
            item.classList.add('active')
            item.parentNode.style.backgroundColor = '#fff'
          }
        })
    },
    showExpand () {

    }
  },

  components: { NavList },

  mounted () {
    const fisrtlist = document
      .querySelector('#aside')
      .querySelectorAll('#le')[0]
    fisrtlist.classList.add('active')
    fisrtlist.parentNode.style.backgroundColor = '#fff'
  }
}
</script>

<style lang="less" scoped>
.recomend {
  padding: 10px 0;
  overflow: auto;

}
</style>
