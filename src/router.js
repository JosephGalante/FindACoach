import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from './views/coaches/CoachDetails.vue'
import CoachesList from './views/coaches/CoachesList.vue'
import ContactCoach from './views/requests/ContactCoach.vue'
import CoachRegister from './views/coaches/CoachRegister.vue'
import RequestsReceived from './views/requests/RequestsReceived.vue'
import NotFound from './views/NotFound.vue'
import UserAuth from './views/auth/UserAuth.vue'
import store from './store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
    },
    {
      path: '/register',
      meta: { requiresAuth: true },
      name: 'Register',
      component: CoachRegister,
    },
    {
      path: '/requests',
      meta: { requiresAuth: true },
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
      meta: { requiresUnauth: true },
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

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
