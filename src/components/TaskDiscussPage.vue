<template>
  <div>
    <div v-for="o in 5" :key="o">
      <el-card class="discuss-item" shadow="hover">
        <div id="user-icon">
          <img src="../assets/background.jpg" />
        </div>
        <div style="display:inline-block; width:80%;vertical-align:top">
          <div id="username">SYSUCarey</div>
          <div id="discuss-text">这么好的问卷么好来一哈么好的然我么么好的问卷么好来一哈么好的然我要来一哈拉么好的问卷么好来一哈么好的然我要来一哈拉好的问卷么好来一哈么好的然我要来一哈拉么好的问卷么好来一哈么好的然我要来一哈拉要来一哈拉</div>
        </div>
        <div id="footer">
          <span class="footer-item"><i class="el-icon-star-off"></i> 点赞 20</span>
          <span class="footer-item"><i class="el-icon-edit-outline"></i> 回复 </span>
        </div>
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
.discuss-item {
  margin-top: 1%;
  border-radius: 6px;
}

/*用户头像*/
#user-icon {
  display: inline-block;
  width: 48px;
  height:48px;
  margin-right: 1%;
  position:relative;
  
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

/* 评论文字 */
#discuss-text {
  margin-top: 1%;
  font-size: 100%;
}

/* 底部footer信息栏 */
#footer {
  margin-top: 1%;
  margin-left: 58px;
}

.footer-item {
  margin-right: 10px;
  cursor: pointer;
}


</style>
