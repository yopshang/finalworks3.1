import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import getProducts from './products';
import products from './products';
Vue.use(axios);

Vue.use(Vuex,getProducts);

export default new Vuex.Store({
    state:{
        isLoading:false,
        //免登入取得商品
        products:[],
        pagination:'',
        // 購物車行為
        cart : {},
        currentCart : [],
    },
    actions:{
        updateLoading(context,status){
            context.commit('LOADING',status);
        },
        getProducts(context,page=1){
            const api=`https://vue-course-api.hexschool.io/api/yop/products?page=${page}`;
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
                context.commit('PAGINATION', response.data.pagination);
            })
        },
        addtoCart( context,{id,qty=1}){
            const vm = this;
            const url=`https://vue-course-api.hexschool.io/api/yop/cart`;
            // vm.status.loading=id;
            context.commit('ADDTOCART',{id,qty:1});
            // const cart={
            //     product_id:id,
            //     qty  //  等同qty:qty
            // }
            this.$http.post(url,{cart}).then((response)=>{
                // console.log(response);
                // vm.status.loadingItem='';
                $('#productModal').modal('hide');
            })
        },
        getCart(context){
            const vm =this;
            const url=`https://vue-course-api.hexschool.io/api/yop/cart`
            // vm.isLoading=true;         
            context.dispatch('updateLoading', true);
            axios.get(url).then((response)=>{
                // console.log(response);
                context.commit('GETCART', response.data);
                console.log(response.data);
                // vm.carts=response.data.carts;
                // vm.inCarts=response.data.data.carts.product;
                // vm.isLoading=false;
                context.dispatch('updateLoading',false);
                // console.log(inCarts);
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
        PAGINATION(state, status){
            state.pagination = status;
        },
        ADDTOCART(){
            state.cart = status;
        },
        GETCART(state, status){
            state.currentCart = state.products;
        },
    },
    modules:{
        getProducts,
    }
})