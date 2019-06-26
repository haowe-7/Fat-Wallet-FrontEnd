<template>
  <div id="my-info-page-main">
    <!-- 顶部信息模块 -->
    <div id="user-info-panel">
      <div id="user-icon">
      <img src="../assets/background.jpg"/>
      </div>
      <div id="user-label-info-div">
        <div id="user-name">Messiah</div>
        <div id="user-intro">一个抱紧大佬大腿的程序猿~</div>
      </div>
      <div id="edit-user-info-button-div">
        <el-button id="edit-user-info-button" round="">编辑个人资料</el-button>
      </div>
    </div>
    <!-- 下方控制模块 -->
    <div id="user-control-panel">
      <!-- 详情显示模块：包括信息块列表界面和概述发布任务界面 -->
      <div id="user-detail-info-panel">
        <router-link to="/mainpage/myinfo/myinfolist"></router-link>
        <router-link to="/mainpage/myinfo/mypublishtask"></router-link>
        <router-link to='/mainpage/myinfo/publish-deliver-task-detail'></router-link>
        <router-link to="/mainpage/myinfo/ques-edit"></router-link>
        <router-view></router-view>
      </div>
      <!-- 导航选择模块 -->
      <div id="user-nav-panel">
        <el-button id="publish-task-button" v-on:click="publishTaskButtonClick" round> {{publishTaskButtonText}}</el-button>
        <div>
          <div class="user-nav-div">我的任务</div>
          <div class="user-nav-div">我的账户</div>
          <div class="user-nav-div">我的浏览</div>
          <div class="user-nav-div">我的小组</div>
        </div>
      </div>
    </div>
    <div style="margin: 20px 0;"></div>
  </div>
</template>

<script>
export default {
  name: 'MyInfoPage',
  components: {
  },
  data() {
    return {
      publishTaskButtonText: '发布任务'
    };
  },
  methods: {
    publishTaskButtonClick() {
      this.$router.push({ path: '/mainpage/myinfo/mypublishtask' });
    }
  },
};
</script>

<style>

#my-info-page-main {
  width: 100%;
  margin-bottom: 3%;
}


#user-info-panel {
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 3%;
}


#user-control-panel {
  display: inline-block;
  margin-top: 3%;
  margin-left: 10%;
  width: 80%;
  background-color: white;
  border: 1px solid gray;
}


#user-detail-info-panel {
  display: inline-block;
  margin-top: 3%;
  margin-left: 5%;
  width: 70%;
  background-color: white;
}


#user-nav-panel {
  display: inline-block;
  vertical-align: top;
  margin-top: 3%;
  margin-left: 3%;
  width: 20%;
  background-color: white;
}


/*用户头像div*/
#user-icon {
  display: inline-block;
  width: 18%;
  height:0px;
  margin-left: 1%;
  padding-bottom:18%;
  position:relative;
  
}

/* 用户头像 */
#user-icon img {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10%;
}

/*用户名+用户介绍 div*/
#user-label-info-div {
  display: inline-block;
  vertical-align: top;
  width: 50%;
  margin-left: 5%;
  height: 20%;
  color: #AAAAAA;
}

/*编辑个人资料按钮div*/
#edit-user-info-button-div {
  display: inline-block;
  vertical-align: bottom;
  width: 24%;
  margin-bottom: 2%;
}
/*编辑个人资料按钮*/
#edit-user-info-button {
  width: 100%;
  font-size: 150%;
}

/*用户名*/
#user-name {
  margin-top: 5%;
  font-size: 300%;
  font-weight: bolder;
}

/*用户介绍文字*/
#user-intro {
  margin-top: 5%;
  font-size: 150%
}

/*导航栏选项*/
.user-nav-div {
  margin-top: 10%;
  text-align: center;
  font-size: 150%;
  color: gray;
  border-block-end: 1px solid gray;
  margin-bottom: 3%;
  cursor: pointer;
}

/*发布任务按钮*/
#publish-task-button {
  width: 100%;
  font-size: 250%;
}


</style>
