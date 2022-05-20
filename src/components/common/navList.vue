<template>
  <div>
    <dl v-for="(item, index) in listdata" :key="index">
      <dt>
        <span style="padding: 0 20px">{{ item.title }}</span>
      </dt>
      <dd
       class="in-one-line"
        v-for="(item, index) in item.lists"
        :key="index"
        :index="item.name"
        name="dd"
        @click="click(item.path,$event)"
      >
        <span class="le " id="le" :index="item.name"></span>
        <span class="ri" style="padding: 0 20px" :index="item.name">
          <span style="padding: 0 10px" :index="item.name"><i :class="item.icon" :index="item.name"></i></span>
          <span :index="item.name">{{ item.name }}</span>
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    listdata: {}
  },

  methods: {
    click (path, e) {
      this.$emit('click', e)
      //  若点击相同页面，阻止跳转
      if (this.$route.path === path) return
      this.$router.push({ path: path, query: { name: 'playlist' } })
    }

  }
}
</script>

<style  lang="less" scoped>
dl {
  margin-bottom: 30px;

  dt {
    color: #8585a0;
    height: 35px;
  }
  dd {
    transition: all .2s;
    cursor: pointer;
    color: #5c5c5c;
// 一行显示

   max-width: 100%;

    margin-left: 0px;
    height: 45px;
    line-height: 40px;
    i {
      font-size: 20px;
      color: #000;
      font-weight: 800;

    }
    .le {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      width: 3px;

    }
  }
  dd:hover {
    background-color: #eaecee;
    color: #000;
    font-weight: 600;
    box-shadow: 1px 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .active {
background-color:#c62f2f ;

  }
}
</style>
