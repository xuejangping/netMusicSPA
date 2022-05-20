<template>

     <div class="rowlist" @click="click" @dblclick="dblclick" :style="`background-color:${bgColor}`">
       <span class="order" v-if="order">{{order}}</span>
       <span style="position: relative;"><img :src="src" alt="" :style="`width:${imgwidth};height:${imgheight}`"
       > <i v-if="playbtn" class="el-icon-video-play playbtn"></i></span>

       <slot name="content">
         <span class="name inoneline">{{name}} <span v-for="(item,index) in alias" :key="index">({{item}})</span>
         <span style="padding:0 5px;font-size:15px;color:orange"><van-icon name="star"  v-if="icon" /></span>
         </span>
       <span class="slot-left" ><slot name="left"></slot> </span>
       <span class="slot-middle" ><slot name="middle"> </slot></span>
       <span class="slot-right" ><slot name="right"> </slot></span>
       </slot>

     </div>

</template>

<script>
export default {

  props: {
    imgwidth: { default: '60px' },
    imgheight: { default: '60px' },
    playbtn: {
      default: false
    },
    order: {
      default: true
    },
    icon: {
      default: false
    },
    bgColor: {},
    src: {},
    name: {},
    alias: {}
  },
  methods: {
    click () {
      this.$emit('click')
    },
    dblclick () {
      this.$emit('dblclick')
    }
  }
}
</script>

<style lang="less" scoped>
.playbtn{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-44%);
  font-size: 35px;
  color: #eee5e4;
  font-weight: 100;
}
.rowlist:hover{

  background: #ebeced !important;
}
.rowlist{
  display: flex;
  box-sizing: border-box;
  text-align: left;
  max-height: 70px;
  padding: 6px 0;
  line-height: 45px;

  .order{
    padding: 0 15px;
  }

  img{

    vertical-align: middle;
  }
  .name{
    flex: 8;
    padding: 0 20px;
  }

  .slot-left,.slot-middle,.slot-right{
    flex: 4;
    color: #666666;
    span{
      padding: 0 10px;
    }
  }
  .slot-middle,.slot-right{
    text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 1; /* 这里是超出几行省略 */
     overflow: hidden;

  }
  .inoneline{
    white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis;
  }
}

</style>
