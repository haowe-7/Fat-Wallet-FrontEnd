<template>
  <div>
    <div v-for="user in applicant" :key="user.id">
      <el-card class="user-item" shadow="hover">
        <div id="user-icon">
          <img src="../assets/background.jpg" />
        </div>
        <div style="display:inline-block; width:75%; vertical-align:top">
          <div id="username">{{ user.username }}</div>
          <div class="contact">联系电话：{{ user.phone }}</div>
          <div class="contact">邮箱：{{ user.email }}</div>
        </div>
        <el-button id="edit-button" :class="controlButtonVisible ? '' : 'invisible'" round>{{controlButtonText}}</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getParticipatesInfo } from '@/api/participates'

export default {
  name: 'TaskDiscussPage',
  components: {
  },
  beforeMount() {
    this.task_id = this.$route.query.task_id;
    getParticipatesInfo({
      task_id: this.task_id
    }).then(response => {
      const status = response.status;
      const data = response.data;
      console.log(data);
      if (status === 200) {
        const users = data.data;
        this.applicant = [];
        for(const user of users) {
          if (user.status === '申请中') {
            this.applicant.push(user);
          }
        }
      } else {
        throw data.error;
      }
    }).catch(err => {
      this.$message.error("获取信息失败: " + error);
    });
  },
  props: {
    controlButtonVisible: {
      type: Boolean,
      default: true
    }, 
    controlButtonText: {
      type: String,
      default: '同意申请'
    }
  },
  data() {
    return {
      task_id: null,
      applicant: []
    };
  },
  methods: {
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
#username {
  font-size: 120%;
  color: cornflowerblue;
  font-weight: bold;
}

/* 个人签名 */
#discuss-text {
  margin-top: 1%;
  font-size: 100%;
  overflow: hidden;
}

/* 控制按钮 */
#edit-button {
  display: inline-block;
  width: 15%;
}

.invisible {
  display: none !important;
}

</style>
