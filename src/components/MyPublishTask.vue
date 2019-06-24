<template>
  <div>
    <div id ='my-publish-task-title'>
      <span>任务简介</span>
    </div>
    <div>
      <div id='my-publish-task-info-input-box'>
        <el-form :model="taskForm" ref="taskForm">
          <el-form-item prop="title">
            <el-input v-model="taskForm.title" placeholder="标题" autocomplete="off">
              <el-select v-model="taskForm.type" slot="prepend" placeholder="类型">
                <el-option label="问卷调查" value="问卷调查"></el-option>
                <el-option label="快递代领" value="快递代领"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item prop="reward">
            <el-input v-model="taskForm.reward" placeholder="报酬(元/份)" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="maxParticipant">
            <el-input v-model="taskForm.maxParticipant" placeholder="人数" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="endTime">
            <el-date-picker style="width: 100%"
              v-model="taskForm.endTime"
              type="datetime"
              placeholder="选择任务期限日期与时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div id='my-publish-task-select-imgview'>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div>
        <el-input style="font-size:120%"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="请输入简介"
          v-model="taskForm.intro">
        </el-input>
      </div>
      <el-button id="my-task-submit-nextstep-button" v-on:click="submitTaskNextStepButtonClick" round>下一步</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MyPublishTask',
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
    submitTaskButtonClick() {
      this.$router.push({ path: '/mainpage/myinfo/mypublishtask' });
    },
    handleAvatarSuccess(res, file) {
      console.log('success');
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      console.log('before');
      console.log(file.raw);
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitTaskNextStepButtonClick() {
      console.log('next step');
      this.$router.push({ path: '/mainpage/myinfo/publish-deliver-task-detail' });
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
  margin-top: 3%;
}

/* el-input 类型选择项 */
.el-select {
  width: 130px;
}

/* 图片选择框模块 */
#my-publish-task-select-imgview {
  display: inline-block;
  vertical-align: top;
  margin-top: 3%;
  width: auto;
  margin-left: 15%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 6px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/* 任务提交下一步按钮 */
#my-task-submit-nextstep-button {
  float: right;
  margin-top: 3%;
  margin-bottom: 3%;
  font-size: 120%;
}

</style>
