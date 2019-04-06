<template>
  <div id="findpass-dialog">
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" custom-class="custom-style" :visible.sync="visible" :before-close="hideDialog">
      <div slot="title" class="dialog-title">
        <br><span id="dialog-text1">找回密码</span><br>
        <br><span id="dialog-text2">验证码将会发送至你的注册邮箱或手机</span><br>
      </div>
      <div class="dialog-body">
        <el-form> 
          <el-form-item>
            <el-input placeholder="邮箱/手机号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
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
        vericode: '',
        currentStep: 1,
        dialogFormVisible: this.visible
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
        this.vericode = '';
      },
      hideDialog() {
        this.$emit('update:visible', false);
      }
    },
    mounted() {
      this.currentStep = 0;
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