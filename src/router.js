import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from './views/CoachDetails.vue'
import CoachesList from './views/CoachesList.vue'
import ContactCoach from './views/ContactCoach.vue'
import RegisterCoach from './views/RegisterCoach.vue'
import RequestsReceived from './views/RequestsReceived.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
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
      children: [
        {
          path: 'contact',
          name: 'ContactCoach',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/:notFound(.*)',
      redirect: '/',
    },
  ],
})

export default router
