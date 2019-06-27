import request from '@/utils/requests';
import json2queryString from '@/utils/urls';

// 创建评论
export function createComment(task_id, content) {
  return request({
    url: '/api/comments/',
    method: 'post',
    data: {
      task_id: task_id,
      content: content
    }
  });
}

// 删除评论
export function deleteComment(comment_id) {
  return request({
    url: '/api/comments/',
    method: 'delete',
    data: {
        comment_id: comment_id
    }
  });
}

// 修改评论
export function modifyComment(comment_id, content) {
  return request({
    url: '/api/comments',
    method: 'patch',
    data: {
      comment_id: comment_id,
      content: content
    }
  });
}

// 根据任务ID获取评论信息
export function getComments(queryJson) {
  return request({
    url: '/api/comments?' + json2queryString(queryJson),
    method: 'get'
  });
}

