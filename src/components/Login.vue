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
      <a id="forgetPass" v-on:click="passwordFindMethod">忘记密码？</a>
      <el-button height="25px" round>登录</el-button>
      <span>还没有账户?<a id="register" href="/register">立即注册</a></span>
    </div>
    <div id="findpass-dialog">
      <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" custom-class="custom-style" :visible.sync="dialogFormVisible">
        <div slot="title" class="dialog-title">
          <br><span id="dialog-text1">找回密码</span><br>
          <br><span id="dialog-text2">验证码将会发送至你的注册邮箱或手机</span><br>
        </div>
        <div class="dialog-body">
          <el-form :model="user_info" status-icon :rules="valiate_rule"> 
            <el-form-item prop="username">
              <el-input v-model="user_info.username" placeholder="用户名/邮箱/手机号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="vericode">
              <el-input v-model="vericode" placeholder="验证码" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div id="code">
            <identify :identifyCode = "identifyCode" :contentWidth = 180 :contentHeight = 48></identify>
            <span id="change-code-text" @click="refreshCode">换一张验证码</span>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" round @click="nextStepClick">下一步</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Identify from '@/components/Identify';
export default {
  name: 'Login',
  components: {
    Identify
  },
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
      },
      dialogFormVisible: false,
      identifyCodes: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      identifyCode: '',
      vericode: ''
    };
  },
  methods: {
    passwordFindMethod: function() {
      this.refreshCode();
      this.dialogFormVisible = true;
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      // console.log(this.identifyCode);
    },
    nextStepClick: function() {
      this.dialogFormVisible = false;
      this.vericode = '';
    }
  },
  mounted() {
    this.identifyCode = '';
    this.makeCode(this.identifyCodes, 4);
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
  cursor: pointer;
}

span {
  color: gray;
}

#register {
  font-size: 18px;
  color: gray;
  font-weight: bold;
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
