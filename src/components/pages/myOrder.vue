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
                    <h2 class="w-100">商品資寄送資訊</h2>
                    <h3 class="informationTitle w-100 mb-15">Information</h3>
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
                        <p  class="mainColor w-50 p-15">
                            <router-link to="/product/shopping"></router-link>
                                < Return to information 
                        </p>
                        <button class="fullColorBtn w-50 p-15">
                            <router-link to="/product/myorder/myorder_info">
                                Continue to payment
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
                <div v-for="item in currentCart" class=" d-flex mb-15 procuctArea ai-center">
                    <!-- <img class="checkOutAreaImg w-25" src="/img/img-1.jpg" alt=""> -->
                    <img class="checkOutAreaImg" :src="item.imageUrl" alt="">
                    <!-- <img class="checkOutAreaImg w-25" :src="cart.imageUrl" alt=""> -->
                    <section class="w-40">{{item.title}}</section>
                    <section class="w-35">{{item.final_total}}</section>
                </div>
                <div class="d-flex procuctArea ai-center">
                    <img class="checkOutAreaImg w-25" src="/img/img-1.jpg" alt="">
                    <section class="w-40">Baifan Bowl ×2</section>
                    <section class="w-35">NT$3,600</section>
                </div>
                <!-- cart cards end -->
            </div>
            <hr>
            <!-- counting area -->
            <div class="countingArea" >
                <div class="d-flex jc-space-between mb-15" v-for="item in currentCart">
                    <section>Subtotal</section>
                    <section>{{}}</section>
                </div>
            </div>
            <!-- countiing area -->
            <!-- counting total end -->
        </div>
    </div>        
    </div>
</template>
<script>
export default {
    name:"myOrder",
    data(){
        return{
            product:{}, 
            // isLoading:false,
            // inCarts:{}
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
            // const vm =this;
            // const url=`https://vue-course-api.hexschool.io/api/yop/cart`
            // // vm.isLoading=true;         
            // vm.$store.dispatch('updateLoading', true);
            // this.$http.get(url).then((response)=>{
            //     console.log(response);
            //     // vm.carts=response.data.carts;
            //     vm.inCarts=response.data.data.carts.product;
            //     // vm.isLoading=false;
            //     vm.$store.dispatch('updateLoading',false);
            //     // console.log(inCarts);
            // })
        },        
    },
    computed:{
        isLoading(){
            return this.$store.state.isLoading;
        },
        currentCart(){
            return this.$store.state.currentCart;
        },
    },
    created(){
        this.getCart();        
    }
}
</script>