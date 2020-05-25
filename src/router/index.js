import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home.vue'
import Login from '@/components/pages/Login.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import Products from '@/components/pages/Products.vue'
import CustomerOrders from '@/components/pages/CustomerOrders.vue'
import cart from '@/components/pages/Cart.vue'
import Customerorder from '@/components/pages/CustomerOrder.vue'
import CustomerCheckout from '@/components/pages/CustomerCheckout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'*',  //假設進入非我定義的頁面，將使用者重新導向到登入畫面
      redirect:'login',
    },
    {
      path: '/',
      name: 'home',
      component: home,
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
          meta:{requiresAuth:true}
        },
        {
          path: 'customer_orders',
          name: 'Customerorders',
          component: CustomerOrders,
          // meta:{requiresAuth:true}
        },
        {
          path: 'cart',
          name: 'cart',
          component: cart,
          // meta:{requiresAuth:true}
        },
        {
          path: 'customer_order',
          name: 'Customerorder',
          component: Customerorder,
          // meta:{requiresAuth:true}
        },
        {
          path: 'customer_checkout',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
          // meta:{requiresAuth:true}
        },
      ]
    },
  ]
})
