<template>
  <div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="questionnaire">
        <span slot="label" class='category-sub-title'>问卷调查</span>
        <div v-for="o in 4" :key="o" class="text item">
          <TaskBlock></TaskBlock>
        </div>
      </el-tab-pane>
      <el-tab-pane name="association">
        <span slot="label" class='category-sub-title'>协会招新</span>
        协会招新
      </el-tab-pane>
      <el-tab-pane name="delivery">
        <span slot="label" class='category-sub-title'>代取快递</span>
        代取快递
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock';

export default {
  name: 'CategoryPage',
  components: {
    TaskBlock
  },
  data() {
    return {
      activeName: 'questionnaire',
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
.category-sub-title {
  font-size: 110%;
  color: gray;
}
</style>
