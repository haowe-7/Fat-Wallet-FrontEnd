<template>
  <div id="breif-task-page">
    <el-card class="box-card">
      <div slot="header">
        <span style="font-size:120%; font-weight:bold;">{{ taskInfo ? taskInfo.title : '' }}</span>
        <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading" round v-on:click="controlButtonClick">{{controlStatus}}</el-button>
      </div>
      <div v-for="o in 5" :key="o" class="task-item">
        <span class="item-title">{{itemTitle[o-1]}}</span>
        <span class="item-text">{{itemText[o-1]}}</span>
      </div>
      <div id="task-asso-info-div">
        <router-link to="/mainpage/task-breif-info/discuss">
          <el-badge :value="taskInfo ? taskInfo.num_comments : 0" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">评论</el-button>
          </el-badge>
        </router-link>
        <router-link to="/mainpage/task-breif-info/applicant">
          <el-badge :value="applicant_nums" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">申请者</el-button>
          </el-badge>
        </router-link>
        <router-link to='/mainpage/task-breif-info/participator'>
          <el-badge :value="participator_nums" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">参与者</el-button>
          </el-badge>
        </router-link>
        <router-view></router-view>
      </div>
    </el-card>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskBreifInfoPage',
  beforeMount() {
    let task_id = this.$route.query.task_id;
    let Loading = this.$loading({
      lock: true,
      text: '正在从数据库获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    this.$store.dispatch('GetRecommendTasks', 0, 10).then(() => {
      this.taskInfo = this.RecommendTaskList[0]
      Loading.close();
      this.UpdateApplicantNums();
      this.UpdateParticipatorNums();
      this.itemText = [
        this.getTaskTypeName(),
        this.taskInfo.reward + '元/人',
        this.taskInfo.max_participate + '人',
        this.taskInfo.due_time,
        this.taskInfo.description
      ]
    });
  },
  data() {
    return {
      loading: false,
      taskInfo: null,
      applicant_nums: 0,
      participator_nums: 0,
      controlStatus: '申请参加',
      itemTitle: ['类型', '报酬', '人数', '期限', '简介'],
      itemText: ['问卷调查', '1元/人', '20人', '2019-07-01 23:59:59', '针对所有中大学生，调查学生对于计算机专业的认识和看法。']
    };
  },
  computed: {
    ...mapGetters({
      RecommendTaskList: 'recommend_task_list'
    })
  },
  methods: {
    controlButtonClick() {
      if (this.controlStatus === '申请参加') {
        console.log('申请参加');
        this.controlStatus = '申请中';
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.controlStatus = '查看详情';
        }, 1000);
      } else if (this.controlStatus === '查看详情') {
        console.log('查看详情');
        let task_id = this.$route.query.task_id;

        this.$router.push({ path: '/mainpage/ques-task-detail?task_id='+task_id });
        // this.$router.push({ path: '/mainpage/deliver-task-detail?task_id='+task_id });
      }
    },
    UpdateApplicantNums () {
      this.applicant_nums = 0;
      if (!this.taskInfo)
        return;
      for (let p of this.taskInfo.participators) {
        if (p.status === '申请中') {
          this.applicant_nums  += 1;
        }
      }
    },
    UpdateParticipatorNums: function () {
      this.participator_nums = 0;
      if (!this.taskInfo)
        return;
      for (let p of this.taskInfo.participators) {
        if (p.status === '进行中') {
          this.participator_nums += 1;
        }
      }
    },
    getTaskTypeName() {
      switch(this.taskInfo.task_type) {
        case 1: return '问卷调查';
        case 2: return '协会招新';
        case 3: return '快递代收';
      }
    },
  },
};
</script>

<style scoped>
/* 任务概述预览界面div */
#breif-task-page {
  width: 70%;
  margin-top: 3%;
  padding-bottom: 3%;
  margin-left: 15%;
  /* border: 1px solid gray; */
  border-radius: 10px;
}

/* 任务简介标示 */
#breif-task-nav-title {
  display: inline-block;
  width: auto;
  font-size: 200%;
  color: gray;
  margin-left: 3%;
  margin-top: 3%;
  border-block-end: 1px solid gray;
}

/* task任务简述表项item */
.task-item {
  margin-bottom: 3%;
}
.item-title {
  font-size: 120%;
  color: black;
}
.item-text {
  font-size: 120%;
  color: gray;
  margin-left: 50px;
}

/* 任务关联信息如讨论、参与者等nav button */
.asso-info-nav-button {
  margin-left: 30px;
  width: 100px;
}



</style>
