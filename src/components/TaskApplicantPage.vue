<template>
  <div>
    <div v-for="user in current_task_info.participators" v-if="user.status === '申请中'" :key="user.id">
      <el-card class="user-item" shadow="hover">
        <div id="user-icon">
          <img src="../assets/background.jpg" />
        </div>
        <div style="display:inline-block; width:75%; vertical-align:top">
          <div :class="(user.user_id === user_id) ? 'username2' : 'username'">{{ user.username }}</div>
          <div class="contact">联系电话：{{ user.phone }}</div>
          <div class="contact">邮箱：{{ user.email }}</div>
        </div>
        <el-button class="edit-button2"
          v-if="user.user_id === user_id"
          type="warning"
          :loading="cancelLoading"
          round plain
          v-on:click="cancelApproval(user.user_id)">
          {{ cancelText }}</el-button>
        <el-button class="edit-button2"
          v-if="user.user_id !== user_id"
          type="primary"
          round plain
          v-on:click="displayDialog(user.user_id)">
          {{ (current_task_info && current_task_info.creator_id == user_id) ? "审批申请" : "申请中"  }}</el-button>
      </el-card>
    </div>

    <el-dialog
      title="进行审批"
      :visible.sync="dialogVisible"
      width="30%">
      <p>是否同意该用户的申请？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Approval('yes')">同意申请</el-button>
        <el-button type="warning" @click="Approval('no')">驳回申请</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getParticipatesInfo, deleteParticipates, reviewParticipates } from '@/api/participates';
import { mapGetters } from 'vuex';

export default {
  name: 'TaskDiscussPage',
  components: {
  },
  beforeMount() {
  },
  data() {
    return {
      task_id: null,
      applicant: [],
      cancelText: "取消申请",
      cancelLoading: false,
      dialogVisible: false,
      sp_user_id: null,
    };
  },
  methods: {
    Approval(view) {
      reviewParticipates(this.current_task_info.task_id, this.sp_user_id, view)
      .then(response => {
        const status = response.status;
        const data = response.data;
        if (status === 200) {
          for (let i = 0; i < this.current_task_info.participators.length; i++) {
            if (this.current_task_info.participators[i].user_id === this.sp_user_id) {
              if (view === 'yes') {
                this.current_task_info.participators[i].status = '进行中';
              } else {
                this.current_task_info.participators.splice(i, 1);
              }
              break;
            }
          }
          this.$store.dispatch('UpDateCurrentTaskInfo', this.current_task_info);
          this.$message.success("审批申请成功！");
        } else {
          throw data.error;
        }
      })
      .catch(err => {
        this.$message.error("审批申请失败：" + err);
      })
      .finally(() => {
        this.dialogVisible = false;
      })
    },
    displayDialog(user_id) {
      if (this.current_task_info) {
        this.sp_user_id = user_id;
        this.dialogVisible = true;
      }
    },
    cancelApproval(user_id) {
      this.$confirm('确定取消申请', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelLoading = true;
        console.log(this.current_task_info.task_id, user_id);
        deleteParticipates(this.current_task_info.task_id, user_id).then((response) => {
          const status = response.status;
          const data = response.data;
          if (status === 200) {
            for (let i = 0; i < this.current_task_info.participators.length; i++) {
              if (this.current_task_info.participators[i].user_id === user_id) {
                this.current_task_info.participators.splice(i, 1);
                break;
              }
            }
            this.$store.dispatch('UpDateCurrentTaskInfo', this.current_task_info);
            this.$message.success('取消申请成功!');
          } else {
            throw data.error;
          }
        }).catch(error => {
          this.$message.error("取消申请失败: " + error);
        }).finally(() => {
          this.cancelLoading = false;
        })
      }).catch(() => {

      }).finally(() => {

      });
    }
  },
  computed: {
    ...mapGetters({
      user_id: 'user_id',
      current_task_info: 'current_task_info'
    })
  },
};
</script>

<style scoped>

/* 卡片item */
.user-item {
  margin-top: 1%;
  border-radius: 6px;
}

/*用户头像*/
#user-icon {
  display: inline-block;
  width: 48px;
  height:48px;
  margin-right: 12px;
  margin-left: 0px;
  position:relative;
  padding-bottom: 0px;
}

#user-icon img {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
}

/* 用户名 */
.username {
  font-size: 120%;
  color: cornflowerblue;
  font-weight: bold;
}

/* 用户名 */
.username2 {
  font-size: 120%;
  color: DarkOrange;
  font-weight: bold;
}

/* 个人签名 */
#discuss-text {
  margin-top: 1%;
  font-size: 100%;
  overflow: hidden;
}

/* 控制按钮 */
.edit-button2 {
  display: inline-block;
  width: 15%;
  font-size: 17px;
}

.invisible {
  display: none !important;
}

</style>
