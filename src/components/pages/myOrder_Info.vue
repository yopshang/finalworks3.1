<template>
    <div>
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>            
    <!-- navbar end     -->
            <!-- second nav -->
            <h2 class="secNav mb-15"> <span class="secNavtitle3">填寫資訊</span><span class="secNavtitle1"> > 建立訂單</span> <span> > 完成購物!</span></h2>
            <!-- second nav end -->
            <!-- contact information -->
            <!-- <div>
                <h2></h2>
                <input class="p-15 w-100" type="text" placeholder="Email">
                <div class="d-flex ai-center">
                    <input class="inputEmail p-15" type="checkbox">
                    <p class="gray p-15 mb-0">我想收到最新優惠消息</p>
                </div>
            </div> -->
            <!-- contact information end -->
            <!-- shopping address -->
            <div>
                <div class="d-flex flex-wrap">
                    <h2 class="informationTitle w-100">結帳資訊</h2>
                    <h3 class="w-100 mb-15">Checkout</h3>
                    <div class="d-flex w-100 jc-space-between mb-15">
                        <input class="p-15 w-50 mr-15" type="text" placeholder="購買人姓名">
                        <input class="p-15 w-50" placeholder="手機號碼" type="text">
                    </div>
                    <div class="d-flex w-100 mb-15">
                        <select class="p-15 w-50 mr-15" name="" id="">
                            <option class="option" value="" disabled selected>付費方式</option>
                            <option value="">貨到付款</option>
                            <option value="">信用卡</option>
                        </select>
                        <select class="p-15 w-50" name="" id="">
                            <option class="option" value=""  disabled selected>開立發票種類</option>
                            <option value="">三聯式發票</option>
                            <option value="">二聯式發票</option>
                            <option value="">電子發票</option>
                        </select>
                    </div>
                    <input class="w-100 p-15 mb-15 h-200" placeholder="請填寫備註" type="text">
                    <div class="d-flex mb-30 w-100 jc-space-between">
                        <p  class="mainColor w-50 p-15">
                            <router-link to="/myorder/myorder_cart">
                                < 重新填寫資訊 
                            </router-link>
                        </p>
                        <button class="fullColorBtn w-50 p-15" @click="creatOrder">建立訂單!</button>
                    </div>
                  
                    </div>
                </div>
            </div>
            <!-- shopping address end -->
</template>
<script>
export default {
    name:"myOrder",
    data(){
        return{
            product:{}, 
            // isLoading:false,
            inCarts:{},
            form:{
                user:{
                    name:'',
                    email:'',
                    tel: '',
                    address:''
                },
                message:''
            }
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
            const vm =this;
            const url=`https://vue-course-api.hexschool.io/api/yop/cart`
            // vm.isLoading=true;         
            vm.$store.dispatch('updateLoading', true);
            this.$http.get(url).then((response)=>{
                console.log(response);
                // vm.carts=response.data.carts;
                vm.inCarts=response.data.data.carts.product;
                // vm.isLoading=false;
                vm.$store.dispatch('updateLoading',false);
                console.log(inCarts);
            })
        },  
        creatOrder(){
            const vm =this ;
            const url = `https://vue-course-api.hexschool.io/api/yop/order`
            const order = vm.form;
            this.$http.post(url).then( (response)=>{
                
                console.log('建立訂單成功',response);
            })
        }      
    },
    computed:{
        isLoading(){
            return this.$store.state.isLoading;
        }
    },
    created(){
        this.getCart();        
    }
}
</script>