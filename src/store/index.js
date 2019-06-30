import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import users from './modules/users';
import tasks from './modules/tasks';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    users,
    tasks
  },
  getters,
  plugins: [createPersistedState()]
});
export default store;
