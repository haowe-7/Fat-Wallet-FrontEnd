<template>
  <div id="main">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="recommend">
        <span slot="label" class='sub-title'>推荐</span>
        <RecommendPage></RecommendPage>
      </el-tab-pane>
      <el-tab-pane name="classification">
        <span slot="label" class='sub-title'>分类</span>
        <CategoryPage></CategoryPage>
      </el-tab-pane>
      <!-- <el-tab-pane name="group">
        <span slot="label" class='sub-title'>小组</span>
        小组
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import RecommendPage from '@/components/RecommendPage';
import CategoryPage from '@/components/CategoryPage';
export default {
  name: 'TaskPage',
  components: {
    RecommendPage,
    CategoryPage
  },
  data() {
    return {
      activeName: 'recommend', // 初始为推荐界面
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scope>
#main {
  padding-top: 2%;
  padding-left: 15%;
  padding-right: 15%;
}

.sub-title {
  font-size: 180%;
  font-weight: bold;
  color: gray;
  margin-left: 10%;
  padding: 1%;
  cursor: pointer;
}
</style>
