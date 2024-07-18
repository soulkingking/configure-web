import { createRouter, createWebHistory } from 'vue-router'
import ConfigureEditor from '../views/configure-editor/ConfigureEditor.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Editor',
      component: ConfigureEditor
    }
  ]
})

export default router
