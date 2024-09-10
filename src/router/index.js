import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import ConfigureEditor from '../views/configure-editor/ConfigureEditor.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/editor',
      name: 'Editor',
      component: ConfigureEditor
    }
  ]
});

export default router;
