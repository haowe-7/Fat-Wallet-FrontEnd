<template>
  <div>
    <div id="header">
      <span id="title">盈小钱</span>
      <router-link to="/mainpage/task" class="nav">任务</router-link>
      <router-link to="/mainpage/myinfo" class="nav">我的</router-link>
      <div class='search-box'>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          maxlength="10"
          v-model="search_text">
        </el-input>
      </div>
      <el-popover
        enterable='false'
        placement="bottom"
        visible-arrow='false'
        trigger="hover">
        <div class="simpleDetail">
          <p v-on:click="goToMainPage">主页</p>
          <p v-on:click="goToSetting">设置</p>
          <p>消息</p>
          <p>退出</p>
        </div>
        <div slot="reference" class="avatar">
          <img src="../assets/background.jpg" />
        </div>
			</el-popover>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'MainPage',
  components: {},
  data() {
    return {
      search_text: ''
    };
  },
  methods: {
    goToSetting() {
      this.$router.push({ path: '/mainpage/setting' });
    },
    goToMainPage() {
      this.$router.push({ path: '/mainpage' });
    }
  },
  mounted() {
  }
};

</script>

<style scoped>
#header {
  border-bottom: 1px solid;
  padding-top: 2%;
  padding-bottom: 1%;
}

#title {
  font-size: 250%;
  font-weight: bold;
  margin-left: 15%;
}

.nav {
  font-size: 150%;
  font-weight: bold;
  color: gray;
  margin-left: 2%;
  cursor: pointer;
  text-decoration:none;
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

.search-box {
  display: inline-block;
  margin-left: 3%;
  width: 20%;
}

.avatar {
  display: inline-block;
  float: right;
  margin: auto;
  margin-right: 5%;
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
}

.avatar img {
  width: auto;
  height: 100%;
  margin-left: -50%;
}

.el-popover {
  border: 1px solid;
  padding: 0px;
}

p {
  text-align: center;
  font-size: 125%;
  font-weight: bold;
  color: gray;
  cursor: pointer;
  border: 1px solid;
  padding: 5%;
  margin: 0px;
}

</style>