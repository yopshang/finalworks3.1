<template>
    <div>
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>            
    <!-- navbar end     -->
    <div class="d-flex mt-30 jc-space-between flex-wrap">
        <!-- left side -->
        <div class="left">
            <!-- second nav -->
            <h2 class="secNav mb-15"> <span class="secNavtitle1">填寫資訊</span><span class="secNavtitle3"> ></span> 結帳<span class="secNavtitle3"> > 完成購物!</span></h2>
            <!-- second nav end -->
            <!-- contact information -->
            <div>
                <h2></h2>
                <input class="p-15 w-100" type="text" placeholder="Email">
                <div class="d-flex ai-center">
                    <input class="inputEmail p-15" type="checkbox">
                    <p class="gray p-15 mb-0">我想收到最新優惠消息</p>
                </div>
            </div>
            <!-- contact information end -->
            <!-- shopping address -->
            <div>
                <div class="d-flex flex-wrap">
                    <div class="w-100">
                        <h2 class="informationTitle w-100 mb-15">商品資寄送資訊</h2>
                    </div>
                    <div class="d-flex w-100 jc-space-between mb-15">
                        <input class="p-15 w-40 mr-15" type="text" placeholder="Name">
                        <input class="p-15 w-40" placeholder="Phone" type="text">
                    </div>
                    <div class="d-flex w-100 mb-15">
                        <select class="p-15 w-50 mr-15" name="" id="">
                            <option class="option" value="" disabled selected>Country/Region</option>
                        </select>
                        <select class="p-15 w-50" name="" id="">
                            <option class="option" value=""  disabled selected>City</option>
                        </select>
                    </div>
                    <input class="w-100 p-15 mb-15" placeholder="Address" type="text">
                    <div class="d-flex mb-30 w-100 jc-space-between">
                        <p  class="EmptyColorBtn w-50 p-15">
                            <router-link to="/product/shopping"></router-link>
                                < 還沒買夠，我想回到賣場! 
                        </p>
                        <button class="fullColorBtn w-50 p-15">
                            <router-link to="/product/myorder/myorder_info">
                                填寫完畢，結帳去!!
                            </router-link>
                        </button>
                    </div>
                  
                    </div>
                </div>
            </div>
            <!-- shopping address end -->
            <!-- left side end -->
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
    </div>
</template>
<script>
import BtnForNum from './BtnForNum';
export default {
    name:"myOrder",
    components:{
        BtnForNum
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