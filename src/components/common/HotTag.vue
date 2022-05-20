<template>
   <div class="hottags">
      <span style="min-width:40px"><span>{{ tagTitle}}:</span></span>
      <span class="right" >
        <span
        v-for="(item, index) in hottags"
        :index="index"
        :key="index"
        class="tag"
      >
        <span id="tag-item" style="padding:1px 8px;border-radius: 4px" @click="click(item.num?item.num:item,$event)">
          {{ item instanceof Object?item.name:item }}</span>
        </span>
      </span>

    </div>
</template>

<script>
export default {
  props: {
    name: {
      default: ''
    },
    tagTitle: {
      default: '热门标签：'
    },
    hottags: {
      default () {
        return []
      }
    }
  },

  methods: {
    click (num, e) {
      e.target.parentNode.parentNode.querySelectorAll('#tag-item').forEach(res => {
        res.classList.remove('active')
      })
      e.target.classList.add('active')
      this.$emit('click', [num, this.name])
    }
  }

}
</script>

<style scoped>
.right{
  display:flex;
  flex-wrap: wrap;
}
.hottags{
  padding: 10px 0;
  display:flex;
  font-size: 13px;
  line-height: 13px;

}
.tag {

  padding: 0 10px;
  margin-bottom: 15px;
  border-right: 1px solid pink;
  color: #666666;
}
.tag:last-child {
  border: 0;
}
.tag:hover {
  color: #333333;
}
.active{
  background: #8f9096;
  color: #fff;
}
</style>
