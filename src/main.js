import './styles/main.css';

import { createApp } from 'vue';

import App from './App.vue';

import router from './router';
import pinia from './stores';
import plugin from './plugin';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(plugin);

app.mount('#app');
