import { createTask, releaseTask, closeTask, modifyTask, getTaskInfo } from '@/api/tasks';

const tasks = {
  state: {
    recommend_task_list: []
  },

  mutations: {
    SET_RECOMMEND_TASK_LIST: (state, recommend_task_list) => {
      state.recommend_task_list = recommend_task_list;
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
    }
  }
};

export default tasks;
