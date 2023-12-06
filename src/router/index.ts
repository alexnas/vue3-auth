import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem('token')

  if (!!to.meta.authRequired && !isAuth) {
    next('/auth')
  } else {
    next()
  }
})

export default router
