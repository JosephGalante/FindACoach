import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from './views/coaches/CoachDetails.vue'
import CoachesList from './views/coaches/CoachesList.vue'
import ContactCoach from './views/requests/ContactCoach.vue'
import CoachRegister from './views/coaches/CoachRegister.vue'
import RequestsReceived from './views/requests/RequestsReceived.vue'
import NotFound from './views/NotFound.vue'
import UserAuth from './views/auth/UserAuth.vue'

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
      component: CoachRegister,
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
      props: true,
      children: [
        {
          path: 'contact',
          name: 'ContactCoach',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/auth',
      name: 'Auth',
      component: UserAuth,
    },
    {
      path: '/:notFound(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
