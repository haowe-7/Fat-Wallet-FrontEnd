<template>
  <div id="findpass-dialog">
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" custom-class="custom-style" 
                :visible.sync="visible" :before-close="hideDialog">
      <div slot="title" class="dialog-title">
        <br><span id="dialog-text1">{{this.text_info.text1}}</span><br>
        <br><span id="dialog-text2">{{this.text_info.text2}}</span><br>
      </div>
      <div class="dialog-body">
        <el-form> 
          <el-form-item>
            <el-input id="input-box1" v-model="contactInfo" placeholder="邮箱/手机号" autocomplete="off" :disabled="input_box1_disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="veriCode" placeholder="验证码" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div v-bind:class="{ 'identify-code-div-style1': currentStep===1, 'identify-code-div-style2': currentStep!==1}">
          <identify :identifyCode = "identifyCode" :contentWidth = 180 :contentHeight = 48></identify>
          <span id="change-code-text" @click="refreshCode">换一张验证码</span>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" round @click="nextStepClick">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Identify from '@/components/Identify';
  export default {
    name: 'PasswordBackDialog',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Identify
    },
    data() {
      return {
        identifyCodes: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        identifyCode: '',
        veriCode: '',
        currentStep: 1,
        contactInfo: '',
        text_info: {
          text1: '密码找回·第一步',
          text2: '验证码将会发送至你的注册邮箱或手机'
        },
        input_box1_disabled: false
      };
    },
    methods: {
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
      },
      nextStepClick: function() {
        // verify whether vericode the same as identycode
        if (this.veriCode.toLowerCase() === this.identifyCode.toLowerCase()) {
          // TODO: verify contact info
          //var isContactInfoOK = (this.contactInfo === '944131226@qq.com');
          var isContactInfoOK = true;
          if (isContactInfoOK) {
            this.text_info.text1 = '密码找回·第二步';
            this.text_info.text2 = '验证码已发送，请在一分钟内完成验证';
            this.currentStep = 2;
            // document.getElementById('input-box1').disabled = true;
            this.input_box1_disabled = true;
          } else {
            this.text_info.text2 = '手机号/邮箱不正确';
          }
        } else {
          // console.log('wrong---', this.identifyCode);
          this.text_info.text2 = '图片校验码错误，请重试';
        }
        this.veriCode = '';
      },
      hideDialog() {
        this.$emit('update:visible', false);
        this.resetInfo();
      },
      resetInfo() {
        this.currentStep = 1;
        this.text_info.text1 = '密码找回·第一步';
        this.text_info.text2 = '验证码将会发送至你的注册邮箱或手机';
        this.input_box1_disabled = false;
        this.contactInfo = '';
        this.veriCode = '';
      }
    },
    mounted() {
      this.currentStep = 1;
      this.refreshCode();
    }
  };
</script>
 
<style scoped>
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

.identify-code-div-style1 {
  text-align: center;
}

.identify-code-div-style2 {
  text-align: center;
  display: none;
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