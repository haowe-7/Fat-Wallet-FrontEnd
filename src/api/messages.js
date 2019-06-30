import request from '@/utils/requests';
import json2queryString from '@/utils/urls';

// 获取消息
export function getMessages(queryJson) {
  return request({
    url: '/api/messages?' + json2queryString(queryJson),
    method: 'get'
  });
}

// 发送消息
export function sendMessage(user_id, content) {
  return request({
    url: '/api/messages',
    method: 'post',
    data: {
      user_id: user_id,
      content: content
    }
  });
}

// 删除消息
export function deleteMessage(message_id) {
  return request({
    url: '/api/messages',
    method: 'delete',
    data: {
      message_id: message_id
    }
  });
}
