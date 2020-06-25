import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import getProducts from './products';
Vue.use(axios);

Vue.use(Vuex,getProducts);

export default new Vuex.Store({
    state:{
        isLoading:false,
        //免登入取得商品
        products:[],

    },
    actions:{
        updateLoading(context,status){
            context.commit('LOADING',status);
        },
        getProducts(context){
            const api=`https://vue-course-api.hexschool.io/api/yop/products`;
            const vm=this;
            // vm.isLoading=true;
            // vm.$store.dispatch('updateLoading',true);
            context.commit('LOADING',true);
            axios.get(api).then((response)=>{
                console.log(response.data);
                // vm.isLoading=false;
                // vm.$store.dispatch('updateLoading',false);
                context.commit('LOADING',false); 
                // 將原本在個別component中dispatch呼叫store中的action改為在action中用commit呼叫mutation
                // vm.products=response.data.products; // 此為存放資料行為，要改為commit呼叫mutation
                context.commit('PRODUCTS', response.data.products);
            })
        },
    },
    mutations:{
        LOADING(state,status){
            state.isLoading=status;
        },
        PRODUCTS(state, status){
            state.products = status;
        },
    },
    modules:{
        getProducts,
    }
})