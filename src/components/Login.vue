<template>
  <div id="main">
    <img id="logo" src="../assets/盈小钱logo.png"/>
    <div id="input-box">
      <el-form :model="user_info" status-icon :rules="valiate_rule">
        <el-form-item prop="username">
          <el-input v-model="user_info.username" placeholder="用户名/邮箱/手机号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="user_info.password" placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <a id="forgetPass" href="http://baidu.com">忘记密码？</a>
        <el-button height="25px" round>登录</el-button>
      <span>还没有账户?<a id="register" href="/register">立即注册</a></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        callback();
      }
    };

    return {
      user_info: {
        username: '',
        password: ''
      },
      valiate_rule: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    };
  }
};
</script>

<style>

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
  margin-bottom: 4%;
}

#input-box {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
}

.el-input {
  font-size: 20px;
}

.el-input input {
  height: 45px;
  border-color: gray;
  background-color:transparent;
  border: 1px solid;
  border-radius: 25px;
}

.el-button {
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
}

span {
  color: gray;
}

#register {
  font-size: 18px;
  color: gray;
  font-weight: bold;
}

</style>
