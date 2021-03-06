import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
import router from '../router';
// import { getToken } from '@/utils/auth';
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true // 自动携带 cookies
});

// request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.headers['X-Token'] = getToken();
//   }
//   return config;
// }, error => {
//   // Do something with request error
//   console.log(error); // for debug
//   Promise.reject(error);
// });

// const noReloginUrlList = [
//   /.*\/api\/auth\/.*/
// ];
// function urlInList(urlList, url) {
//   let flag = false;
//   urlList.forEach(element => {
//     if (element.test(url)) {
//       flag = true;
//     }
//   });
//   return flag;
// }

// respone拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 400) {
      if (error.response.data.error) {
        return Promise.reject(error.response.data.error);
      }
    } else if (error.response.status === 401 || error.response.status === 403) {
      console.log('未认证', error.request.responseURL);
      if (router.currentRoute.path !== '/login') {
        // MessageBox.confirm('认证已失效，可以取消继续留在该页面，或者重新登录', '未认证', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   router.push({ path: '/login' });
        // }).catch(() => {
        // });
        router.push({ path: '/login' });
        // store.dispatch('FeLogOut').then(() => {
        //   MessageBox.confirm('认证已失效，可以取消继续留在该页面，或者重新登录', '未认证', {
        //     confirmButtonText: '重新登录',
        //     cancelButtonText: '取消',
        //     type: 'warning'
        //   }).then(() => {
        //     router.push({ path: '/login' });
        //   }).catch(() => {
        //   });
        // });
      }
    } else if (error.response.status > 400) {
      console.log(`未指明的错误: ${error.response.status}`);
      console.error(error);
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
);
export default service;
