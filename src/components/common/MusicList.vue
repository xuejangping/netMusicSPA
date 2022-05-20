<template>
  <div>
    <table>
      <thead v-if="thead">
        <tr :style="`color:${color};`">
          <td style="border-left: 0; width: 50px">{{ th_1 }}</td>
          <td style="border-left: 0; width: 60px">{{ th_2 }}</td>
          <td>{{ th_3 }}</td>
          <td>{{ th_4 }}</td>
          <td>{{ th_5 }}</td>
          <td style="border-right: 0; width: 80px">{{ th_6 }}</td>
        </tr>
      </thead>
      <tbody style="font-size:14px">

        <tr v-for="(item, index) in table_data" :key="index" @dblclick="play(item)" :style="`background-color:${index%2!==0?'#f5f5f7':''}`">
          <td>{{ (index + 1 ).toString().padStart(2,'0')}}</td>
          <td>
            <!-- 需要根据请求来的数据判断是否为我喜欢，暂无数据，用index代替-->
            <van-icon
              name="like"
              :color="Math.round(Math.random()*index) % 2 === 0 ? 'red' : '#e9ebec'"
              @click="changeLike"
              size="18"
            />
          </td>
          <!-- 音乐标题 -->
          <td style="color:#333333;display:flex;flex-direction: column;">
            <span >{{ item.name }} <span @click="toMVList(item.mv)" v-if="item.mv"><van-icon name="video" color="#d65151" size="18px" /></span> </span>
            <span >{{ item.alia?item.alia[0]:'' }}</span></td>
          <td>
            <!-- 歌手显示 -->
            <span v-for="(res, index) in item.ar" :key="index">
              <router-link :to="{path:'/albumlist/'+res.id,query:{name:'singer'}}">{{
                index > 0 ? "/" + res.name : res.name
              }}</router-link></span
            >
          </td>
          <!-- 专辑 -->
          <td ><span @click="toAlbumlist(item.al.id)">{{ item.al.name }}</span></td>
          <!-- 规定歌曲时间显示格式，加“0”，保留两位小数 -->
          <td>{{  item.dt|timeFormat }}</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import bus from '@/tools/eventBus.js'
export default {
  data () {
    return {}
  },

  props: {
    th_1: { default: '' },
    th_2: { default: '操作' },
    th_3: { default: '音乐标题' },
    th_4: { default: '歌手' },
    th_5: { default: '专辑' },
    th_6: { default: '时长' },
    // 表头文字颜色
    color: { default: '#666666' },

    table_data: {},

    thead: {
      default: true
    }
  },
  methods: {
    // 切换当前点击的喜欢颜色，需要发送Ajax请求，传递状态，无可用API省略，只做切换颜色功能
    changeLike (e) {
      e.target.style.color === 'red'
        ? (e.target.style.color = '#e9ebec')
        : (e.target.style.color = 'red')
    },
    play (musicId) {
      bus.$emit('play', musicId)
    },
    toMVList (mvId) {
      this.$router.push(`/video/${mvId}/0`)
    },
    toAlbumlist (albumId) {
      this.$router.push({ path: `/albumlist/${albumId}`, query: { name: 'album' } })
    }
  }
}
</script>

<style lang="less" scoped>
table {

  font-size: 15px;
  width: 100%;
  margin-top: 15px;
  border-collapse: collapse;
  border-spacing: 0;
  color: gray;
  line-height: 40px;

  // 设置不能换行，多余的用省略号
  td {

    overflow: hidden;
    text-overflow: ellipsis;
    // white-space: nowrap;
  }
  thead td {
    border: thin solid #e1e1e2;
  }
  tbody tr:hover{
    background-color: #ededed;

  }
}
</style>
