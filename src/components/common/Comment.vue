<template>
  <div style="width:100%">
    <div v-if="header">
      <h3 style="border-bottom: 1px solid red;padding:40px 0 5px">
        <span style="padding-right:20px">{{ headername}}</span>
        <span style="font-size:16px;color:#888888">(已有{{commentCount}} 条评论)</span> </h3>
     <div class="input-container">
      <div style="position: relative;">
        <textarea name="comment" id="" cols="30" rows="10" :maxlength="maxlength" v-model="inputtext"></textarea>
        <span style="position:absolute;bottom:5px;right:5px;color:#a599b2">{{ maxlength-inputtext.length}}</span>
       </div>
      <div style="text-align:right"><el-button size="mini" @click="comment">评论</el-button></div>
      </div>
    </div>

    <!-- 评论区 -->
    <h5 style="border-bottom: 1px solid #ebeef5; padding:30px 0 5px" v-if="title">
      {{title}}
    </h5>
    <!-- 评论内容 -->
    <div v-if="content" :style="gradient?'background:linear-gradient(45deg, #f2f4f9, transparent)':'background:linear-gradient(135deg, #EBEEF5, transparent)'">
      <div style="display: flex;border-bottom:1px solid #ebeef5;">
      <div class="avatar">
        <el-avatar
          :src="avaSrc"
        ></el-avatar>
      </div>
      <div class="text">
        <div style="color:#606266">
          <span><router-link to="">{{ uname }}</router-link>:</span> <span>{{ text }}</span>
        </div>
        <div style="color:#909399;padding-top:20px">
          <span>{{ time|dateFormat }}</span>
          <div class="action">
            <span class="border-right"
              ><van-icon name="good-job-o" />({{ praise }})</span
            >
            <span class="border-right">分享</span><span>回复</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputtext: ''

    }
  },
  props: {
    maxlength: {
      default: 140
    },
    // 评论列表渐变效果
    gradient: {
      default: false
    },
    header: {
      default: true
    },
    headername: { default: '评论' },

    content: {
      default: true
    },
    title: {
      default: null
    },
    commentCount: {
      default: 123
    },
    avaSrc: {
      default: ''
    },
    uname: {
      default: 'uname'
    },
    text: {
      default: ''
    },
    time: {
      default: 'time'
    },
    praise: {
      default: 123
    }

  },
  methods: {
    comment () {
      this.$emit('comment', this.inputtext)
    }
  }
}
</script>

<style lang="less" scoped>
.input-container {
  padding: 15px;
  background:#f3f8f8;

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    resize: none;
    border: 1px solid #cfd5e6;
    padding: 5px;
    line-height: 20px;
  }
}
.avatar {
  flex: 1;
  padding: 0 5px;

  margin: 0;
}
.text {
padding: 10px 5px;
  flex: 11;

  .action {
    float: right;
    span {
      padding: 0 10px;
    }
  }
}

.border-right {
  border-right: 1px solid #e3dfd8;
}
</style>
