<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <el-card class="discuss-item" shadow="hover">
        <div id="user-icon">
          <img src="../assets/background.jpg" />
        </div>
        <div style="display:inline-block; width:85%;vertical-align:top">
          <div id="username">{{comment.user_name}}</div>
          <div id="discuss-text">{{comment.content}}</div>
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
import { getComments } from '@/api/comments'

var src = require('../assets/background.jpg');

export default {
  name: 'TaskDiscussPage',
  beforeMount() {
    let task_id = this.$route.query.task_id;
    let Loading = this.$loading({
      lock: true,
      text: '正在从数据库获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    getComments(task_id).then(response => {
      const status = response.status;
      if (status === 200) {
        console.log(response.data);
        this.comments = response.data.data;
        Loading.close();
      }
      else
        throw response.data.error;;
    }).catch(err => {
      this.$message.error(err);
    })
  },
  data() {
    return {
      comments: [],
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

/* 评论文字 */
#discuss-text {
  margin-top: 1%;
  font-size: 100%;
}

/* 底部footer信息栏 */
#footer {
  margin-top: 1%;
  margin-left: 65px;
}

.footer-item {
  margin-right: 10px;
  cursor: pointer;
  font-size: 100%;
}


</style>
