<template>
    <div class="mainContainer">
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>            
    <!-- navbar end     -->
    <div class="d-flex mt-30 jc-space-between flex-wrap">
        <!-- left side -->
        <router-view class="left"></router-view>
        <div class=" right">
            <div class="w-100 cartArea">
                <!-- cart cards -->
                <div v-for="item in currentCart.carts" class=" d-flex mb-15 procuctArea ai-center">
                    <!-- <img class="checkOutAreaImg w-25" src="/img/img-1.jpg" alt=""> -->
                    <img class="checkOutAreaImg" :src="item.product.imageUrl" alt="">
                    <!-- <img class="checkOutAreaImg w-25" :src="cart.imageUrl" alt=""> -->
                    <div class="w-100">
                        <div class="d-flex jc-space-around">
                            <section class="">{{item.product.title}}</section>
                            <section class="EachPrice">單價 {{item.final_total | currency}}</section>
                            <section class="totalPriceEach">合計 {{item.final_total | currency}}</section>
                        </div>
                        <div  class="d-flex  ai-center">
                            <BtnForNum />
                            <i class="delIcon fas fa-trash-alt p-15"></i>
                        </div>
                    </div>
                </div>
                <!-- cart cards end -->
            </div>
            <hr>
            <!-- counting area -->
            <div class="countingArea d-flex jc-space-between ai-center" >
                <p>合計</p>
                <input class="priceInput" type="number" v-model="totalPrice" disabled>元
            </div>
            <!-- countiing area -->
            <!-- counting total end -->
        </div>
    </div>
    <bottom/>        
    </div>
</template>
<script>
import BtnForNum from './BtnForNum';
import bottom from './bottom';
export default {
    name:"myOrder",
    components:{
        BtnForNum,
        bottom
    },
    data(){
        return{
            product:{}, 
        }
    },
    methods:{
        getProduct(id){
            const vm= this;
            const url = `https://vue-course-api.hexschool.io/api/yop/product/${id}`;
            vm.status.loadingItem=id;
            this.$http.get(url).then((response) =>{
                vm.product= response.data.product;
                $('#productModal').modal('show');
                console.log(response);
                vm.status.loadingItem='';
            })
        },
        addtoCart(id,qty=1){
            const vm = this;
            const url=`https://vue-course-api.hexschool.io/api/yop/cart`;
            vm.status.loading=id;
            const cart={
                product_id:id,
                qty  //  等同qty:qty
            }
            this.$http.post(url,{data:cart}).then((response)=>{
                console.log(response);
                vm.status.loadingItem='';
                $('#productModal').modal('hide');
            })
        },                
        getCart(){
            const vm = this ;
            vm.$store.dispatch('getCart');
        },        
        turnPage(currentPage){
            const vm = this;
            vm.$store.dispatch('turnPage',currentPage);
        }          
    },
    computed:{
        isLoading(){
            return this.$store.state.isLoading;
        },
        currentCart(){
            return this.$store.state.currentCart;
        },
        totalPrice(){
            return this.$store.state.totalPrice;
        }
    },
    created(){
        this.getCart(); 
        this.turnPage("cart");               
    }
}
</script>