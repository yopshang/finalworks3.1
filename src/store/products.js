import Vue from 'vue';
import axios from 'axios';

Vue.use(axios);

export default {
    state:{
    
    },
    actions:{
        updateLoading(context,status){
            context.commit('LOADING',status);
        },
    },
    mutations:{
    
    },
}