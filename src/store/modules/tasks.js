import { createTask, getTaskInfo } from '@/api/tasks';

const tasks = {
  state: {
    current_task_info: null,
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
    SET_CURRENT_TASK_INFO: (state, task_info) => {
      state.current_task_info = task_info;
    },
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
    GetTaskInfo({ commit }, queryJson) {
      return new Promise((resolve, reject) => {
        getTaskInfo(queryJson).then(response => {
          const status = response.status;
          const data = response.data;
          console.log('task_info', data.data[0]);
          if (status === 200) {
            if (data.data[0]) {
              commit('SET_CURRENT_TASK_INFO', data.data[0]);
            }
            resolve();
          } else {
            throw data.error;
          }
        })
      });
    },
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
    UpDateCurrentTaskInfo({ commit }, user_info) {
      commit('SET_CURRENT_TASK_INFO', user_info);
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
        });
      });
    }
  }
};

export default tasks;
