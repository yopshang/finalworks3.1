import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import getProducts from './products';
Vue.use(axios);

Vue.use(Vuex,getProducts);

export default new Vuex.Store({
    state:{
        isLoading:false,
    },
    actions:{
        updateLoading(context,status){
            context.commit('LOADING',status);
        }
    },
    mutations:{
        LOADING(state,status){
            state.isLoading=status;
        }
    },
    modules:{
        getProducts,
    }
})