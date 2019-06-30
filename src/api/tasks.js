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
    url: '/api/tasks',
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

// 获取任务具体内容
export function getTaskExtra(task_id) {
  return request({
    url: '/api/tasks/extra?task_id=' + task_id,
    method: 'get',
  });
}

// 审批任务完成结果
export function reviewTaskResult(task_id, participator_id, view) {
  return request({
    url: '/api/tasks/review',
    method: 'post',
    data: {
      task_id: task_id,
      participator_id: participator_id,
      view: view
    }
  });
}

