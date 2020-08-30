<template>
    <div>
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>            
    <Alert/>
    <!-- navbar end     -->
            <!-- second nav -->
            <h2 class="secNav mb-15"> <span class="secNavtitle3">填寫資訊</span><span class="secNavtitle1"> > 建立訂單</span> <span> > 完成購物!</span></h2>
            <!-- second nav end -->
            <!-- shopping address -->
            <div>
                    <div class="d-flex flex-wrap">
                        <h2 class="informationTitle w-100">結帳資訊</h2>
                        <h3 class="w-100 mb-15">Checkout</h3>
                        <div class="d-flex w-100 jc-space-between mb-15">
                            <div>                              
                                <ValidationProvider v-slot="{ errors }">
                                    <input name="name" v-model="form.name" class="mb-15 p-15 checkoutInput" type="text" placeholder="購買人姓名">
                                    <span class="alertMsg"></span> {{ errors[0] }}
                                </ValidationProvider>
                            </div>
                            <div>
                                    <input v-model="form.tel" class="mb-15 p-15 checkoutInput" placeholder="手機號碼" type="text">
                                    <span class="alertMsg"></span>
                            </div>
                        </div>
                        <div class="d-flex w-100 jc-space-between mb-15">
                            <div>
                                <input v-model="form.email" class="p-15 checkoutInput" type="text" placeholder="電子郵件">
                            </div>
                            <div>
                                <input v-model="form.address" class="p-15 checkoutInput" placeholder="地址" type="text">
                            </div>
                        </div>
                        <div class="d-flex w-100 mb-15">
                            <select class="p-15 w-50 mr-15" name="" id="">
                                <option class="option checkoutInput" value="" disabled selected>付費方式</option>
                                <option value="">貨到付款</option>
                                <option value="">信用卡</option>
                            </select>
                            <select class="p-15 w-50" name="" id="">
                                <option class="option checkoutInput" value=""  disabled selected>開立發票種類</option>
                                <option value="">三聯式發票</option>
                                <option value="">二聯式發票</option>
                                <option value="">電子發票</option>
                            </select>
                        </div>
                        <input v-model="message" class="w-100 p-15 mb-15 h-200" placeholder="請填寫備註" type="text">
                        <div class="d-flex mb-30 w-100 jc-space-between">
                            <p  class="mainColor w-50 p-15">
                                <router-link to="/myorder/myorder_cart">
                                    < 重新填寫資訊 
                                </router-link>
                            </p>
                            <button class="fullColorBtn w-50 p-15" @click.prevent="creatOrder">建立訂單!</button>
                        </div>                  
                        </div>
            </div>
        </div>
            <!-- shopping address end -->
</template>
<script>
import $ from 'jquery';
import Alert from './AlertMessage';
import { mapGetters, mapActions } from 'vuex';
export default {
    name:"myOrder",
    data(){
        return{
            product:{}, 
            // isLoading:false,
            inCarts:{},
            form:{
                user: '',
                name: '',
                email: '',
                tel: '',
                address: '',
            },
            message: ''
        }
    },
    components:{
        Alert
    },
    methods:{
        getProduct(id){
            const vm= this;
            const url = `https://vue-course-api.hexschool.io/api/yop/product/${id}`;
            vm.status.loadingItem=id;
            this.$http.get(url).then((response) =>{
                vm.product= response.data.product;
                $('#productModal').modal('show');
                // console.log(response);
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
                // console.log(response);
                vm.status.loadingItem='';
                $('#productModal').modal('hide');
            })
        },                
        getCart(){
            const vm =this;
            const url=`https://vue-course-api.hexschool.io/api/yop/cart`
            const order = vm.form;
            vm.$store.dispatch('updateLoading', true);
            this.$http.get(url).then((response)=>{
                // console.log(response);
                vm.inCarts=response.data.data.carts.product;
                vm.$store.dispatch('updateLoading',false);
            })
        },  
        creatOrder(){
            const vm = this;
            const url = `https://vue-course-api.hexschool.io/api/yop/order`;
            const order = vm.form;
            vm.$store.dispatch('updateLoading',true);
            vm.$bus.$emit('message:push',"訂單建立中，請稍後",'success');
            // 驗證表單是否完整填寫
            this.$validator.validate().then((result)=>{
                if(!result){
                    this.$http.post(url,{data:order}).then((response)=>{
                        console.log('訂單已成立',response);
                        vm.$store.dispatch('updateLoading',false);
                        vm.$bus.$emit('message:push',"訂單建立成功!",'success');
                    })
                }else{
                    console.log('欄位不完整');
                    vm.$store.dispatch('updateLoading',false);
                    vm.$bus.$emit('message:push',"欄位填寫不完整，請重新填寫",'danger');
                }
            })
        }
    },
    computed:{
        isLoading(){
            return this.$store.state.isLoading;
        },
        orderData(){
            return this.$store.state.orderData;
        },
        // ...mapGetters(['isLoading'])
    },
    created(){
        this.getCart();        
    }
}
</script>