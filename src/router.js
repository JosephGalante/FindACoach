import { createRouter, createWebHistory } from 'vue-router'
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
      component: () => import('./views/coaches/CoachRegister.vue'),
    },
    {
      path: '/requests',
      meta: { requiresAuth: true },
      name: 'Requests',
      component: () => import('./views/requests/RequestsReceived.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('./views/requests/ContactCoach.vue'),
    },
    {
      path: '/coaches',
      name: 'CoachesList',
      component: () => import('./views/coaches/CoachesList.vue'),
    },
    {
      path: '/coaches/:id',
      name: 'CoachDetail',
      component:  () => import('./views/coaches/CoachDetails.vue'),
      props: true,
      children: [
        {
          path: 'contact',
          name: 'ContactCoach',
          component: () => import('./views/requests/ContactCoach.vue'),
        },
      ],
    },
    {
      path: '/auth',
      meta: { requiresUnauth: true },
      name: 'Auth',
      component: () => import('./views/auth/UserAuth.vue'),
    },
    {
      path: '/:notFound(.*)',
      name: 'NotFound',
      component: () => import('./views/NotFound.vue'),
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
