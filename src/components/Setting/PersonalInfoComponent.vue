<template>
  <div id="personal-info-setting-page">
    <div slot="header" id="header">
      <span style="font-size:140%; font-weight:bold;">个人资料</span>
      <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading" round v-on:click="controlButtonClick">{{controlStatus}}</el-button>
    </div>
    <div id='user-info-input-box'>
        <el-form :model="userInfoForm" ref="userInfoForm" class="user-info-form-item">
          <el-form-item prop="username">
            <el-input v-model="userInfoForm.username" placeholder="Mason" autocomplete="off">
              <template slot="prepend">姓名</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="student_id">
            <el-input v-model="userInfoForm.student_id" placeholder="16340015" autocomplete="off">
              <template slot="prepend">学号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="major">
            <el-input v-model="userInfoForm.major" placeholder="软件工程" autocomplete="off">
              <template slot="prepend">专业</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input v-model="userInfoForm.nickname" placeholder="中大划水怪" autocomplete="off">
              <template slot="prepend">昵称</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div id='my-publish-task-select-imgview'>
        <span style="font-size:120%; color:gray;">头像</span>
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
          placeholder="封面宣言"
          v-model="userInfoForm.intro">
        </el-input>
      </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/users';
import { mapGetters } from 'vuex';

export default {
  name: 'PersonalInfoComponent',
  components: {
  },
  beforeMount() {
    // let Loading = this.$loading({
    //   lock: true,
    //   text: '正快马加鞭帮小主查询',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });
    // console.log(this.user_id);
    // let queryJson = {
    //   user_id:this.user_id
    // }
    // console.log(queryJson);
    // getInfo(queryJson).then(response => {
    //   const status = response.status;
    //   if (status === 200) {
    //     console.log(queryJson + 'code:200');
    //     console.log(response.data);
    //     this.userInfoForm = response.data.data;
    //     Loading.close();
    //   }
    //   else
    //     throw response.data.error;
    // }).catch(err => {
    //   this.$message.error(err);
    // });
  },
  data() {
    return {
      controlStatus: '确认更改',
      imageUrl: '',
      userInfoForm: []
      // userInfoForm: {
      //   username: '',
      //   password: '',
      //   student_id: '',
      //   phone: '',
      //   major: '',
      //   email: '',
      //   nickname: '',
      //   intro: '',
      //   avator: ''
      // }
    };
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      user_id: 'user_id'
    })
  }
};
</script>

<style scoped>

#personal-info-setting-page {
  width: 100%;
}

#header {
  margin-top: 1%;
  padding-bottom: 2%;
  border-bottom: 2px solid lightgray;
}

#user-info-input-box {
  display: inline-block;
  margin-top: 3%;
  width: 50%;
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
  margin-top: 5%;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


</style>
