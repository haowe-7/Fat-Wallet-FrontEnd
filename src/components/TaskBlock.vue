<template>
  <div v-on:click="viewTaskClick">
    <el-card class="box-card">
      <div id="task-title">心理系问卷调查</div>
      <div id="content">
        <img :src="getImageUrl(taskInfo.image)"/>
        <div id="info">
          <div class='item'> 发布人：{{ taskInfo.creator_name }} </div>
          <div class='item'> 任务类型：{{ getTaskTypeName(taskInfo.task_type) }} </div>
          <div class='item'> 任务报酬：{{ taskInfo.reward }}元/次 </div>
          <div class='item'> 任务简介：{{ taskInfo.description }} </div>
        </div>
      </div>
      <div id="footer">
        <span class='footer-item'><i class="el-icon-edit-outline"></i> 参与 {{ taskInfo.participators.length }}</span>
        <span class='footer-item'><i class="el-icon-edit"></i> 评论 50</span>
        <span class='footer-item'><i class="el-icon-star-off"></i> 收藏</span>
        <span class='footer-item'><i class="el-icon-share"></i> 分享</span>
        <span class='footer-item'><i class="el-icon-view"></i> 查看</span>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'TaskBlock',
  props: ['taskInfo'],
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    viewTaskClick() {
      console.log('viewTaskClick');
      this.$router.push({ path: '/mainpage/task-breif-info' });
    },
    getImageUrl(url) {
      if (url)
        return url;
      return "../assets/background.jpg"
    },
    getTaskTypeName(task_type) {
      switch(task_type) {
        case 1: return '问卷调查'; break;
        case 2: return '协会招新'; break;
        case 3: return '快递代收'; break;
      }
    }
  },
};
</script>

<style>
.box-card {
  margin-top: 2%;
  padding: 2%;
  cursor: pointer;
}

#task-title {
  font-size: 160%;
  font-weight: bold;
  color: gray;
  margin-bottom: 2%;
}

img {
  width: 35%;
}

#info {
  display: inline-block;
  width: 60%;
  height: 100%;
  margin-left: 3%;
  font-size: 150%;
  color: #AAAAAA;
}

.item {
  margin-bottom: 1%;
}

#footer {
  margin-top: 1%;
}

.footer-item {
  font-size: 140%;
  color: #888888;
  margin-right: 5%;
}

</style>
