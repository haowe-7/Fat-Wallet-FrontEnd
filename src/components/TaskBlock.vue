<template>
  <el-card class="box-card">
    <div id="task-title">心理系问卷调查</div>
    <div id="content">
      <img src="../assets/background.jpg"/>
      <div id="info">
        <div class='item'> 发布人：Mason </div>
        <div class='item'> 任务类型：问卷调查 </div>
        <div class='item'> 任务报酬：3元/次 </div>
        <div class='item'> 任务简介：针对大一刚入学新生，主要调查新生对于大学生活的感想，要求填写真实感受。 </div>
      </div>
    </div>
    <div id="footer">
      <span class='footer-item'><i class="el-icon-edit-outline"></i> 参与 20</span>
      <span class='footer-item'><i class="el-icon-edit"></i> 评论 50</span>
      <span class='footer-item'><i class="el-icon-star-off"></i> 收藏</span>
      <span class='footer-item'><i class="el-icon-share"></i> 分享</span>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'TaskBlock',
  components: {
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
.box-card {
  margin-top: 2%;
  padding: 2%;
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
