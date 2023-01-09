import { createRouter, createWebHistory } from 'vue-router'
import store from './store/index.js'

const CoachRegister = () => import('./views/coaches/CoachRegister.vue')
const RequestsReceived = () => import('./views/requests/RequestsReceived.vue')
const ContactCoach = () => import('./views/requests/ContactCoach.vue')
const CoachDetails = () => import('./views/coaches/CoachDetails.vue')
const CoachesList = () => import('./views/coaches/CoachesList.vue')
const UserAuth = () => import('./views/auth/UserAuth.vue')
const NotFound = () => import('./views/NotFound.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      path: '/register',
      meta: { requiresAuth: true },
      component: CoachRegister,
    },
    {
      path: '/requests',
      meta: { requiresAuth: true },
      component: RequestsReceived,
    },
    {
      path: '/auth',
      meta: { requiresUnauth: true },
      component: UserAuth,
    },
    { path: '/:notFound(.*)', component: NotFound },
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
