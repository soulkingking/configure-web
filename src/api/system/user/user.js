import { post } from '@/util/request';
import API from '../../API';

// 获取单个用户
export async function getUser(body) {
  const res = await post(API.getUser, body);
  return res;
}

/**
 * 获取用户配置
 * @param {*} userId
 * @returns
 */
export async function getBaseUserConfig(userId, appId) {
  const res = await post(API.getBaseUserConfig, {
    userId,
    appId
  });
  return res;
}
