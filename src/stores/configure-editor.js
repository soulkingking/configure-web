import { ref } from 'vue';
import { defineStore } from 'pinia';

// 编辑器数据存储
export const useConfigureEditorStore = defineStore(
  'configure-editor',
  () => {
    // 图纸数据
    const dataSheets = ref();

    const setDataSheets = (data) => {
      dataSheets.value = data;
    };

    return { dataSheets, setDataSheets };
  },
  { persist: true }
);
