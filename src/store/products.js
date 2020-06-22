import Vue from 'vue';
import axios from 'axios';

Vue.use(axios);

export default {
    state:{
        products:[],
        pagination:'',
        tempProduct:{},
        isNew:false,
        isLoading:false, //控制全螢幕讀取效果
        status:{
            fileUploading:false,
        },
        sort:"all",
        product:{},
    },
    actions:{
        getProducts(context,page=1){
            const api=`https://vue-course-api.hexschool.io/api/yop/admin/products?page=${page}`;
            const vm=this;
            // vm.isLoading=true;
            axios.get(api).then((response)=>{
                context.commit('GETPRODUCTS',response);
            })
        },
    },
    mutations:{
        GETPRODUCTS(state,payload){
            console.log(payload);
            // vm.isLoading=false;
            state.products=payload.data.products;
            state.pagination=payload.data.pagination;
        }
    },
}