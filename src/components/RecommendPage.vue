<template>
  <div>
    <div v-for="item in TaskList" v-bind:key="item.task_id" class="text item">
        <task-block :task-info="item"></task-block>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskBlock from '@/components/TaskBlock';

export default {
  name: 'RecommendPage',
  components: {
    'task-block': TaskBlock
  },
  beforeMount() {
    this.loading = this.$loading({
      lock: true,
      text: '正在从数据库获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    this.$store.dispatch('GetRecommendTasks', 0, 10).then(() => {
      this.TaskList = this.RecommendTaskList;
      this.loading.close();
    });
  },
  data() {
    return {
      TaskList: [],
      loading: null
    };
  },
  computed: {
    ...mapGetters({
      RecommendTaskList: 'recommend_task_list'
    })
  },
  methods: {
  },
};
</script>

<style>

</style>
