<template>
	<div class="container">
		<div class="qu-wrap">
			<header>
				<span @click="iterator = backBtn(); iterator.next()">&lt; 返回</span>
				<p> 用户答案审批 </p>
			</header>
			<div class="qu-content">
				<section class="qu-item" v-for="(item, index) in questions">
					<h3>{{ `Q${index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.topic}` }}
						<span v-if="item.isMandatory"> *</span>
					</h3>
					<textarea rows="8"
            cols="80" id="textarea-answer"
            v-if="item.type === 'textarea'"
            readonly="readonly">{{ answers[index] }}
					</textarea>
					<ul v-else class="options-list">
						<li v-for="(option, optIndex) in item.options">
							<label >
								<input
                  v-if="item.type === 'radio'"
                  :type="item.type"
                  :name="index + 1"
                  :checked="optIndex === answers[index]"
                  disabled="disabled">
								<input
                  v-else
                  :type="item.type"
                  :name="index + 1"
                  :checked="(answers[index].includes(optIndex))"
                  disabled="disabled">
								<span>{{ option }}</span>
							</label>
						</li>
					</ul>
				</section>
			</div>
			<footer>
        <el-button class='submit-button' type="primary" @click="Agree">确认用户完成</el-button>
        <el-button class='submit-button' type="warning" @click="Reject">反对用户完成</el-button>
			</footer>
		</div>
	</div>
</template>

<script>
import Store from '@/utils/store';
import { getTaskExtra, reviewTaskResult } from '@/api/tasks';
import { getSubmissions } from '@/api/submissions';
import { mapGetters } from 'vuex';

export default {
	name: 'Answers',
	data() {
		return {
      task_id: null,
      user_id: null,
			quData: {},
			questions: [],
			answers: {},
			promptText: '',
			isShowPrompt: false,
		}
	},
  computed: {
    ...mapGetters({
      current_task_info: 'current_task_info'
    })
  },
	beforeMount() {
		this.task_id = this.$route.query.task_id;
    this.user_id = this.$route.query.user_id;
		let Loading = this.$loading({
			lock: true,
			text: '正在从数据库获取数据中',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		});

		getTaskExtra(this.task_id).then(response => {
      const status = response.status;
      const data = response.data;
      if (status === 200) {
        let extra = data.data;
        console.log(data);
        this.quData.questions = extra.questions;
        this.questions = this.quData.questions;
        this.questions.forEach((item) => {
          if (item.type === 'checkbox') {
            item.answer = [];
          }
          else {
            item.answer = '';
          }
        });
        Loading.close();
      } else {
        throw data.error;
      }
		}).catch(err => {
      Loading.close();
      this.$message.error("获取问卷信息失败：" + err);
		});

    getSubmissions({
      task_id: this.task_id,
      user_id: this.user_id
    }).then(response => {
      const status = response.status;
      const data = response.data;
      if (status === 200) {
        console.log('问卷答案：', data);
        this.answers = data.data[0].answer;
      } else {
        throw data.error;
      }
    }).catch(err => {
      this.$message.error("获取问卷答案失败：" + err);
    });
	},
  
  methods: {
    Agree() {
      this.$confirm('确认同意用户完成任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.Approval("yes");
      });
    },

    Reject() {
      this.$confirm('确认反对用户完成任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Approval("no");
      });
    },

    Approval(view) {
      reviewTaskResult(this.task_id, this.user_id, view)
      .then(response => {
        const status = response.status;
        const data = response.data;
        if (status === 200) {
          for (let i = 0; i < this.current_task_info.participators.length; i++) {
            if (this.current_task_info.participators[i].user_id === this.user_id) {
              if (view === 'yes') {
                this.current_task_info.participators[i].status = '已完成';
              } else {
                this.current_task_info.participators[i].status = '已驳回';
              }
              break;
            }
          }
          this.$store.dispatch('UpDateCurrentTaskInfo', this.current_task_info);
          this.$message.success("审批成功！");
          this.$router.go(-1);
        } else {
          throw data.error;
        }
      })
      .catch(err => {
        this.$message.error("审批失败：" + err);
      });
    },

    * backBtn() {
      this.$confirm('是否审批返回任务界面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '../../style/_Fill.scss';
.submit-button {
  padding: 15px;
  font-size: 120%;
}

#textarea-answer {
  font-size: 20px;
  color: gray;
}
</style>
