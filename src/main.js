import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './router/bus';
import currencyFilter from './components/pages/filter/currency';

import Element from 'element-ui'

Vue.use(Element);

// Vuex
import Vuex from 'vuex';
Vue.use(Vuex);
import store from './store/index';

// 允許跨域存取
axios.defaults.withCredentials = true;

// vee-validate表單驗證
// 引入並啟用 具名匯入

import { ValidationProvider } from 'vee-validate';
Vue.component('ValidationProvider', ValidationProvider);

// 引入驗證規則  具名匯入
import {  extend } from 'vee-validate';
extend('positive', value => {
  return value >= 0;
});
// import * as rules from 'vee-validate/dist/rules';
// import { required, email,alpha_num } from 'vee-validate/dist/rules';


// No message specified.
// extend('required',required);
// extend('email', email);
// extend('alpha_num', alpha_num);

// Object.keys(rules).forEach(rule => {
//   extend(rule, rules[rule]);
// });

// 表單驗證中文化
import { localize } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'

localize('zh_TW', TW)
// 表單驗證中文化
// vee-validate表單驗證結束

Vue.filter('currency',currencyFilter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component('Loading',Loading);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

//登入驗證 導航守衛
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
      const api=`https://vue-course-api.hexschool.io/api/user/check`;
      axios.post(api).then((response)=>{
          console.log(response.data);
          //驗證是否持續登入
          if (response.data.success){
            next();
          }else{
            next({
              path:'/login',
            });
          }
          //驗證是否持續登入結束
      });
    }else{
      next();
  }
});
// 登入驗證結束