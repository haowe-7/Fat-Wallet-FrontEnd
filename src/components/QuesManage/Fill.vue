<template>
	<div class="container">
		<div class="qu-wrap">
			<header>
				<span @click="iterator = backBtn(); iterator.next()">&lt; 返回</span>
				<p>{{current_task_info ? current_task_info.title : '问卷调查填写' }}</p>
			</header>
			<div class="qu-content">
				<section class="qu-item" v-for="(item, index) in questions">
					<h3>{{ `Q${index + 1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.topic}` }}
						<span v-if="item.isMandatory"> *</span>
					</h3>
					<textarea rows="8"
            cols="80"
            v-if="item.type === 'textarea'"
            v-model="item.answer"
            :required="item.isMandatory">
					</textarea>
					<ul v-else class="options-list">
						<li v-for="(option, optIndex) in item.options">
							<label >
								<input v-if="item.type === 'radio'"
									   :type="item.type"
									   :name="index + 1"
									   @change="item.answer = optIndex">
								<input v-else
									   :type="item.type"
									   :name="index + 1"
									   @change="checkboxAnswer($event, optIndex, item.answer)">
								<span>{{ option }}</span>
							</label>
						</li>
					</ul>
				</section>
			</div>
			<footer>
				<span id="submitBtn" @click="iterator = submitBtn(); iterator.next()">提交问卷</span>
			</footer>
		</div>
		<div class="overlay" v-show="isShowPrompt">
			<div class="prompt-box">
				<header>
					<span>提示</span>
					<a href="javascript:;" @click="isShowPrompt = false">&times;</a>
				</header>
				<p>{{ promptText }}</p>
				<footer>
					<span @click="isShowPrompt = false; iterator && iterator.next()">确定</span>
					<span @click="isShowPrompt = false">取消</span>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import Store from '@/utils/store';
import { getTaskExtra } from '@/api/tasks';
import { submitAnswers } from '@/api/submissions';
import { mapGetters } from 'vuex';

export default {
	name: 'Fill',
	data() {
		return {
			quData: {},
			questions: [],
			answers: {},
			promptText: '',
			isShowPrompt: false,
		}
	},
  computed: {
    ...mapGetters({
      user_id: 'user_id',
      current_task_info: 'current_task_info'
    })
  },
	beforeMount() {
		let task_id = this.$route.query.task_id;
		let Loading = this.$loading({
			lock: true,
			text: '正在从数据库获取数据中',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)'
		});
		getTaskExtra(task_id).then(response => {
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
      this.$message.error("获取信息失败："+err);
		});
	},
  
  methods: {

    showPrompt(text) {
      this.promptText = text;
      this.isShowPrompt = true;
    },

    checkboxAnswer(event, index, answer) {
      if (event.target.checked) {
        answer.push(index);
      } else {
        answer.splice(answer.indexOf(index), 1);
      }
    },

    requireValidate() {
      const textareas = document.querySelectorAll('textarea');
      return [].every.call(textareas, item => {
        if (item.hasAttribute('required') && item.value.trim() === '') {
          return false;
        }
        return true;
      });
    },

    getAnswer() {
      this.questions.forEach((item, index) => {
        this.answers[index] = item.answer;
      });
    },

    sendAnswer() {
      this.getAnswer();
      console.log(this.answers);
      submitAnswers(this.current_task_info.task_id, this.answers).then(response => {
        const status = response.status;
        const data = response.data;
        if (status === 200) {
          this.$message.success("成功提交问卷，等待发布者审批！");
          for (let i = 0; i < this.current_task_info.participators.length; i++) {
            if (this.current_task_info.participators[i].user_id === this.user_id) {
              this.current_task_info.participators.status = '审批中';
              break;
            }
          }
          this.$router.go(-1);
        } else {
          throw data.error;
        }
      }).catch(err => {
        this.$message.error("提交问卷失败：" + err);
      });
    },

    * submitBtn() {
      if (!this.requireValidate()) {
        this.$confirm('有必填项未填写，无法提交！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
      } else {
        this.$confirm('确认提交问卷吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.sendAnswer();
        });
      }
    },

    * backBtn() {
      this.$confirm('是否放弃答题返回任务界面?', '提示', {
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
</style>
