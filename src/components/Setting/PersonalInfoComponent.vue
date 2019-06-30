<template>
  <div id="personal-info-setting-page">
    <div slot="header" id="header">
      <span style="font-size:140%; font-weight:bold;">个人资料</span>
      <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading" round v-on:click="controlButtonClick">{{controlStatus}}</el-button>
    </div>
    <div id='user-info-input-box'>
        <el-form :model="userInfoForm" ref="userInfoForm" class="user-info-form-item">
          <el-form-item prop="username">
            <el-input v-model="userInfoForm.username" placeholder="姓名" autocomplete="off">
              <template slot="prepend">姓名</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="student_id">
            <el-input v-model="userInfoForm.student_id" placeholder="学号" autocomplete="off">
              <template slot="prepend">学号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="major">
            <el-input v-model="userInfoForm.major" placeholder="学院" autocomplete="off">
              <el-select v-model="userInfoForm.major" slot="prepend" placeholder="学院">
                  <el-option v-for="major in majorList" :key="major" :label="major" :value="major"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input v-model="userInfoForm.nickname" placeholder="昵称" autocomplete="off">
              <template slot="prepend">昵称</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div id='my-publish-task-select-imgview'>
        <span style="font-size:120%; color:gray;">头像</span>
        <el-upload
          class="avatar-uploader"
          action="/api/users/avatar"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false">
          <img v-if="avatar !== null" :src="'/api/file/' + avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div>
        <el-input style="font-size:120%"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="个人简介"
          v-model="userInfoForm.profile">
        </el-input>
      </div>
  </div>
</template>

<script>
import { getInfo, modifyUser } from '@/api/users';
import { mapGetters } from 'vuex';

export default {
  name: 'PersonalInfoComponent',
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
      offset: this.user_id,
      limit: 1
    };
    getInfo(queryJson).then(response => {
      const status = response.status;
      if (status === 200) {
        this.userInfoForm = response.data.data[0];
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
      controlStatus: '确认更改',
      imageUrl: '',
      loading: false,
      majorList: ['数据科学与计算机学院', '岭南学院', '管理学院', '工学院', '材料学院', '中山医学院', '光华口腔医学院', '公共卫生学院', '国际关系学院', '国际翻译学院', '国际金融学院', '马克思主义学院', '其他学院'],
      userInfoForm: {
        username: '',
        password: '',
        student_id: '',
        phone: '',
        major: '',
        email: '',
        nickname: '',
        profile: '',
        avator: null
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res.data);
      this.userInfoForm.avatar = res.data;
      this.$store.dispatch('SetAvatar', res.data);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    controlButtonClick: function() {
      if(this.userInfoForm.username === '' || this.userInfoForm.student_id === '') {
        this.$message.error("姓名和学号不能为空哦😊");
        return;
      }
      var reg='^[0-9]{8}$';
      var pattern = new RegExp(reg);
      if(!pattern.test(this.userInfoForm.student_id)) {
        this.$message.error("请输入正确的8位数字中大学号哦😊");
        return;
      }
      this.$confirm('确定修改用户个人信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.loading = true;
        this.controlStatus = '上传中';
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
            this.loading = false;
            this.controlStatus = '确认修改';
          });
      });
    }
  },
  computed: {
    ...mapGetters({
      user_id: 'user_id',
      avatar: 'avatar',
    })
  }
};
</script>

<style scoped>

#personal-info-setting-page {
  width: 100%;
}

#header {
  margin-top: 1%;
  padding-bottom: 2%;
  border-bottom: 2px solid lightgray;
}

#user-info-input-box {
  display: inline-block;
  margin-top: 3%;
  width: 50%;
}

/* 图片选择框模块 */
#my-publish-task-select-imgview {
  display: inline-block;
  vertical-align: top;
  margin-top: 3%;
  width: auto;
  margin-left: 15%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 6px;
  margin-top: 5%;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border-radius: 50%;
}

</style>
