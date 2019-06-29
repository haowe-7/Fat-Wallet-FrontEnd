<template>
  <div id="login-main">
    <img id="logo" src="../assets/盈小钱logo.png"/>
    <div id="input-box">
      <el-form :model="loginForm" ref="loginForm" status-icon :rules="loginRules">
        <el-form-item prop="username">
          <el-input class='login-input' v-model="loginForm.username" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class='login-input' type="password" v-model="loginForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <a id="forgetPass" v-on:click="passwordFindMethod">忘记密码？</a>
      <el-button id='login-botton' height="25px" :loading="loading" v-on:click="handleLogin" round>登录</el-button>
      <span>还没有账户?<a id="register" v-on:click="gotoRegister">立即注册</a></span>
    </div>
    <PasswordBackDialog :visible.sync = "dialogFormVisible"></PasswordBackDialog>
  </div>
</template>

<script>
import PasswordBackDialog from '@/components/PasswordBackDialog';
import { mapGetters } from 'vuex';

export default {
  name: 'Login',
  components: {
    PasswordBackDialog
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      loading: false,
      dialogFormVisible: false
    };
  },
  methods: {
    passwordFindMethod: function() {
      // this.refreshCode();
      this.dialogFormVisible = true;
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/mainpage' });
          }).catch((error) => {
            console.log(error);
            this.$message.error(error);
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gotoRegister() {
      this.$router.push({ path: '/register' });
    }
  },
  computed: {
    ...mapGetters({
      user_id: 'user_id'
    })
  },
  mounted() {
    this.dialogFormVisible = false;
  }
};
</script>

<style scope>

#login-main {
  background: url("../assets/background.jpg"), no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  padding: 0%;
  margin: 0%;
}

#logo {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
  margin-top: 5%;
  margin-bottom: 4%;
}

#input-box {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
}

.login-input {
  font-size: 20px;
}

.login-input input {
  height: 45px;
  border-color: gray;
  background-color:transparent;
  border: 1px solid;
  border-radius: 25px;
}

#login-botton {
  width: 100%;
  margin-top: 4%;
  font-size: 25px;
  font-weight: bold;
  border-color: gray;
  background-color:transparent;
}


a {
  display: inline-block;
  margin-top: 2%;
  text-decoration:none;
}

#forgetPass {
  float: right;
  color: gray;
  cursor: pointer;
}

span {
  color: gray;
}

#register {
  font-size: 18px;
  color: gray;
  font-weight: bold;
  cursor: pointer;
}

.dialog-title {
  margin-left: 5%;
  margin-right: 5%;
}

.dialog-body {
  margin-left: 5%;
  margin-right: 5%;
}

.dialog-footer {
  margin-left: 5%;
  margin-right: 5%;
}

.custom-style {
  width: 30%;
  border-radius: 5%;
  background-color: rgb(252, 251, 248);
}


#code {
  text-align: center;
}

#change-code-text {
  font-size: 18px;
  cursor: pointer;
}

#dialog-text1 {
  font-size: 24px;
  font-weight: bold; 
}

#dialog-text2 {
  font-size: 18px;
}
</style>
