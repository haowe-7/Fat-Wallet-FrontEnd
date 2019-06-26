<template>
  <div>
    <div v-for="o in 5" :key="o">
      <el-card class="user-item" shadow="hover">
        <div id="user-icon">
          <img src="../assets/background.jpg" />
        </div>
        <div style="display:inline-block; width:75%; vertical-align:top">
          <div id="username">Messiah</div>
          <div id="discuss-text">一个抱紧大佬大腿的程序猿~</div>
        </div>
        <el-button id="edit-button" :class="controlButtonVisible ? '' : 'invisible'" round>{{controlButtonText}}</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
var src = require('../assets/background.jpg');
export default {
  name: 'TaskDiscussPage',
  components: {
  },
  props: {
    controlButtonVisible: {
      type: Boolean,
      default: true
    }, 
    controlButtonText: {
      type: String,
      default: '同意申请'
    }
  },
  data() {
    return {
      src
    };
  },
  methods: {
  },
};
</script>

<style scoped>

/* 卡片item */
.user-item {
  margin-top: 1%;
  border-radius: 6px;
}

/*用户头像*/
#user-icon {
  display: inline-block;
  width: 48px;
  height:48px;
  margin-right: 12px;
  margin-left: 0px;
  position:relative;
  padding-bottom: 0px;
}

#user-icon img {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
}

/* 用户名 */
#username {
  font-size: 120%;
  color: cornflowerblue;
  font-weight: bold;
}

/* 个人签名 */
#discuss-text {
  margin-top: 1%;
  font-size: 100%;
  overflow: hidden;
}

/* 控制按钮 */
#edit-button {
  display: inline-block;
  width: 15%;
}

.invisible {
  display: none !important;
}

</style>
