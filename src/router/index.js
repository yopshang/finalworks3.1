import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home.vue'
import Login from '@/components/pages/Login.vue'
import product from '@/components/pages/product.vue'
import productList from '@/components/pages/productList.vue';
import shopping from '@/components/pages/shopping.vue';
import myCart from '@/components/pages/myCart.vue';

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
      path: '/product',
      name: 'product',
      component: product,
      children:[
        {
          path: 'productlist',
          name: 'productList',
          component:productList ,
          // meta:{requiresAuth:true}
        },
        {
          path: 'shopping',
          name: 'shopping',
          component:shopping ,
          // meta:{requiresAuth:true}
        },
        {
          path: 'mycart',
          name: 'myCart',
          component:myCart ,
          // meta:{requiresAuth:true}
        },
      ]
    },
  ]
})
