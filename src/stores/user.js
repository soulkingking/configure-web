import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { getUser, getBaseUserConfig } from '@/api/system/user/user';
import { useAppStore } from './app';

// 编辑器数据存储
export const useUserStore = defineStore(
  'user',
  () => {
    const appStore = useAppStore();

    const token = ref();

    const refreshToken = ref();

    const user = ref();

    const userConfig = ref();

    const setToken = (value) => {
      token.value = value;
    };
    const setRefreshToken = (value) => {
      refreshToken.value = value;
    };

    const setUser = (value) => {
      user.value = value;
    };

    const setUserConfig = (value) => {
      userConfig.value = value;
    };

    // 获取用户信息
    const getUserDetail = async () => {
      const [err, res] = await getUser(user.value);
      if (!err && res.result) {
        setUser(res.result);
      }
    };

    // 获取用户配置
    const getUserConfig = async () => {
      const { appId } = storeToRefs(appStore);
      const [err, res] = await getBaseUserConfig(user.value.userId, appId.value);
      if (!err && res.result) {
        setUserConfig(JSON.parse(res.result.configContent));
      }
    };

    return {
      token,
      refreshToken,
      user,
      userConfig,
      setToken,
      setUser,
      setRefreshToken,
      setUserConfig,
      getUserDetail,
      getUserConfig
    };
  },
  { persist: true }
);
