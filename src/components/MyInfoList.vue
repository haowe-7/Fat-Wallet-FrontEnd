<template>
    <div id="my-info-list-div">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane class="user-control-tab-panel" name="publish">
            <span slot="label" class='category-sub-title'>发布</span>
              <div v-for="item in taskListAsCreator" :key="item.task_id" class="text item">
                <TaskBlock :task-info="item"></TaskBlock>
              </div>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="finish">
            <span slot="label" class='category-sub-title'>完成</span>
              <div v-for="item in taskListAsParticipator" :key="item.task_id" class="text item">
                <TaskBlock :task-info="item"></TaskBlock>
              </div>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="collect">
            <span slot="label" class='category-sub-title'>收藏</span>
              <div v-for="item in taskListAsCollector" :key="item.task_id" class="text item">
                <TaskBlock :task-info="item"></TaskBlock>
              </div>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="comment">
            <span slot="label" class='category-sub-title'>评论</span>
            <TaskDiscussPage></TaskDiscussPage>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="follow">
            <span slot="label" class='category-sub-title'>关注</span>
            <TaskApplicantPage :controlButtonVisible="true" controlButtonText='取消关注'></TaskApplicantPage>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="share">
            <span slot="label" class='category-sub-title'>分享</span>
              <div v-for="item in taskListAsSharer" :key="item.task_id" class="text item">
                <TaskBlock :task-info="item"></TaskBlock>
              </div>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock';
import TaskDiscussPage from '@/components/TaskDiscussPage';
import TaskApplicantPage from '@/components/TaskApplicantPage';
import { getTaskInfo } from '@/api/tasks';
import { mapGetters } from 'vuex';

export default {
  name: 'MyInfoList',
  components: {
    TaskBlock,
    TaskDiscussPage,
    TaskApplicantPage
  },
  beforeMount() {
    const Loading = this.$loading({
      lock: true,
      text: '正快马加鞭帮小主查询',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });

    const queryJsons = [
      {
        creator_id: this.user_id
      },
      {
        participator_id: this.user_id
      },
      {
        collector_id: this.user_id
      },
      {
        sharer_id: this.user_id
      }];
    console.log(queryJsons);
    console.log('user_id', this.user_id);
    getTaskInfo(queryJsons[0]).then(response => {
      const status = response.status;
      if (status === 200) {
        console.log(queryJsons[0] + 'code:200');
        console.log("我的发布：", response.data);
        this.taskListAsCreator = response.data.data;
      } else {
        throw response.data.error;
      }
    }).catch(err => {
      this.$message.error(err);
    });

    getTaskInfo(queryJsons[1]).then(response => {
      const status = response.status;
      if (status === 200) {
        console.log(queryJsons[1] + 'code:200');
        console.log(response.data);
        this.taskListAsParticipator = response.data.data;
      } else {
        throw response.data.error;
      }
    }).catch(err => {
      this.$message.error(err);
    });

    getTaskInfo(queryJsons[2]).then(response => {
      const status = response.status;
      if (status === 200) {
        console.log(queryJsons[2] + 'code:200');
        console.log(response.data);
        this.taskListAsCollector = response.data.data;
      } else {
        throw response.data.error;
      }
    }).catch(err => {
      this.$message.error(err);
    });

    getTaskInfo(queryJsons[3]).then(response => {
      const status = response.status;
      if (status === 200) {
        console.log(queryJsons[3] + 'code:200');
        console.log(response.data);
        this.taskListAsSharer = response.data.data;
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
      activeName: 'publish',
      taskListAsCreator: [],
      taskListAsParticipator: [],
      taskListAsCollector: [],
      taskListAsSharer: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  computed: {
    ...mapGetters({
      user_id: 'user_id'
    })
  }
};
</script>

<style scoped>

#my-info-list-div {
  width: 100%;
}

.category-sub-title {
  font-size: 150%;
  color: gray;
}

</style>
