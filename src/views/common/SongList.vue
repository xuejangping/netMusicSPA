<template>
<div>

<!-- 介绍区域 -->
<ListHead
 :coverPicSrc="coverPicSrc"
 :type="type"
 :title="title"
 :publishTime="publishTime"
 :avatarSrc="avatarSrc"
 :nikeName="nikeName"
 :collectCount="collectCount"
 :shareCount="shareCount"
 :tags="tags"
 :describe="describe"
 :avatar="avatar"
 :biaoqian="biaoqian"
 :jianjie="jianjie"
 :alias="alias"
 :action="action"
:extraContent="extraContent"
@click="btnClick"
></ListHead>
<!-- 内容区域 -->
<!-- 专辑和歌单模式 -->
<MusicList
  v-if="!singerPage"
  :table_data="playlists.songs"
></MusicList>
<!-- 歌手资料模式 -->
<SingerContent v-else
:singerId="listId"
:singerName="title"
></SingerContent>

</div>
</template>

<script>
import ListHead from '@/components/common/ListHead.vue'
import MusicList from '@/components/common/MusicList.vue'
import SingerContent from '@/components/Main/SingerContent'
import bus from '@/tools/eventBus.js'
// import bus from '@/tools/eventBus'
export default {
  data () {
    return {
      // 介绍区域数据
      coverPicSrc: '',
      type: '',
      title: '',
      avatar: '',
      publishTime: '',
      avatarSrc: '',
      nikeName: '',
      collectCount: '',
      shareCount: '',
      tags: '',
      describe: '',
      biaoqian: '',
      jianjie: '',
      alias: '',
      action: '',
      extraContent: null,

      // 歌单信息
      listinfo: [],
      // 歌单中的所有歌曲id
      playlistIds: [],
      // 请求回来的歌曲合集
      playlists: [],
      // 歌手资料模式
      singerPage: false,
      singerId: null

    }
  },
  components: {
    ListHead, MusicList, SingerContent
  },
  props: {
    // 路由传过来的id参数
    listId: {},
    singerData: { }

  },
  watch: {
    listId (newval) {
      this.getId(newval)
    }
  },
  methods: {
    // 专辑-------------------------------------------------------------------------------------
    getAlbumList (albumId) {
      this.$diy.getAlbum(albumId).then(res => {
        this.coverPicSrc = res.album.picUrl
        this.type = '专辑'
        this.title = res.album.name
        this.avatar = false
        this.biaoqian = '歌手'
        this.jianjie = '时间'
        this.alias = res.album.alias
        this.collectCount = res.album.info.likedCount
        this.shareCount = res.album.info.shareCount
        this.tags = [res.album.artist.name, res.album.artist.id]
        this.describe = this.$diy.dateFormat(res.album.publishTime)
        this.playlists = res
        this.action = true
        this.extraContent = null
      })
    },
    // 歌单--------------------------------------------------------------------------------------

    getSongList (listId) {
      // 根据收到的歌单Id，请求数据歌单信息listinfo，并遍历得到歌单中歌曲id的合计playlistIds
      this.$diy.getSongList(listId).then((res) => {
        this.coverPicSrc = res.coverImgUrl
        this.type = '歌单'
        this.title = res.name
        this.publishTime = res.trackUpdateTime
        this.avatarSrc = res.creator ? res.creator.avatarUrl : ''
        this.nikeName = res.creator ? res.creator.nickname : ''
        this.collectCount = res.subscribedCount
        this.shareCount = res.shareCount
        this.tags = res.tags
        this.describe = res.description
        this.avatar = true
        this.biaoqian = '标签'
        this.jianjie = '简介'
        this.action = true
        this.extraContent = null
        // 遍历trackIds得到所有歌单中的歌曲id数组
        this.playlistIds = []
        res.trackIds.forEach(item => {
          this.playlistIds.push(item.id)
        })
        // 将歌曲id数组转换为字符串，发起请求每首歌曲的数据
        this.getPlayList(this.playlistIds.join(','))
      })
    },
    // 请求歌单列表
    async getPlayList (trackIds) {
      const { data: res } = await this.$axios('/song/detail', {
        params: { ids: trackIds }
      })
      this.playlists = res
    },
    // 歌手--------------------------------------------------------------------------------------
    getSingerList (singerData) {
      this.coverPicSrc = singerData.img1v1Url
      this.type = '歌手'
      this.title = singerData.name
      this.avatar = false
      this.biaoqian = '单曲数'
      this.jianjie = '专辑数'
      this.action = false
      this.alias = singerData.alias

      this.tags = singerData.musicSize
      this.describe = singerData.albumSize
      this.extraContent = 'MV数:' + singerData.mvSize
      this.playlists = []
    },

    // 用户--------------------------------------------------------------------------------------
    // 判断传入listid类型
    getId () {
      if (this.$route.query.name === 'album') {
      //  请求专辑数据
        this.singerPage = false
        this.getAlbumList(this.listId)
      } else if (this.$route.query.name === 'playlist') {
        // 请求歌单数据
        this.singerPage = false
        this.getSongList(this.listId)
      } else if (this.$route.query.name === 'singer') {
        // 请求歌手数据
        this.singerPage = true

        this.$axios.get('/artists/', { params: { id: this.listId } }).then(res => {
          this.getSingerList(res.data.artist)
        })

        // this.getSingerList(singerData)
      } else if (this.$route.query.name === 'user') {
        // 请求用户数据
      }
    },
    // 播放全部；收藏；分享等按钮点击
    btnClick (btnindex) {
      if (btnindex) {
        this.$Toast({ message: '还没有登录哦', icon: 'warning-o' })
      } else {
        bus.$emit('sharePlayListInfo', this.playlists.songs)
      }
    }
  },
  // 绑定接收数据事件
  created () {
    this.getId()
  }
}
</script>

<style lang="less" scoped>

</style>
