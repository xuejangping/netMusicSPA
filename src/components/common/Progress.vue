/* eslint-disable vue/no-mutating-props */
<template>
  <div :style="inline?'display:inline-block':''">

     <input type="range" name="" id="" :value="percentage"

     :style="`background: linear-gradient(to right, #d33030 ${percentage}%, #c2c2c4 ${percentage}%);width:${width}`"
     @input="input"
     >

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    percentage: {
      default: 20
    },
    width: {
      default: '50%'
    },
    inline: {
      default: false
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e.target.value)
    }
  }

}
</script>

<style lang="less" scoped>

input[type=range]{
  -webkit-appearance: none;

  height: 5px;
  border-radius: 2px;
}
input[type=range]::-webkit-slider-thumb{
-webkit-appearance: none;
height: 12px;
width: 12px;
background: #fff;
border: 1px solid #c6c6c6;
border-radius: 50%;
}
</style>
