import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import MainPage from '@/components/MainPage';
import Task from '@/components/TaskPage';
import MyInfo from '@/components/MyInfoPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Login
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/mainpage',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/',
          redirect: 'task'
        },
        {
          path: 'task',
          name: 'Task',
          component: Task,
        },
        {
          path: 'myinfo',
          name: 'MyInfo',
          component: MyInfo,
        }
      ]
    }
  ]
});
