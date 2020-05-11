import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/pages/Homepage.vue'
import Login from '@/components/pages/Login.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import Products from '@/components/pages/Products.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
      meta:{requiresAuth:true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          // meta:{requiresAuth:true}
        },
      ]
    },
  ]
})
