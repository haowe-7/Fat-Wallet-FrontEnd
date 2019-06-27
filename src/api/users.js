import request from '@/utils/requests';

// 登录
export function login(username, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  });
}

// 登出
export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  });
}

// 注册
export function register(userInfo) {
  return request({
    url: '/api/users/',
    method: 'post',
    data: userInfo
  });
}

// 获取用户信息
export function getInfo(queryJson) {
  return request({
    url: '/api/users?' + json2queryString(queryJson),
    method: 'get'
  });
}

// 获取登录信息
export function getLoginInfo() {
  return request({
    url: '/api/login',
    method: 'get'
  });
}

// 修改用户信息
export function modifyUser(userInfo) {
  return request({
    url: '/api/users/',
    method: 'patch',
    data: userInfo
  });
}

// 修改密码
export function modifyPassword(password) {
  return request({
    url: '/api/users/',
    method: 'put',
    data: {
      password: password
    }
  });
}
