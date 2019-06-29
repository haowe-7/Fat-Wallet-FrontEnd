<template>
  <div id="main">
    <a id="back" v-on:click="backToLogin"></a>
    <img id="logo" src="../assets/盈小钱logo.png"/>
    <div id="input-box">
      <el-form :model="registerForm" ref="registerForm" status-icon :rules="registerRules">
        <el-form-item prop="username">
          <el-input class="register-input" v-model="registerForm.username" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          <el-input class="register-input" v-model="registerForm.mail" placeholder="邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="register-input" v-model="registerForm.password" placeholder="密码" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input class="register-input" v-model="registerForm.checkPass" placeholder="确认密码" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-checkbox class="register-check" v-model="checked" size="medium">同意盈小钱用户协议</el-checkbox>
        <el-button id='register-botton' height="25px" :loading="loading" v-on:click="handleRegister" round>注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };

    const validatePassword = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('密码不能为空'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };

    const validateCheckPass = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请再次确认密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    const validateMail = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('邮箱不能为空'));
      } else {
        var regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!regExp.test(value)) {
          callback(new Error('邮箱格式错误'));
        }
        callback();
      }
    };

    return {
      registerForm: {
        username: '',
        mail: '',
        password: '',
        checkPass: ''
      },
      registerRules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        mail: [
          { validator: validateMail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ]
      },
      checked: false,
      loading: false
    };
  },
  methods: {
    backToLogin() {
      this.$router.push({ path: '/login' });
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (!this.checked) {
            this.$message.error('您尚未同意盈小钱用户协议，无法注册账号！');
            return false;
          }
          this.loading = true;
          this.$store.dispatch('Register', this.registerForm).then(response => {
            this.$message({
              message: '注册成功，请登录！',
              type: 'success'
            });
            this.$router.push({ path: '/login' });
          }).catch((error) => {
            this.$message.error('注册失败：' + error);
          }).finally(() => {
            this.loading = false;
          });
        } else {
          this.$message.error('您的信息不合法或者尚未填写完整！');
          return false;
        }
      });
    }
  },
};
</script>

<style scope>

#main {
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
  margin-bottom: 2%;
}

#input-box {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
}

.register-input input {
  font-size: 20px;
  height: 45px;
  border-color: gray;
  background-color:transparent;
  border: 1px solid;
  border-radius: 26px;
  padding: 5%;
}

.register-check {
  margin: 2%;
}

#register-botton {
  width: 100%;
  font-size: 25px;
  font-weight: bold;
  border-color: gray;
  background-color:transparent;
}

#back{
  display:inline-block;
  width: 60px;
  height: 60px;
  position: fixed;
  left: 60px;
  top: 40px;
  background:url("../assets/back.png");
  background-size: cover;
  cursor: pointer;
}

</style>
