import { ref } from 'vue';
import { defineStore } from 'pinia';

// 编辑器数据存储
export const useUserStore = defineStore(
  'user',
  () => {
    // 图纸数据
    const token = ref(
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJ1c2VyOjE2MzY5NjIyMzI4MjM6MTQxNjk1NTQ5ODQ3Nzg4NzQ4OSIsInJuU3RyIjoiaTVjNFJYQ2FNOFV2YmxrWHhxWEpDcEdBaWtlUllCdE4ifQ.HaywsFKB352TsFW2DqfWHLJu0IU6CONSd9k6RuaGT2E'
    );

    const setToken = (token) => {
      token.value = token;
    };
    return { token, setToken };
  },
  { persist: true }
);
