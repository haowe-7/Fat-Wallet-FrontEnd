<template>
  <div id='deliver-task-detail-page'>
    <el-card>
      <div slot='header'>
        <span style='font-size:120%; font-weight:bold;'>快递任务详情</span>
        <el-button style='float: right; font-size:120%; padding: 5px 0; width: 100px;' :loading='loading' round v-on:click='finishButtonClick'>我已完成</el-button>
      </div>
      <el-form>
        <el-form-item v-for='o in 3' :key='o' prop='title'>
          <el-input v-model='itemText[o-1]' placeholder='详细信息' autocomplete='off' :disabled='true'>
            <template slot='prepend'>{{itemTitle[o-1]}}</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-input style='font-size:120%'
          type='textarea'
          :autosize='{ minRows: 3, maxRows: 5}'
          placeholder='请输入简介'
          v-model='itemText[3]'
          :disabled='true'>
          <template slot='prepend'>{{itemTitle[3]}}</template>
        </el-input>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getTaskExtra } from '@/api/tasks';

export default {
  name: 'DeliverTaskDetailPage',
  components: {
  },
  beforeMount() {
    const task_id = this.$route.query.task_id;
    const Loading = this.$loading({
      lock: true,
      text: '正在从数据库获取数据中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    getTaskExtra(task_id).then(response => {
      const status = response.status;
      const data = response.data;
      if (status === 200) {
        const extra = data.data;
        this.itemText = [
          extra.courier_number,
          extra.delivery_locker,
          extra.pick_up_code,
          extra.private_info
        ];
        Loading.close();
      } else {
        throw data.error;
      }
    }).catch(err => {
      Loading.close();
      this.$message.error('获取信息失败：' + err);
    });
  },
  data() {
    return {
      loading: false,
      itemTitle: ['单号', '快递柜', '取件码', '私人信息'],
      itemText: ['未知', '未知', '未知', '未知'],
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
