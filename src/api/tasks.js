import request from '@/utils/requests';
import json2queryString from '@/utils/urls';

// 创建任务
export function createTask(taskInfo) {
  return request({
    url: '/api/tasks',
    method: 'post',
    data: taskInfo
  });
}

// 发布任务
export function releaseTask(task_id) {
  return request({
    url: '/api/tasks/open',
    method: 'post',
    data: {
      task_id: task_id
    }
  });
}

// 关闭任务
export function closeTask(task_id) {
  return request({
    url: '/api/tasks/close',
    method: 'post',
    data: {
      task_id: task_id
    }
  });
}

// 修改任务
export function modifyTask(taskInfo) {
  return request({
    url: '/api/tasks/',
    method: 'patch',
    data: taskInfo
  });
}

// 获取任务信息
export function getTaskInfo(queryJson) {
  return request({
    url: '/api/tasks?' + json2queryString(queryJson),
    method: 'get',
  });
}