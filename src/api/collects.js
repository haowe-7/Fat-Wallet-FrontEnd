import request from '@/utils/requests';

// 收藏任务
export function createCollect(task_id) {
  return request({
    url: '/api/collects',
    method: 'post',
    data: {
      task_id: task_id
    }
  });
}

// 收藏任务
export function deleteCollect(task_id) {
  return request({
    url: '/api/collects',
    method: 'delete',
    data: {
      task_id: task_id
    }
  });
}

// 获取收藏信息
export function getCollects(user_id, task_id) {
  return request({
    url: '/api/collects?user_id=' + user_id + 'task_id=' + task_id,
    method: 'get'
  });
}
