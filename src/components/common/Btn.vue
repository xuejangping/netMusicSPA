<template>
  <div class="btn">
    <span id="diybtn" v-for="(item, index) in items" :key="index" @click="click(index,$event)">{{item}}</span>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      default: 2
    }
  },
  methods: {
    click (index, e) {
      e.target.parentNode.querySelectorAll('#diybtn').forEach(element => {
        element.classList.remove('active')
      })
      e.target.classList.add('active')
      this.$emit('click', index)
    }
  },
  created () {

  },
  mounted () {
    this.$el.querySelector('#diybtn').classList.add('active')
  }

}
</script>

<style lang="less" scoped>
.btn{
  padding: 20px 0;
}
.active{
  background-color: #7c7d85;
  color: #fff;
}
span{
  color: #8e8e8e;
  display: inline-block;
  border: 1px solid #ebebeb;
  margin-left: -1px;
  line-height: 24px;
  font-size: 12px;
 border-radius: 4px;
  padding: 0px 22px;
}

</style>
