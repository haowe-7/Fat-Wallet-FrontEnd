<template>
	<div class="container">
		<div class="qu-wrap">
			<header>
				<span @click="iterator = backBtn(); iterator.next()">&lt; 返回</span>
				<p>问卷调查填写</p>
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
import { getTaskExtra } from '@/api/tasks'

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
		})
	},
	methods: {

		showPrompt(text) {
			this.promptText = text;
			this.isShowPrompt = true;
		},

		checkboxAnswer(event, index, answer) {
			if (event.target.checked) {
				answer.push(index);
			}
			else {
				answer.splice(answer.indexOf(index), 1);
			}
		},

		requireValidate() {
			let textareas = document.querySelectorAll('textarea');
			return [].every.call(textareas, item => {
				if (item.hasAttribute('required') && item.value.trim() === '') {
					return false;
				}
				return true;
			})
		},

		getAnswer() {
			this.questions.forEach((item, index) => {
				this.answers[`Q${index + 1}answer`] = item.answer;
			})
		},

		sendAnswer() {
			this.getAnswer();
      console.log(this.answers);
			// this.$router.push({path: '/'});
		},

		*submitBtn() {
			let text = ``;
			if (!this.requireValidate()) {
				text = `有必填项未填写，无法提交！`;
				this.iterator = null;
			} else {
				text = `确认提交问卷吗？`
			}

			yield this.showPrompt(text);
			yield this.sendAnswer();
		},

		*backBtn() {
			yield this.showPrompt(`放弃答题回到主页吗？`);
			yield this.$router.push({path: '/'});
		},
	},
}
</script>

<style scoped lang="scss">
@import '../../style/_Fill.scss';
</style>
