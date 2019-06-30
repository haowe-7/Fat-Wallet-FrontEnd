<template>
  <div id="breif-task-page">
    <el-card class="box-card">
      <div slot="header">
        <span style="font-size:120%; font-weight:bold;">{{ taskInfo ? taskInfo.title : '' }}</span>
        <el-button style="float: right; font-size:100%; padding: 8px; width: 150px;"
          v-if="bottonTextDisplay"
          type="primary"
          round plain
          :loading="loading"
          v-on:click="controlButtonClick">
          {{buttonText}}</el-button>
      </div>
      <div v-for="o in 5" :key="o" class="task-item">
        <span class="item-title">{{itemTitle[o-1]}}</span>
        <span class="item-text">{{itemText[o-1]}}</span>
      </div>
      <div id="task-asso-info-div">
        <router-link :to="'/mainpage/task-breif-info/discuss?task_id=' + (taskInfo ? taskInfo.task_id : 0 )">
          <el-badge :value="taskInfo ? taskInfo.num_comments : 0" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">评论</el-button>
          </el-badge>
        </router-link>
        <router-link :to="'/mainpage/task-breif-info/applicant?task_id=' + (taskInfo ? taskInfo.task_id : 0)" >
          <el-badge :value="current_task_info ? current_task_info.participators.filter(
              p => {return p.status === '申请中';}
            ).length : 0" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">申请者</el-button>
          </el-badge>
        </router-link>
        <router-link :to="'/mainpage/task-breif-info/participator?task_id=' + (taskInfo ? taskInfo.task_id : 0)">
          <el-badge :value="current_task_info ? current_task_info.participators.filter(
              p => {return p.status === '进行中' || p.status === '审批中' || p.status === '已完成';}
            ).length : 0" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">参与者</el-button>
          </el-badge>
        </router-link>
        <router-view></router-view>
      </div>
    </el-card>
  </div>

</template>

<script>
import { getTaskInfo } from '@/api/tasks';
import { applyForParticipates } from '@/api/participates';
import { mapGetters } from 'vuex';

export default {
  name: 'TaskBreifInfoPage',
  beforeMount() {
    const task_id = this.$route.query.task_id;
    const Loading = this.$loading({
      lock: true,
      text: '正在从数据库获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });

    const queryJson = {
      'offset': task_id,
      'limit': 1
    };

    this.$store.dispatch('GetTaskInfo', queryJson).then(() => {
      this.taskInfo = this.current_task_info;
      if (this.taskInfo.creator_id === this.user_id) {
        this.bottonTextDisplay = false;
      } else {
        this.bottonTextDisplay = true;
      }
      for (let p of this.taskInfo.participators) {
        if (p.user_id === this.user_id) {
          console.log(p.status);
          if (p.status === '申请中') {
            this.buttonText = '等待审批';
          } else if (p.status === '进行中') {
            this.buttonText = '查看详情';
          } else if (p.status === '已完成') {
            this.buttonText = '已完成';
          } else if (p.status === '审批中') {
            this.buttonText = '等待审批';
          }
        }
      }
      this.itemText = [
        this.getTaskTypeName(),
        this.taskInfo.reward + '元/人',
        this.taskInfo.max_participate + '人',
        this.taskInfo.due_time,
        this.taskInfo.description
      ];
    }).catch(err => {
      this.$message.error('获取任务信息错误：' + err);
    }).finally(() => {
      Loading.close();
    });
  },
  data() {
    return {
      loading: false,
      taskInfo: null,
      applicant_nums: 0,
      participator_nums: 0,
      buttonText: '申请参加',
      bottonTextDisplay: false,
      itemTitle: ['类型', '报酬', '人数', '期限', '简介'],
      itemText: ['未知类型', '0元/人', '0人', '2019-07-01 00:00:00', '测试简介。']
    };
  },
  computed: {
    ...mapGetters({
      user_id: 'user_id',
      email: 'email',
      phone: 'phone',
      username: 'username',
      current_task_info: 'current_task_info'
    }),
    
  },
  methods: {
    controlButtonClick() {
      if (this.user_id === this.taskInfo.creator_id) {
        this.$message.error('异常错误');
        return;
      }
      if (this.buttonText === '申请参加') {
        this.buttonText = '申请中';
        this.loading = true;
        applyForParticipates(this.taskInfo.task_id).then(response => {
          const status = response.status;
          const data = response.data;
          if (status === 200) {
            this.$message.success('成功发起申请');
            this.current_task_info.participators = [{
              user_id: this.user_id,
              email: this.email,
              phone: this.phone,
              username: this.username,
              status: '申请中',
            }].concat(this.current_task_info.participators);
            this.$store.dispatch('UpDateCurrentTaskInfo', this.current_task_info);
            this.buttonText = '等待审批';
          } else {
            throw data.error;
          }
        }).catch(err => {
          this.$message.error('发起申请失败: ' + err);
          this.buttonText = '申请参加';
        }).finally(() => {
          this.loading = false;
        })
      } else if (this.buttonText === '查看详情') {
        let task_id = this.$route.query.task_id;
        if (this.taskInfo.task_type == 1)
          this.$router.push({ path: '/mainpage/ques-task-detail?task_id=' + task_id });
        else
          this.$router.push({ path: '/mainpage/deliver-task-detail?task_id=' + task_id });
      }
    },
    getTaskTypeName() {
      if (this.taskInfo) {
        switch(this.taskInfo.task_type) {
          case 1: return '问卷调查';
          case 2: return '协会招新';
          case 3: return '快递代收';
        }
      }
      return '未知类型';
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
