<template>
  <div id="personal-info-setting-page">
    <div slot="header" id="header">
      <span style="font-size:140%; font-weight:bold;">隐私设置  </span>
      <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading" round v-on:click="controlButtonClick">{{controlStatus}}</el-button>
    </div>
    <div id='user-info-input-box'>
        <el-form :model="userInfoForm" ref="userInfoForm" class="user-info-form-item">
          <el-form-item prop="password">
            <el-input v-model="userInfoForm.password" placeholder="**********" autocomplete="off" type="password">
              <template slot="prepend">密码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">  
            <el-input v-model="userInfoForm.phone" placeholder="154651321321" autocomplete="off">
              <template slot="prepend">绑定手机</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="userInfoForm.email" placeholder="944131226@qq.com" autocomplete="off">
              <template slot="prepend">绑定邮箱</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalPrivacyComponent',
  components: {
  },
  data() {
    return {
      controlStatus: '确认更改',
      imageUrl: '',
      userInfoForm: {
        user_id: '',
        username: '',
        password: '',
        student_id: '',
        phone: '',
        major: '',
        email: '',
        nickname: '',
        intro: '',
        avator: ''
      }
    };
  },
  methods: {
  },
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
  width: 100%;
}



</style>
