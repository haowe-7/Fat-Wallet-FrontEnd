<template>
  <div id="breif-task-page">
    <el-card class="box-card">
      <div slot="header">
        <span style="font-size:120%; font-weight:bold;">数据院问卷调查</span>
        <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading" round v-on:click="controlButtonClick">{{controlStatus}}</el-button>
      </div>
      <div v-for="o in 5" :key="o" class="task-item">
        <span class="item-title">{{itemTitle[o-1]}}</span>
        <span class="item-text">{{itemText[o-1]}}</span>
      </div>
      <div id="task-asso-info-div">
        <router-link to="/mainpage/task-breif-info/discuss">
          <el-badge :value="23" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">评论</el-button>
          </el-badge>
        </router-link>
        <router-link to="/mainpage/task-breif-info/applicant">
          <el-badge :value="5" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">申请者</el-button>
          </el-badge>
        </router-link>
        <router-link to='/mainpage/task-breif-info/applicant'>
          <el-badge :value="2" class="asso-info-badge"> 
            <el-button class="asso-info-nav-button">参与者</el-button>
          </el-badge>
        </router-link>
        <router-view></router-view>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'TaskBreifInfoPage',
  components: {
  },
  data() {
    return {
      loading: false,
      controlStatus: '申请参加',
      itemTitle: ['类型', '报酬', '人数', '期限', '简介'],
      itemText: ['问卷调查', '1元/人', '20人', '2019-07-01 23:59:59', '针对所有中大学生，调查学生对于计算机专业的认识和看法。']
    };
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
        }, 2000);
      } else if (this.controlStatus === '查看详情') {
        console.log('查看详情');
        this.$router.push({ path: '/mainpage/deliver-task-detail' });
      }
    }
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
