import request from '@/utils/request';

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
