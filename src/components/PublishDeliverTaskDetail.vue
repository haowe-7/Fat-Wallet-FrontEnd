<template>
  <div id="publish=deliver-task-detail">
    <div id ='my-publish-task-title'>
      <span>快递任务发布详情</span>
    </div>
    <div>
      <div id='my-publish-task-info-input-box'>
        <el-form :model="taskForm" ref="taskForm" status-icon :rules="taskRules">
          <el-form-item prop="title">
            <el-input v-model="taskForm.title" placeholder="快递单号" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="reward">
            <el-input v-model="taskForm.reward" placeholder="快递柜" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="maxParticipant">
            <el-input v-model="taskForm.maxParticipant" placeholder="取件密码" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div> 
        <el-input style="font-size:120%"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="私人信息(如宿舍信息，个人联系方式)"
          v-model="taskForm.intro">
        </el-input>
      </div>
      <el-button id="my-task-submit-prestep-button" v-on:click="submitTaskPreStepButtonClick" round>上一步</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PublishDeliverTaskDetail',
  components: {
  },
  data() {
    return {
      imageUrl: '',
      taskForm: {
        type: '',
        title: '',
        reward: '',
        maxParticipant: '',
        endTime: '',
        intro: ''
      }
    };
  },
  methods: {
    submitTaskPreStepButtonClick() {
      console.log('pre step');
      this.$router.push({ path: '/mainpage/myinfo/mypublishtask' });
    }
  },
};
</script>

<style scoped>
/* 任务简介标示 */
#my-publish-task-title {
  display: inline-block;
  width: auto;
  font-size: 200%;
  color: gray;
  border-block-end: 1px solid gray;
}

/* 信息框模块 */
#my-publish-task-info-input-box {
  display: inline-block;
  width: 70%;
  margin-top: 3%;
}

/* el-input 类型选择项 */
.el-select {
  width: 120px;
}

/* 任务提交上一步按钮 */
#my-task-submit-prestep-button {
  float: right;
  margin-top: 3%;
  margin-bottom: 3%;
  font-size: 120%;
}

</style>
