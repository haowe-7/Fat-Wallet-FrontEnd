<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="questionnaire">
        <span slot="label" class='category-sub-title'>问卷调查</span>
        <div v-for="item in taskListWithType1" :key="item.task_id" class="text item">
          <TaskBlock :task-info="item"></TaskBlock>
        </div>
      </el-tab-pane>
      <el-tab-pane name="association">
        <span slot="label" class='category-sub-title'>协会招新</span>
        <div v-for="item in taskListWithType2" :key="item.task_id" class="text item">
          <TaskBlock :task-info="item"></TaskBlock>
        </div>
      </el-tab-pane>
      <el-tab-pane name="delivery">
        <span slot="label" class='category-sub-title'>代取快递</span>
        <div v-for="item in taskListWithType3" :key="item.task_id" class="text item">
          <TaskBlock :task-info="item"></TaskBlock>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock';
import { getTaskInfo } from '@/api/tasks';

export default {
  name: 'CategoryPage',
  components: {
    TaskBlock
  },
  beforeMount() {
    // let Loading = this.$loading({
    //   lock: true,
    //   text: '正快马加鞭帮小主查询',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // });

    const queryJsons = [
      {
        task_type: 1
      },
      {
        task_type: 2
      },
      {
        task_type: 3
      }
    ];

    getTaskInfo(queryJsons[0]).then(response => {
      const status = response.status;
      if (status === 200) {
        console.log(queryJsons[0] + 'code:200');
        console.log(response.data);
        this.taskListWithType1 = response.data.data;
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
        this.taskListWithType2 = response.data.data;
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
        this.taskListWithType3 = response.data.data;
      } else {
        throw response.data.error;
      }
    }).catch(err => {
      this.$message.error(err);
    });
  },
  data() {
    return {
      activeName: 'questionnaire',
      taskListWithType1: [],
      taskListWithType2: [],
      taskListWithType3: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
};
</script>

<style>
.category-sub-title {
  font-size: 110%;
  color: gray;
}
</style>
