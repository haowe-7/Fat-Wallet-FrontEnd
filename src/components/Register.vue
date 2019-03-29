<template>
  <div id="main">
    <a id="back" href="/login"></a>
    <img id="logo" src="../assets/盈小钱logo.png"/>
    <div id="input-box">
      <el-form :model="user_info" status-icon :rules="valiate_rule">
        <el-form-item prop="username">
          <el-input v-model="user_info.username" placeholder="姓名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="studentID">
          <el-input v-model="user_info.studentID" placeholder="学号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="major">
          <el-input v-model="user_info.major" placeholder="专业" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          <el-input v-model="user_info.mail" placeholder="邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="user_info.phone" placeholder="手机" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user_info.password" placeholder="密码" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input v-model="user_info.rePassword" placeholder="确认密码" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" size="medium">同意盈小钱用户协议</el-checkbox>
        <el-button height="25px" round>注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      user_info: {
        username: '',
        studentID: '',
        major: '',
        mail: '',
        phone: '',
        password: '',
        rePassword: '',
        checked: false
      },
      valiate_rule: {
        // username: [
        //   { validator: validateUsername, trigger: 'blur' }
        // ],
        // password: [
        //   { validator: validatePassword, trigger: 'blur' }
        // ]
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
  height: 120%;
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

.el-input input {
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
