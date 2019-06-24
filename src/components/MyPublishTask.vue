<template>
  <div>
    <div id ='my-publish-task-title'>
      <span>任务简介</span>
    </div>
    <div>
      <div id='my-publish-task-info-input-box'>
        <el-form :model="taskForm" ref="taskForm" status-icon :rules="taskRules">
          <el-form-item prop="type">
            <el-input v-model="taskForm.type" placeholder="类型" autocomplete="off">
              <el-select v-model="taskForm.type" slot="prepend" placeholder="请选择">
                <el-option label="问卷调查" value="问卷调查"></el-option>
                <el-option label="快递代领" value="快递代领"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item prop="title">
            <el-input v-model="taskForm.title" placeholder="标题" autocomplete="off">
              <template slot="prepend">标题</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="reward">
            <el-input v-model="taskForm.reward" placeholder="报酬(元/份)" autocomplete="off">
              <template slot="prepend">报酬</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="maxParticipant">
            <el-input v-model="taskForm.maxParticipant" placeholder="人数" autocomplete="off">
              <template slot="prepend">人数</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="endTime">
            <el-input v-model="taskForm.endTime" placeholder="期限" autocomplete="off">
              <template slot="prepend">期限</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div id='my-publish-task-select-imgview'>
        <div id="task-img">
          <img src="../assets/background.jpg"/>
        </div>
      </div>
      <div id='my-publish-task-short-info'>
        <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10}"
          placeholder="请输入简介"
          v-model="taskForm.intro">
        </el-input>
      </div>
      <el-button id="my-task-submit-button" v-on:click="submitTaskButtonClick" round>提交</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyPublishTask',
  components: {
  },
  data() {
    // const validateTaskType = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请选择一个类型'));
    //   } else {
    //     callback();
    //   }
    // };

    // const validateTaskTitle = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入标题'));
    //   } else {
    //     callback();
    //   }
    // };

    return {
      taskForm: {
        type: '',
        title: '',
        reward: '',
        maxParticipant: '',
        endTime: '',
        intro: ''
      },
      taskRules: {
        // type: [
        //   { validator: validateTaskType, trigger: 'blur' }
        // ],
        // title: [
        //   { validator: validateTaskTitle, trigger: 'blur' }
        // ]
      },
    };
  },
  methods: {
    submitTaskButtonClick() {
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
  width: 49%;
  /* background-color: yellow; */
  margin-top: 3%;
}

/* .el-input {
  font-size: 15px;
}

.el-input input {
  height: 45px;
  border-color: gray;
  background-color:transparent;
  border: 1px solid;
  border-radius: 0px;
} */

/* 图片选择框模块 */
#my-publish-task-select-imgview {
  display: inline-block;
  vertical-align: top;
  margin-top: 3%;
  width: 49%;
  /* background: yellow; */
}

/*task图像div*/
#task-img {
  display: inline-block;
  width: 70%;
  height:0px;
  margin-left: 1%;
  padding-bottom:50%;
  margin-left: 15%;
  position:relative;
  
}

/* task图像 */
#task-img img {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10%;
}

/* 提交按钮 */
#my-task-submit-button {
  float: right;
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>
