<template>
  <div class="tabs" :style="`text-align:${align};`">
    <span class="subtab"
    :style="`margin:0 ${marginLR}px;`"
     v-for="(item, index) in items" :key="index" @click="click(index,$event)">{{item}}</span>

  </div>
</template>

<script>
export default {
  props: {
    items: {
      default: 2
    },
    align: {
      default: 'left'
    },
    marginLR: {
      default: 10
    }
  },
  methods: {
    click (index, e) {
      e.target.parentNode.querySelectorAll('.subtab').forEach(element => {
        element.classList.remove('active')
      })
      e.target.classList.add('active')
      this.$emit('click', index)
    }
  },
  mounted () {
    this.$el.querySelector('.subtab').classList.add('active')
  }

}
</script>

<style lang="less" scoped>
.tabs{
  margin: 5px 0;

  border-bottom: 2px solid #e1e1e2;
  line-height: 40px;
  .subtab{
    color: #666666;
    cursor: pointer;
    padding: 10px  0;

  }
  .active{
    border-bottom: 4px solid #999999;
    padding: 10px 0;
    color: red;
  }
}
</style>
