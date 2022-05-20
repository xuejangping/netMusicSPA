<template>
  <div>
    <div class="ri">
        <ul v-if="listData">
          <li class="title"><span>{{title}}</span> <span> <i :class="titleIcon[0]"></i> <i :class="titleIcon[1]"></i></span></li>
          <li class="content"  :style="`border: ${border}px solid #e1e1e2;`" v-for="(item2, index2) in listData" :key="index2"
          @dblclick="dblclick(item2)"

          >
            <span class="in-one-line">
              <span v-if="order">{{`${index2+1}`.padStart(2,'0')}}</span>
              <span v-if="sugar"><i :style="`color:${index2%2?'blue':'red'}`" class="el-icon-sugar"></i></span>
              <span style="color:#333333">{{ item2.name}}</span>
              <span>{{(item2.alia?item2.alia:item2.alias).length===0?'':`(${item2.alia[0]})`}}</span>
            </span>
            <span style="padding:0 30px">{{ item2.dt|timeFormat}}</span>
          </li>
        </ul>

      </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'title'
    },
    titleIcon: {
      default () {
        return ['el-icon-folder-add', 'el-icon-video-play']
      }
    },
    listData: {
      default: null
    },
    order: {
      default: true
    },
    sugar: {
      default: true
    },
    border: {
      default: 1
    }
  },
  methods: {
    dblclick (item2) {
      this.$emit('dblclick', item2)
    }
  }

}
</script>

<style lang="less" scoped>
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

</style>
