import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import getProducts from './products';
// import products from './products';
import VueAxios from 'vue-axios'
import '../router/bus';


Vue.use(Vuex);
Vue.use(VueAxios,axios);

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
        homenavPage:'',
        cartItemId:'',
        orderData: {
            user: {
              name : "",
              email : "",
              tel : "",
              address: ""
            },
            message: ""
          }
    },
    actions:{
        updateLoading(context,status){
            context.commit('LOADING',status);
        },
        getProducts(context,page=1){
            const api=`https://vue-course-api.hexschool.io/api/yop/products?page=${page}`;
            const vm=this;
            context.commit('LOADING',true);
            axios.get(api).then((response)=>{
                console.log(response.data);
                context.commit('LOADING',false); 
                context.commit('PRODUCTS', response.data.products);
                context.commit('PAGINATION', response.data.pagination);
            }).catch(()=>{
                this.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                   context.dispatch('reload'); 
                }, 1000);                
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
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                   context.dispatch('reload'); 
                }, 1000);                
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
                console.log(response.data.data);
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                   context.dispatch('reload'); 
                }, 1000);                
            })
        },  
        turnPage(context,currentPage){
            context.commit('TURNPAGE',currentPage);
            // console.log(currentPage);
        },
        reload(context){
            window.location.reload();
        },
    },
    mutations:{
        SINGIN(state,status){
            state.user = status;
        },
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
        // getProducts,
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