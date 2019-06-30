<template>
  <div id="personal-info-setting-page">
    <div slot="header" class="header">
      <span style="font-size:140%; font-weight:bold;">手机号码与邮箱  </span>
      <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :disabled="this.userInfoForm.phone==this.modifyPhone && this.userInfoForm.email == this.modifyEmail" :loading="loading1" round v-on:click="modifyPhoneAndEmail">{{bottonText1}}</el-button>
    </div>
    <div class='user-info-input-box'>
      <el-form :model="userInfoForm" ref="userInfoForm">
        <el-form-item prop="phone">  
          <el-input v-model="modifyPhone" placeholder="您还没绑定手机呢" autocomplete="off">
            <template slot="prepend">绑定手机</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="modifyEmail" placeholder="您还没绑定邮箱呢" autocomplete="off">
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
          <el-input class="password-input-box" v-model="password" placeholder="**********" autocomplete="off" type="password">
            <template slot="prepend">&ensp;原密码&ensp;</template>
          </el-input>
          <el-input class="password-input-box" v-model="newpassword" placeholder="**********" autocomplete="off" type="password">
            <template slot="prepend">&ensp;新密码&ensp;</template>
          </el-input>
          <el-input class="password-input-box" v-model="confirmpassword" placeholder="**********" autocomplete="off" type="password">
            <template slot="prepend">确认密码</template>
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
        this.modifyPhone = this.userInfoForm.phone;
        this.modifyEmail = this.userInfoForm.email;
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
      modifyPhone: '',
      modifyEmail: '',
      password: '',
      newpassword: '',
      confirmpassword: '',
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
      },
    };
  },
  methods: {
    modifyPhoneAndEmail: function() {
      if(this.modifyPhone != this.userInfoForm.phone) {
        var reg = '^1[3-9][0-9]{9}$';
        var phone_pattern = new RegExp(reg);
        if(!phone_pattern.test(this.modifyPhone)) {
          this.$message.error("手机格式不正确噢😊");
          return;
        }
      }
      if(this.modifyEmail != this.userInfoForm.email) {
        reg = '^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$';
        var email_pattern = new RegExp(reg);
        if(!email_pattern.test(this.modifyEmail)) {
          this.$message.error("邮箱格式不正确噢😊");
          return;
        }
      }
      
      this.$confirm('确定修改用户个人信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.loading1 = true;
        this.bottonText1 = '上传中';
        modifyUser(this.userInfoForm)
          .then(response => {
            const status = response.status;
            if (status === 200) {
              this.$message.success("修改信息上传成功");
            } else {
              throw response.data.error;
            }
          })
          .catch(err => {
            this.$message.error("上传修改信息失败：" + error);
          })
          .finally(() => {
            this.loading1 = false;
            this.bottonText1 = '确认修改';
          });
      });
    },

    modifyPassword: function() {
      var reg = '^([a-zA-Z0-9]|_){6,18}$';
      var pattern = new RegExp(reg);
      console.log(this.newpassword);
      if(!pattern.test(this.password)) {
        this.$message.error("原密码格式不正确噢😊");
        return;
      }
      if(this.newpassword != this.confirmpassword) {
        this.$message.error("两次输入的新密码要一致噢😊");
        return;
      }
      if(!pattern.test(this.newpassword)) {
        this.$message.error("请输入6-18位的新密码，只能包含字符、数字、下划线😊");
        return;
      }
      this.$confirm('确定修改用户密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.loading2 = true;
        this.bottonText2 = '上传中';
        modifyPassword(this.password)
          .then(response => {
            const status = response.status;
            if (status === 200) {
              this.$message.success("修改信息上传成功");
            } else {
              throw response.data.error;
            }
          })
          .catch(err => {
            this.$message.error("上传修改信息失败：" + error);
          })
          .finally(() => {
            this.loading2 = false;
            this.bottonText2 = '确认修改';
          });
      });
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

.password-input-box {
  margin-bottom: 2%;
}

.el-input-group__prepend {
  width: 300px;
}


</style>
