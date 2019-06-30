<template>
  <div id='deliver-task-detail-page'>
    <el-card>
      <div slot='header'>
        <span style='font-size:120%; font-weight:bold;'>快递任务详情</span>
        <el-button 
          style='float: right; font-size:120%; padding: 5px 0; width: 150px;'
          :loading='loading'
          round
          type='success'
          v-on:click='finishButtonClick'> {{ buttonText }} </el-button>
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
import { confirmFinish } from '@/api/participates';
import { mapGetters } from 'vuex';

export default {
  name: 'DeliverTaskDetailPage',
  components: {
  },
  computed: {
    ...mapGetters({
      user_id: 'user_id',
      current_task_info: 'current_task_info'
    })
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
      buttonText: '我已完成',
      itemTitle: ['单号', '快递柜', '取件码', '私人信息'],
      itemText: ['未知', '未知', '未知', '未知'],
    };
  },
  methods: {
    finishButtonClick() {
      if (this.buttonText === '我已完成') {
        this.$confirm('是否确定完成任务？结果将交与发布者审批', '提示', {
          confirmButtonText: '确定完成',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          confirmFinish(this.current_task_info.task_id).then(response => {
            const status = response.status;
            const data = response.data;
            if (status === 200) {
              this.$message.success('确定完成成功，等待申请者审批');
              for (let i = 0; i < this.current_task_info.participators.length; i++) {
                if (this.current_task_info.participators[i].user_id === this.user_id) {
                  this.current_task_info.participators[i].status = '审批中';
                  break;
                }
              }
              this.$store.dispatch('UpDateCurrentTaskInfo', this.current_task_info);
              this.$router.go(-1);
            } else {
              throw data.error;
            }
          }).catch(err => {
            this.$message.error("确定完成失败: " + err);
          }).finally(() => {
            this.loading = false;
          })
        });
      }
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
