<template>
  <div id="main">
    <img id="logo" src="../assets/盈小钱logo.png"/>
    <div id="input-box">
      <el-input v-model="username" placeholder="用户名/邮箱/手机号"></el-input>
      <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      <a href="http://baidu.com">忘记密码？</a>
      <el-button height="25px" round>登录</el-button>
      <a id="register" href="/register">还没有账户？立即注册</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: "",
      password: ""
    }
  }
}
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
  margin-bottom: 2%;
}

#input-box {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
}

.el-input {
  margin-top: 5%;
  font-size: 20px;
}

.el-input input {
  height: 40px;
  border-color: gray;
  background-color:transparent;
  border: 1px solid;
  border-radius: 25px;
  padding: 5%;
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
  width: 100%;
  margin-top: 4%;
  color: gray;
  text-decoration:none;
  text-align: right;
}

#register {
  text-align: left;
}

</style>
