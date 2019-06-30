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
      <div id="money-div">
        <img id="money-icon" src="../assets/money-icon.png"/>
        <p id="money-count">{{ balance ? balance : 0 }}</p>  
      </div>
      <el-popover
        enterable='false'
        placement="bottom"
        visible-arrow='false'
        trigger="hover">
        <div class="simpleDetail">
          <p v-on:click="goToMainPage">主页</p>
          <p v-on:click="goToSetting">设置</p>
          <p v-on:click="logout">退出</p>
          <p v-on:click="goToNoticePage">消息</p>
        </div>
        <div slot="reference" class="avatar">
          <img :src="avatar ? '/api/file/' + avatar : '/static/people.png'" />
        </div>
			</el-popover>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainPage',
  components: {},
  computed: {
    ...mapGetters({
      balance: 'balance',
      avatar: 'avatar'
    }),
  },
  data() {
    return {
      search_text: '',
    };
  },
  methods: {
    goToSetting() {
      this.$router.push({ path: '/mainpage/setting' });
    },
    goToMainPage() {
      this.$router.push({ path: '/mainpage' });
    },
    logout() {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/' });
          this.$message.success('成功退出登录');
        }).catch(err => {
          this.$message.err('退出登录失败：' + err);
        })
      }).catch(() => {        
      });
    },
    goToNoticePage() {
      this.$router.push({ path: '/mainpage/notice' });
    }
  },
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
  border-radius: 50%;
}

.avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: block;
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

/* money style */
#money-div {
  display: inline-block;
  margin-left: 80px;
  height: 100%;
  width: 200px;
  cursor: pointer;
}

#money-icon {
  display: inline-block;
  height: 40px;
  width: 40px;
  vertical-align: bottom;
}

#money-count {
  display: inline-block;
  height: 20px;
  border: 0px;
}

</style>