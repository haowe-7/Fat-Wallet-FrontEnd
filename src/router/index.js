import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import MainPage from '@/components/MainPage';
import Task from '@/components/TaskPage';
import MyInfo from '@/components/MyInfoPage';
import MyInfoList from '@/components/MyInfoList';
import MyPublishTask from '@/components/MyPublishTask';
import PublishDeliverTaskDetail from '@/components/PublishDeliverTaskDetail';
import TaskBreifInfoPage from '@/components/TaskBreifInfoPage';
import TaskDiscussPage from '@/components/TaskDiscussPage';
import TaskApplicantPage from '@/components/TaskApplicantPage';
import DeliverTaskDetailPage from '@/components/DeliverTaskDetailPage';
import Edit from '@/components/QuesManage/Edit';
import Fill from '@/components/QuesManage/Fill';
import SettingPage from '@/components/SettingPage';
import PersonalInfoComponent from '@/components/Setting/PersonalInfoComponent';
import PersonalPrivacyComponent from '@/components/Setting/PersonalPrivacyComponent';

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
          children: [
            {
              path: '/',
              redirect: 'myinfolist'
            },
            {
              path: 'myinfolist',
              name: 'MyInfoList',
              component: MyInfoList,
            },
            {
              path: 'mypublishtask',
              name: 'MyPublishTask',
              component: MyPublishTask
            },
            {
              path: 'publish-deliver-task-detail',
              name: 'PublishDeliverTaskDetail',
              component: PublishDeliverTaskDetail,
            },
            {
              path: 'ques-edit',
              name: 'Edit',
              component: Edit,
            }
          ]
        },
        {
          path: 'task-breif-info',
          name: 'TaskBreifInfoPage',
          component: TaskBreifInfoPage,
          children: [
            {
              path: '/',
              redirect: 'discuss'
            },
            {
              path: 'discuss',
              name: 'TaskDiscussPage',
              component: TaskDiscussPage
            },
            {
              path: 'applicant',
              name: 'TaskApplicantPage',
              component: TaskApplicantPage
            }
          ]
        },
        {
          path: 'deliver-task-detail',
          name: 'DeliverTaskDetailPage',
          component: DeliverTaskDetailPage,
        },
        {
          path: 'ques-task-detail',
          name: 'QuesTaskDetailPage',
          component: Fill,
        },
        {
          path: 'setting',
          name: 'SettingPage',
          component: SettingPage,
          children: [
            {
              path: '/',
              redirect: 'info'
            },
            {
              path: 'info',
              name: 'PersonalInfoComponent',
              component: PersonalInfoComponent
            },
            {
              path: 'privacy',
              name: 'PersonalPrivacyComponent',
              component: PersonalPrivacyComponent
            }
          ]
        }
      ]
    }
  ]
});
