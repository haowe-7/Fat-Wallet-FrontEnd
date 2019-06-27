import { login, logout, register, getInfo, getLoginInfo } from '@/api/users';

const users = {
  state: {
    info: {
      user_id: null,
      username: null,
      avatar: null,
      email: null
    },
    auth: false
  },

  mutations: {
    SET_USERID: (state, user_id) => {
      state.info.user_id = user_id;
    },
    SET_USERNAME: (state, username) => {
      state.info.username = username;
    },
    SET_AVATAR: (state, avatar) => {
      state.info.avatar = avatar;
    },
    SET_EMAIL: (state, email) => {
      state.info.email = email;
    },
    SET_AUTH: (state, auth) => {
      state.auth = auth;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          const status = response.status;
          const data = response.data;
          if (status === 200) {
            commit('SET_USERID', data.user_id);
            commit('SET_USERNAME', data.username);
            commit('SET_AVATAR', data.avatar);
            commit('SET_EMAIL', data.email);
            commit('SET_AUTH', true);
            resolve();
          } else {
            throw data.error;
          }
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 注册
    Register({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo).then(response => {
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
    },

    // 获取用户信息
    GetInfo({ commit, state }, userId) {
      return new Promise((resolve, reject) => {
        getInfo(userId).then(response => {
          const data = response.data;
          resolve(data);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          dispatch('FeLogOut').then(() => resolve());
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FeLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERID', null);
        commit('SET_USERNAME', null);
        commit('SET_AVATAR', null);
        commit('SET_EMAIL', null);
        commit('SET_AUTH', false);
        resolve();
      });
    },

    GetLoginInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getLoginInfo().then(resp => {
          const data = resp.data;
          commit('SET_USERID', data.user_id);
          commit('SET_USERNAME', data.username);
          commit('SET_AVATAR', data.avatar);
          commit('SET_EMAIL', data.email);
          commit('SET_AUTH', true);
          resolve();
        }).catch((err) => reject(err));
      });
    },
  }
};

export default users;
