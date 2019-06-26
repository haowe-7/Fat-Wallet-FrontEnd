import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import tasks from './modules/tasks';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users,
    tasks
  },
  getters
});
export default store;
