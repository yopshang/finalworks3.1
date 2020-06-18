import Vue from 'vue';
import Vuex from 'vuex';
import getProducts from './products';

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