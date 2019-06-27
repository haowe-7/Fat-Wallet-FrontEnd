const getters = {
  user_id: state => state.users.info.user_id,
  username: state => state.users.info.username,
  email: state => state.users.info.email,
  role: state => state.users.info.role,
  auth: state => state.users.auth,
  recommend_task_list: state => state.tasks.recommend_task_list
};

export default getters;
