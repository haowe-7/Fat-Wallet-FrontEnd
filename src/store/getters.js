const getters = {
  user_id: state => state.users.info.user_id,
  username: state => state.users.info.username,
  email: state => state.users.info.email,
  phone: state => state.users.info.phone,
  balance: state => state.users.info.balance,
  avatar: state => state.users.info.avatar,
  profile: state => state.users.info.profile,
  role: state => state.users.info.role,
  auth: state => state.users.auth,
  current_task_info: state => state.tasks.current_task_info,
  recommend_task_list: state => state.tasks.recommend_task_list
};

export default getters;
