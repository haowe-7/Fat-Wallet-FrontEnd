import request from '@/utils/requests';

export function login(username, password) {
  return request({
    url: '/api/users/login',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function logout() {
  return request({
    url: '/api/users/logout',
    method: 'post'
  });
}

export function register(userInfo) {
  return request({
    url: '/api/users/register',
    method: 'post',
    data: userInfo
  });
}

export function getInfo(user_id) {
  return request({
    url: '/api/users/' + user_id || '0',
    method: 'get'
  });
}

export function getLoginInfo() {
  return request({
    url: '/api/users/login',
    method: 'get'
  });
}
