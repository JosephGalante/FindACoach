import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import CoachesList from './views/CoachesList.vue'
import CoachDetail from './views/CoachDetails.vue'
import RegisterCoach from './views/RegisterCoach.vue'
import RequestsReceived from './views/RequestsReceived.vue'
import ContactCoach from './views/ContactCoach.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterCoach,
    },
    {
      path: '/requests',
      name: 'Requests',
      component: RequestsReceived,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactCoach,
    },
    {
      path: '/coaches',
      name: 'CoachesList',
      component: CoachesList,
    },
    {
      path: '/coaches/:id',
      name: 'CoachDetail',
      component: CoachDetail,
    },
    {
      path: '/:notFound(.*)',
      redirect: '/',
    },
  ],
})

export default router
