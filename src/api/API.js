import { getBaseUrl } from '@/util';
const doc = import.meta.env.VITE_APP_MICRO_SERVICE_DOC_PATH;
const tpm = import.meta.env.VITE_APP_MICRO_SERVICE_BASE_PATH;
const auth = import.meta.env.VITE_APP_MICRO_SERVICE_AUTH_PATH;
export default {
  // TAG: 用户信息,
  getUser: `${tpm}/user/model`, // 获取单个用户

  // TAG 用户配置
  getBaseUserConfig: `${tpm}/baseUserConfig/model`, // 获取用户配置

  // TAG 文件
  uploadFile: `${getBaseUrl()}${doc}/put`, // 文件上传
  download: `${getBaseUrl()}${doc}/get/` // 文件下载
};
