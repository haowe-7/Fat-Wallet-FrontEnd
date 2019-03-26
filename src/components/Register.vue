<template>
  <div id="main">
    <a id="back" href="/login"></a>
    <img id="logo" src="../assets/盈小钱logo.png"/>
    <div id="input-box">
      <el-input v-model="username" placeholder="姓名"></el-input>
      <el-input v-model="studentID" placeholder="学号"></el-input>
      <el-input v-model="major" placeholder="专业"></el-input>
      <el-input v-model="mail" placeholder="邮箱"></el-input>
      <el-input v-model="phone" placeholder="手机"></el-input>
      <el-input v-model="password" placeholder="密码"></el-input>
      <el-input v-model="rePassword" placeholder="确认密码"></el-input>
      <el-checkbox v-model="checked" size="medium">同意盈小钱用户协议</el-checkbox>
      <el-button height="25px" round>注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      studentID: '',
      major: '',
      mail: '',
      phone: '',
      password: '',
      rePassword: '',
      checked: false
    };
  }
};
</script>

<style>

#main {
  background-color: #333333;
  width: 100%;
  height: auto;
  padding: 0%;
  padding-bottom: 10%;
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

.el-input input {
  margin-top: 6%;
  font-size: 20px;
  height: 45px;
  border-color: gray;
  background-color:transparent;
  border: 1px solid;
  border-radius: 26px;
  padding: 5%;
}

.el-checkbox {
    margin: 2%;
    margin-top: 8%;
}

.el-button {
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
}

</style>
