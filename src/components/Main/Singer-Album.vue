<template>
  <div>
    <div class="container" v-for="(item, index) in hotAlbums" :key="index">
      <div class="le">
        <span class="alpic"><img :src="item.album.blurPicUrl" alt="22"></span>
        <span style="display:block;padding:10px 0">{{ item.album.publishTime|dateFormat}}</span>

      </div>
      <div class="ri">
        <ul>
          <li class="title"><span>{{item.album.name}}</span> <span> <i class="el-icon-folder-add"></i> <i class="el-icon-video-play"></i></span></li>
          <li class="content"  v-for="(item2, index2) in item.songs" :key="index2"
          @dblclick="play(item2)"

          >
            <span>
              <span>{{`${index2+1}`.padStart(2,'0')}}</span>
              <span><i :style="`color:${index2%2?'blue':'red'}`" class="el-icon-sugar"></i></span>
              <span style="color:#333333">{{ item2.name}}</span>
              <span>{{item2.alia.length===0?'':`(${item2.alia[0]})`}}</span>
            </span>
            <span style="padding:0 30px">{{ item2.dt|timeFormat}}</span>
          </li>
        </ul>

      </div>

    </div>

  </div>

</template>

<script>
import bus from '@/tools/eventBus'
export default {
  data () {
    return {
      hotAlbums: []

    }
  },
  props: {
    singerId: {}
  },
  components: { },
  methods: {
    play (e) {
      bus.$emit('play', e)
    },
    // 请求热门专辑
    getHotAlbums (singerId) {
      this.$axios.get('/artist/album', { params: { id: singerId } }).then(res => {
        res.data.hotAlbums.forEach(item => {
          this.getAlbumLists(item.id)
        })
      })
    },
    // 请求专辑z中歌曲
    getAlbumLists (albumId) {
      this.$diy.getAlbum(albumId).then(res => {
        this.hotAlbums.push(res)
      })
    }

  },
  created () {
    this.getHotAlbums(this.singerId)
  }

}
</script>

<style lang="less" scoped>
.container{
  display: flex;
  margin: 30px 0;
  padding: 0 10px;
  line-height: normal;
  text-align: left;
  .le{
    flex: 1;
    .alpic{
      display: inline-block;
      width: 190px;
      height: 190px;
      border: 1px solid pink;
      img{
        width: 100%;
      }
    }
  }
  .ri{
    flex: 3;
    li:nth-child(2n){
      background: #f5f5f7;
    }
    li{
      line-height: 40px;
      height: 40px;
    }
    .title{
      display: flex;
      justify-content: space-between;
      i{
        padding: 0 15px;
        font-size: 24px;
      }
    }
    .content{
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      margin-bottom: -1px;
      color: #888888;
      border: 1px solid #e1e1e2;
      i{
        font-size: 20px;
        color: red;
      }

      span{
        padding: 0 10px;
      }
    }
    .content:hover{
      background:pink ;
    }
  }
}

</style>
