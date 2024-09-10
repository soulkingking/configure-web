import { ref } from 'vue';
import { defineStore } from 'pinia';

// 编辑器数据存储
export const useAppStore = defineStore(
  'app',
  () => {
    const appId = ref();

    const setAppId = (id) => {
      appId.value = id;
    };

    return {
      appId,
      setAppId
    };
  },
  { persist: true }
);
