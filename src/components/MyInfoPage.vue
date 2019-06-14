<template>
  <div id="my-info-page-main">
    <div id="user-info-panel">
      <div id="user-icon">
      <img src="../assets/background.jpg"/>
      </div>
      <div id="user-label-info">
        <div id="user-name">Messiah</div>
        <div id="user-intro">一个抱紧大佬大腿的程序猿~</div>
      </div>
      <div id="edit-user-info-button">
        <el-button id="tag5">编辑个人资料</el-button>
      </div>
    </div>
    <div id="user-control-panel">
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
      <el-button id="tag6" round>发布任务</el-button>
      <div class="user-nav-div">
        <div>我的任务</div>
        <div>我的账户</div>
        <div>我的浏览</div>
        <div>我的小组</div>
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
  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
}

#user-info-panel {
  margin-top: 3%;
}

#user-control-panel {
  display: inline-block;
  width: 70%;
  margin-top: 3%;
}

#user-icon {
  display: inline-block;
  width: 15%;
  height:0px;
  margin-left: 1%;
  padding-bottom:15%;
  position:relative;
}

#user-icon img {
  width: 100%;
  height: 100%;
  position: absolute;
}

#user-label-info {
  display: inline-block;
  vertical-align: top;
  width: 50%;
  margin-left: 5%;
  color: #AAAAAA;
}

#edit-user-info-button {
  display: inline-block;
  vertical-align: top;
  width: 15%;
  margin-top: 8%;
}

#user-name {
  margin-top: 5%;
  font-size: 300%;
  font-weight: bolder;
}

#user-intro {
  margin-top: 5%;
  font-size: 150%
}

#user-nav-panel {
  display: inline-block;
  vertical-align: top;
  margin-top: 3%;
  width: 29.5%;
}

.user-nav-div {
  margin-top: 20%;
  text-align: center;
  font-size: 150%;
  color: gray;
}


</style>
