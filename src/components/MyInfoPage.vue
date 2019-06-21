<template>
  <div id="my-info-page-main">
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
    <div id="user-control-panel">
      <div id="user-detail-info-panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane class="user-control-tab-panel" name="release">
            <span slot="label" class='category-sub-title'>发布</span>
            <div v-for="o in 4" :key="o" class="text item">
              <TaskBlock></TaskBlock>
            </div>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="finish">
            <span slot="label" class='category-sub-title'>完成</span>
            <div v-for="o in 4" :key="o" class="text item">
              <TaskBlock></TaskBlock>
            </div>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="collect">
            <span slot="label" class='category-sub-title'>收藏</span>
            <div v-for="o in 4" :key="o" class="text item">
              <TaskBlock></TaskBlock>
            </div>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="comment">
            <span slot="label" class='category-sub-title'>评论</span>
            评论
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="follow">
            <span slot="label" class='category-sub-title'>关注</span>
            关注
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="share">
            <span slot="label" class='category-sub-title'>分享</span>
            <div v-for="o in 4" :key="o" class="text item">
              <TaskBlock></TaskBlock>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div id="user-nav-panel">
        <el-button id="publish-task-button" round>发布任务</el-button>
        <div>
          <div class="user-nav-div">我的任务</div>
          <div class="user-nav-div">我的账户</div>
          <div class="user-nav-div">我的浏览</div>
          <div class="user-nav-div">我的小组</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock';
export default {
  name: 'MyInfoPage',
  components: {
    TaskBlock
  },
  data() {
    return {
      activeName: 'release'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
};
</script>

<style>

#my-info-page-main {
  width: 100%;
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

.category-sub-title {
  font-size: 150%;
  color: gray;
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
  width: 25%;
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
}

/*发布任务按钮*/
#publish-task-button {
  width: 100%;
  font-size: 250%;
}


</style>
