import './styles/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import pinia from './stores';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import 'virtual:uno.css';
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
