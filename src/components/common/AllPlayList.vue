
<template>
  <div :style="`text-align:${textAlign}`">
    <div class="catgory" id="catgory" @click.stop="">
      <el-button type="primary" size="mini" @click="state = !state"
        >{{ btncontent
        }}<i class="el-icon-arrow-down" style="padding-left: 6px"></i
      ></el-button>
      <div class="cg-card" v-show="state">
        <div style="border-bottom: 1px solid #e1e1e2; margin-bottom: 10px">
          <span>添加标签</span>
        </div>
        <div class="scroll">
          <div>
            <!-- 全部视频 -->
            <div class="a" @click="checked(all.name)">
              <span>{{ all.name }}</span
              ><i class="el-icon-check check" :name="all.name"></i>
            </div>

            <div class="b" v-for="(item1, index1) in video?1:categories" :key="index1">
              <span class="le" v-if="!video" style="flex:1">
                <i class="el-icon-orange"
                  style="font-size: 30px; vertical-align: top"
                ></i>
                {{ item1 }}</span>

              <!-- 子导航 -->
              <div style="display: inline-block;flex:5 ">
                <span
                  class="ri"
                  v-for="(item2, index2) in video?sub:sub.filter((item) => item.category === parseInt(index1))"
                  :key="index2"
                  @click="checked(item2.name,item2.id)"
                >
                  <span>{{ item2.name }}</span>
                  <i class="h"> {{ item2.hot ? "hot" : "" }}</i>
                  <i class="el-icon-check check" :name="item2.name"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playList',
  data () {
    return {
      // 分类卡片状态
      state: false,
      // 按钮内容
      btncontent: '全部歌单',
      // 请求到的歌单分类总数据
      listdata: {},
      // 主目录
      categories: null,
      // 子目录
      sub: [],
      all: ''
    }
  },
  props: {
    textAlign: {
      default: 'left'
    },
    video: {
      default: false
    }
  },
  methods: {
    // 根据groupId 来请求当前所选分类的视频数据
    getVideoList (groupId) {
      console.log(groupId)
      this.$axios.get('/video/group', { params: { id: groupId } }).then(res => {
        console.log(res.data)
      })
    },

    // 根据check tag 来请求当前所选分类的歌单数据
    getPlaylists (tag) {
      this.$diy.getPlayListUser(tag).then((res) => {
        this.$emit('share', res)
      })
    },
    // 勾选当前
    checked (tag, groupId) {
      this.state = false
      this.unChecked()
      // 选出所有的check标签
      const active = document
        .querySelector('#catgory')
        .querySelectorAll('.check')
      // eslint-disable-next-line array-callback-return
      Array.from(active).some((item) => {
        if (item.getAttribute('name') === tag) {
          item.style.display = 'block'
          this.btncontent = tag
          return true
        }
      })

      this.video ? this.getVideoList(groupId) : this.getPlaylists(tag)
    },

    // 取消所有勾选
    unChecked () {
      document
        .querySelector('#catgory')
        .querySelectorAll('.check')
        .forEach((item) => {
          item.style.display = 'none'
        })
    },
    // 请求歌单分类数据
    async getListCategory () {
      const { data: res } = await this.$axios.get('/playlist/catlist')

      this.listdata = res
      this.categories = res.categories
      this.sub = res.sub
      this.all = res.all
    },
    // 请求视频分类数据
    getVideoListCategory () {
      this.btncontent = '全部视频'
      this.$axios.get('/video/group/list').then(res => { this.sub = res.data.data })
    }
  },
  mounted () {},
  created () {
    this.video ? this.getVideoListCategory() : this.getListCategory()
    // 点击其他地方关闭搜索卡片
    document.addEventListener('click', () => {
      this.state = false
    })
  }
}
</script>

<style lang="less" scoped>
.catgory {
  text-align: left;
  position: relative;
  display: inline-block;
  //滚动条的修饰
  ::-webkit-scrollbar {
    width: 8px;
  }
  //滑块的修饰
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #e1e1e2;
  }

  .cg-card {
    position: absolute;
    z-index: 2;
    background-color: #fff;
    top: 60px;

    width: 540px;
    height: 415px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    line-height: 35px;
    .scroll {
      overflow: auto;
      height: 350px;
    }
    .a {
      width: 97%;
      position: relative;
      border: thin solid #c62f2f;
      text-align: center;
      i {
        font-size: 10px;
      }
    }
    .check {
      display: none;
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #c62f2f;
      color: #fff;
      border-radius: 10px 0 0 0;
    }
    .b {

      display: flex;
      margin: 10px 0;
      span {
        display: inline-block;
        width: 87px;
        margin-right: -1px;
        margin-bottom: -1px;

        text-align: center;
      }
      .le {

        vertical-align: top;
        text-align: left;
        color: #ce4e4e;
      }
      .ri {
        position: relative;
        float: left;
        border: 1px solid #e1e1e2;
        border-collapse: collapse;
        border-spacing: 0;
        font-size: 12px;
      }
      .h {
        position: absolute;
        top: 3px;
        right: 1px;
        font-size: 5px;
        color: #c62f2f;
        line-height: 6px;
      }
    }
  }
}
</style>
