<template>
    <div id="my-info-list-div">
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
            <TaskDiscussPage></TaskDiscussPage>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="follow">
            <span slot="label" class='category-sub-title'>关注</span>
            <TaskApplicantPage :controlButtonVisible="true" controlButtonText='取消关注'></TaskApplicantPage>
          </el-tab-pane>
          <el-tab-pane class="user-control-tab-panel" name="share">
            <span slot="label" class='category-sub-title'>分享</span>
            <div v-for="o in 4" :key="o" class="text item">
              <TaskBlock></TaskBlock>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import TaskBlock from '@/components/TaskBlock';
import TaskDiscussPage from '@/components/TaskDiscussPage';
import TaskApplicantPage from '@/components/TaskApplicantPage';
export default {
  name: 'MyInfoList',
  components: {
    TaskBlock,
    TaskDiscussPage,
    TaskApplicantPage
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

<style scoped>

#my-info-list-div {
  width: 100%;
}

.category-sub-title {
  font-size: 150%;
  color: gray;
}

</style>
