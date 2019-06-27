import { createTask, closeTask, modifyTask, getTaskInfo } from '@/api/tasks';

const tasks = {
  state: {
    recommend_task_list: [],
    submit_task_form: {
      title: '',
      task_type: 1,
      reward: 1,
      description: '',
      due_time: '',
      max_participate: 10,
      extra: null,
      image: 123123
    }
  },

  mutations: {
    SET_RECOMMEND_TASK_LIST: (state, recommend_task_list) => {
      state.recommend_task_list = recommend_task_list;
    },
    SET_SUBMIT_TASK_FORM: (state, submit_task_form) => {
      state.submit_task_form = submit_task_form;
    },
    SET_EXTRA: (state, extra) => {
      state.submit_task_form.extra = extra;
    },
    GET_SUBMIT_TASK_FROM: (state) => {
      return state.submit_task_form;
    }
  },

  actions: {
    GetRecommendTasks({ commit }, offset, limit) {
      return new Promise((resolve, reject) => {
        getTaskInfo({
          offset: offset,
          limit: limit
        }).then(response => {
          const status = response.status;
          const data = response.data;
          if (status === 200) {
            commit('SET_RECOMMEND_TASK_LIST', data.data);
            resolve();
          } else {
            throw data.error;
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    UpDateTaskForm({ commit }, uploadform) {
      commit('SET_SUBMIT_TASK_FORM', uploadform);
    },
    UpDateExtra({ commit }, extra) {
      commit('SET_EXTRA', extra);
    },
    SubmitTaskForm({ state }) {
      console.log(state.submit_task_form);
      return new Promise((resolve, reject) => {
        createTask(state.submit_task_form).then(response => {
          const status = response.status;
          const data = response.data;
          if (status === 200) {
            resolve();
          } else {
            throw data.error;
          }
        }).catch(error => {
          reject(error);
        })
      });
    }
  }
};

export default tasks;
