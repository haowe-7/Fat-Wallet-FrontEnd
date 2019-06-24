<template>
  <div id="breif-task-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据院问卷调查</span>
        <el-button style="float: right; padding: 3px 0" type="text">申请参加</el-button>
      </div>
      <div v-for="o in 5" :key="o" class="text item">
        <span class="itemTitle">{{itemTitle[o-1]}}</span>
        <span class="itemText">{{itemText[o-1]}}</span>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'TaskBreifInfoPage',
  components: {
  },
  data() {
    return {
      itemTitle: ['类型', '报酬', '人数', '期限', '简介'],
      itemText: ['问卷调查', '1元/人', '20人', '2019-07-01 23:59:59', '针对所有中大学生，调查学生对于计算机专业的认识和看法。']
    };
  },
  methods: {
  },
};
</script>

<style scoped>
/* 任务概述预览界面div */
#breif-task-page {
  width: 70%;
  margin-top: 3%;
  padding-bottom: 3%;
  margin-left: 15%;
  /* border: 1px solid gray; */
  border-radius: 10px;
}

/* 任务简介标示 */
#breif-task-nav-title {
  display: inline-block;
  width: auto;
  font-size: 200%;
  color: gray;
  margin-left: 3%;
  margin-top: 3%;
  border-block-end: 1px solid gray;
}

.itemTitle {
  font-size: 120%;
  margin: 3%;
}

</style>
