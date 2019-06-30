import request from '@/utils/requests';
import json2queryString from '@/utils/urls';

// 获取问卷提交
export function getSubmissions(queryJson) {
  return request({
    url: '/api/submissions?' + json2queryString(queryJson),
    method: 'get'
  });
}

// 提交问卷答案
export function submitAnswers(task_id, answer) {
  return request({
    url: '/api/submissions',
    method: 'post',
    data: {
      task_id: task_id,
      answer: answer
    }
  });
}
