<template>
  <div>
    <el-card class="notice-item" shadow="hover">
      <div id="user-icon">
        <img src="../../assets/background.jpg" />
      </div>
      <div style="display:inline-block; width:75%; vertical-align:top">
        <div id="username">{{userName}}</div>
        <div id="notice-text">{{noticeText}}~</div>
      </div>
      <el-button id="edit-button" :class="controlButtonVisible ? '' : 'invisible'" round>{{controlButtonText}}</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'NoticeBlock',
  props: {
    controlButtonVisible: {
      type: Boolean,
      default: true
    }, 
    controlButtonText: {
      type: String,
      default: '已读'
    },
    userName: {
      type: String,
      default: 'SYSUcarey'
    },
    noticeText: {
      type: String,
      default: '这是一条来自世界最帅的人的温馨通知哦😯'
    }
  },
  components: {
  },
  beforeMount() {
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style>
/* 卡片item */
.notice-item {
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
#notice-text {
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
