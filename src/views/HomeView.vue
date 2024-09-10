<script setup>
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';

import { useRoute } from 'vue-router';
const route = useRoute();
const userStore = useUserStore();
const appStore = useAppStore();
const { setToken, setRefreshToken, setUser } = userStore;
const { setAppId } = appStore;
// 路由跳转携带参数
if (route.query.token && route.query.refreshToken && route.query.userId && route.query.appId) {
  setToken(route.query.token);
  setRefreshToken(route.query.refreshToken);
  setUser({
    userId: route.query.userId
  });
  setAppId(route.query.appId);
  location.href = '/editor?id=' + route.query.id;
}
</script>

<template>
  <div></div>
</template>
