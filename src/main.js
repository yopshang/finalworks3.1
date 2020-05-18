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
// import VeeVlidate from 'vee-validate';
// import VueI18n from 'vue-i18n';

axios.defaults.withCredentials = true;
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
      console.log('這裡需要驗證');
  }else{
    next();
  }
});
// Vue.use(VeeValidate);
// Vue.use(Vue.VueI18n);
// const i18n=new VueI18n({
//   local:'zhTW'
// });
// Vue.use(VeeVlidate,{
//   i18n,
//   distionary:{
//     zhTW
//   }
// });
// new Vue({
//   i18n,
//   el:'#app',
//   components:{App},
//   template:<App/>
// })
Vue.filter('currency',currencyFilter);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component('Loading',Loading);
/* eslint-disable no-new */
new Vue({
  // i18n,
  el: '#app',
  router,
  render: h => h(App)
})
