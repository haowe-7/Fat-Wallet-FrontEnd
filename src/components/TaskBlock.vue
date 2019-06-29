<template>
  <div>
    <el-card class="box-card">
      <div id="task-title">{{ taskInfo.title }}</div>
      <div id="content">
        <img :src="getImageUrl()"/>
        <div id="info" v-on:click="viewTaskClick">
          <div class='item'> 发布人：{{ taskInfo.creator_name }} </div>
          <div class='item'> 任务类型：{{ getTaskTypeName() }} </div>
          <div class='item'> 任务报酬：{{ taskInfo.reward }}元/次 </div>
          <div class='item'> 任务简介：{{ taskInfo.description }} </div>
        </div>
      </div>
      <div id="footer">
        <span class='footer-item'><i class="el-icon-edit-outline"></i> 参与 {{ taskInfo.participators.length }}</span>
        <span class='footer-item'><i class="el-icon-edit"></i> 评论 {{ taskInfo.num_comments }}</span>
        <span class='footer-item' v-on:click="handleCollect"><i :class="collect_icon"></i> {{ collect_text }}</span>
        <span class='footer-item'><i class="el-icon-share"></i> 分享</span>
        <span class='footer-item'><i class="el-icon-view"></i> 查看</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { createCollect, deleteCollect } from '@/api/collects';

export default {
  name: 'TaskBlock',
  props: ['taskInfo'],
  components: {
  },
  beforeMount() {
    if (this.taskInfo.is_collect) {
      this.collect_text = '已收藏';
      this.collect_icon = 'el-icon-star-on';
    } else {
      this.collect_text = '收藏';
      this.collect_icon = 'el-icon-star-off';
    }
  },
  data() {
    return {
      collect_icon: 'el-icon-star-off',
      collect_text: '收藏'
    };
  },
  methods: {
    viewTaskClick() {
      this.$router.push({ path: '/mainpage/task-breif-info?task_id=' + this.taskInfo.task_id });
    },
    getImageUrl() {
      if (this.taskInfo && this.taskInfo.image) {
        return this.taskInfo.image;
      }
      return '../assets/background.jpg';
    },
    getTaskTypeName() {
      switch (this.taskInfo.task_type) {
        case 1: return '问卷调查';
        case 2: return '协会招新';
        case 3: return '快递代收';
      }
    },
    handleCollect() {
      if (this.collect_text === '收藏') {
        createCollect(this.taskInfo.task_id)
          .then(response => {
          if (response.status === 200) {
            this.taskInfo.is_collect = false;
            this.collect_text = '已收藏';
            this.collect_icon = 'el-icon-star-on';
            this.$message({
              message: '收藏成功！',
              type: 'success'
            });
          } else {
            throw response.data.error;
          }
        })
          .catch(err => {
          this.$message.error('收藏失败：'+err);
        })
      } else {
        deleteCollect(this.taskInfo.task_id)
        .then(response => {
          if (response.status === 200) {
            this.taskInfo.is_collect = true;
            this.collect_text = '收藏';
            this.collect_icon = 'el-icon-star-off';
            this.$message({
              message: '收藏已取消！',
              type: 'success'
            });
          } else {
            throw response.data.error;
          }
        })
        .catch(err => {
          this.$message.error('取消收藏失败：'+err);
        })
      }
    }
  },
};
</script>

<style scope>
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
