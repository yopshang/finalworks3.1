import Vue from 'vue';

Vue.prototype.$bus = new Vue();
//掛載在Vue的原型之下


// Message
// vm.$bus.$emit('message:push',message,status);
// message(string):訊息內容
// status(string):Alert 樣式