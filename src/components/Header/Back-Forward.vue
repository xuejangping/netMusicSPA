<template>

    <div class="back-forward">

      <button @click="$router.back()">
        <i class="el-icon-arrow-left"></i>
      </button>
      <button @click="$router.forward()">

        <i class="el-icon-arrow-right"></i>
      </button>

    </div>

</template>

<script>
export default {}
</script>

<style lang="less" scoped>
// 前进后退按钮
.back-forward{
  display: flex;
  align-items: center;
  margin: 0 30px;

  button{
   line-height: 24px;
   background-color: rgba(0,0,0, .0) ;
   border-radius: 4px;
    height: 26px;
   width: 35px;
   border-color: rgba(255,255,255, .3);

  }
  i{
    color: #fff;
    font-size: 18px;

  }
}
</style>
