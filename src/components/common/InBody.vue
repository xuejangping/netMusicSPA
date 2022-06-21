<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted () {
    document.body.appendChild(this.$el)
  }

}
</script>

<style lang="less" scoped>

</style>
