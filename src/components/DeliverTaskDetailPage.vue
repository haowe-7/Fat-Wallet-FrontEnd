<template>
  <div id="deliver-task-detail-page">
    <el-card>
      <div slot="header">
        <span style="font-size:120%; font-weight:bold;">快递任务详情</span>
        <el-button style="float: right; font-size:120%; padding: 5px 0; width: 100px;" :loading="loading" round v-on:click="finishButtonClick">我已完成</el-button>
      </div>
      <el-form>
        <el-form-item v-for="o in 3" :key="o" prop="title">
          <el-input v-model="itemText[o-1]" placeholder="详细信息" autocomplete="off" :disabled="true">
            <template slot="prepend">{{itemTitle[o-1]}}</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-input style="font-size:120%"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="请输入简介"
          v-model="itemText[3]"
          :disabled="true">
          <template slot="prepend">{{itemTitle[3]}}</template>
        </el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DeliverTaskDetailPage',
  components: {
  },
  data() {
    return {
      loading: false,
      itemTitle: ['单号', '快递柜', '取件码', '私人信息'],
      itemText: ['16340015', '蜂巢5号柜', '58585858', '宿舍：至善园2号楼528，电话：13324234234']
    };
  },
  methods: {
    finishButtonClick() {
      console.log('finish task');
    }
  },
};
</script>

<style scoped>

/* 任务概述预览界面div */
#deliver-task-detail-page {
  width: 70%;
  margin-top: 3%;
  padding-bottom: 3%;
  margin-left: 15%;
  border-radius: 10px;
}
</style>
