const getters = {
  user_id: state => state.user.info.user_id,
  username: state => state.user.info.username,
  email: state => state.user.info.email,
  role: state => state.user.info.role,
  auth: state => state.user.auth,
};

export default getters;
