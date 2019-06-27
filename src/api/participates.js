import request from '@/utils/requests';
import json2queryString from '@/utils/urls';

// 获取参与信息
export function getParticipatesInfo(queryJson) {
  return request({
    url: '/api/participates?'+json2queryString(queryJson),
    method: 'get'
  });
}

// 申请参与
export function applyForParticipates(task_id) {
  return request({
    url: '/api/participates/',
    method: 'post',
    data: {
      task_id: task_id
    }
  });
}

// 取消参与
export function deleteParticipates(task_id, participator_id) {
  return request({
    url: '/api/participates/',
    method: 'delete',
    data: {
      task_id: task_id,
      participator_id: participator_id
    }
  });
}

// 审批参与
export function reviewParticipates(task_id, participator_id, view) {
  return request({
    url: '/api/participates/review',
    method: 'post',
    data: {
      task_id: task_id,
      participator_id: participator_id,
      view: view
    }
  });
}

// 确认完成任务
export function confirmFinish(task_id) {
  return request({
    url: '/api/participates/finish',
    method: 'post',
    data: {
      task_id: task_id,
    }
  });
}
