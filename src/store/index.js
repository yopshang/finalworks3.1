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
        totalPrice:'',
        homenavPage:''
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
            axios.post(url,{cart}).then((response)=>{
                // console.log(response);
                // vm.status.loadingItem='';
                $('#productModal').modal('hide');
            })
        },
        getCart(context){
            const vm =this;
            const url=`https://vue-course-api.hexschool.io/api/yop/cart`
            context.commit('LOADING',false);
            axios.get(url).then((response)=>{
                context.commit('GETCART', response.data.data);
                console.log(response.data.data.final_total);
                context.commit('COUNTPRICE',response.data.data.final_total);
                context.commit('LOADING',false);
            })
        },  
        turnPage(context,currentPage){
            context.commit('TURNPAGE',currentPage);
            // console.log(currentPage);
        }
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
            state.currentCart = status;
        },
        COUNTPRICE(state,status){
            state.totalPrice = status;
        },
        TURNPAGE(state,status){
            state.homenavPage = status;
        }
    },
    modules:{
        getProducts,
    },
    getters:{
        isLoading(state){
            return state.isLoading;
        },
        pagination(state){
            return state.pagination;
        }
    }
})