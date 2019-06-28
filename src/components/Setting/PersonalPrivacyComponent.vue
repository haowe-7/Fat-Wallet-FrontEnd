<template>
  <div id="personal-info-setting-page">
    <div slot="header" class="header">
      <span style="font-size:140%; font-weight:bold;">手机号码与邮箱  </span>
      <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading1" round v-on:click="modifyPhoneAndEmail">{{bottonText1}}</el-button>
    </div>
    <div class='user-info-input-box'>
      <el-form :model="userInfoForm" ref="userInfoForm">
        <el-form-item prop="phone">  
          <el-input v-model="userInfoForm.phone" placeholder="phone" autocomplete="off">
            <template slot="prepend">绑定手机</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="userInfoForm.email" placeholder="email" autocomplete="off">
            <template slot="prepend">绑定邮箱</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="header" class="header">
      <span style="font-size:140%; font-weight:bold;">账号密码  </span>
      <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading2" round v-on:click="modifyPassword">{{bottonText2}}</el-button>
    </div>
    <div class='user-info-input-box'>
      <el-form>
        <el-form-item prop="password">
          <el-input v-model="password" placeholder="**********" autocomplete="off" type="password">
            <template slot="prepend">密码</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>  
  </div>
</template>

<script>
import { getInfo, modifyPassword, modifyUser } from '@/api/users';

export default {
  name: 'PersonalPrivacyComponent',
  components: {
  },
  beforeMount() {
    const Loading = this.$loading({
      lock: true,
      text: '正快马加鞭帮小主查询',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    const queryJson = {
      user_id: this.user_id
    };
    getInfo(queryJson).then(response => {
      const status = response.status;
      if (status === 200) {
        this.userInfoForm = response.data.data[0];
        Loading.close();
      } else {
        throw response.data.error;
      }
    }).catch(err => {
      this.$message.error(err);
    });
  },
  data() {
    return {
      bottonText1: '确认更改',
      bottonText2: '确认更改',
      loading1: false,
      loading2: false,
      password: '',
      userInfoForm: {
        user_id: '',
        username: '',
        student_id: '',
        phone: '',
        major: '',
        email: '',
        nickname: '',
        profile: '',
        avator: ''
      }
    };
  },
  methods: {
    modifyPhoneAndEmail: function() {

    },

    modifyPassword: function() {

    }
  },
};
</script>

<style scoped>

#personal-info-setting-page {
  width: 100%;
}

.header {
  margin-top: 1%;
  padding-bottom: 3%;
  border-bottom: 2px solid lightgray;
}

.user-info-input-box {
  display: inline-block;
  margin-top: 4%;
  width: 100%;
}

</style>
