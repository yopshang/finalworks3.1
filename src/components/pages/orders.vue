<template>
    <div class="mainContainer">
        <!-- 讀取效果 -->
        <loading :active.sync="isLoading" ></loading>  
        <!-- second nav -->
        <div>
            <div class="d-flex flex-wrap">
                <!-- title區 -->
                <div class="w-100">
                    <h2 class="informationTitle w-100 mb-15">我的訂單</h2>
                </div>
                <!-- title區結束 -->
                <hr>
                <!-- 訂單區 -->
                <div class="h-500 w-100">
                    <!-- title區 -->
                    <ul class="mb-30 d-flex jc-space-between">
                        <li class="w-5">流水號</li>
                        <li class="w-25">訂單編號</li>
                        <li class="w-15">訂購人</li>
                        <li class="w-15">付款狀態</li>
                    </ul>
                    <br>
                    <!-- title區結束 -->
                    <!-- 測試區域 -->
                    <ul v-for= "(item, i) in orderList" :key="i" @click="getOrder(item.id)" class="listArea p-15 mb-10 d-flex jc-space-between">
                        <li class="w-5">{{ item.i }}</li>
                        <li class="w-25">{{ item.id }}</li>
                        <li class="w-15">{{ item.user }}</li>
                        <li class="w-15">未付款</li>
                    </ul>                    
                    <!-- 測試區域結束 -->
                </div>
                <!-- 訂單區結束 -->
                <!-- 按鈕區 -->
                <div class="d-flex mb-30 w-100 jc-space-between">
                    <p  class="EmptyColorBtn w-50 p-15">
                        <router-link to="/product/shopping">
                            < 還沒買夠，我想回到賣場! 
                        </router-link>
                    </p>
                    <button class="fullColorBtn w-50 p-15">
                        <router-link to="/myorder/myorder_info">
                            填寫完畢，結帳去!!
                        </router-link>
                    </button>
                </div>                
                <!-- 按鈕區結束 -->
            </div>
        </div>
        <!-- Modal --> <!--id="orderModal"-->
        <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" 
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <!-- model titl -->
                            <div class="modal-content border-0">
                                <div class="modal-header">
                                    <h5  class="titleStyle p-15 d-flex jc-center" id="exampleModalLabel"><!--title-->
                                        <span >訂單明細</span>
                                    </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <!--叉叉按鈕-->
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <!-- model titl end -->
                            <!-- model content -->
                            <div class="modal-body">
                                <div>
                                    <!-- firstArea -->
                                    <div class="d-flex">
                                        <div class="form-group col-md-4">
                                            <label for="title" class="mb-15">訂單編號</label>
                                            <div>{{order.id}}</div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <label for="price" class="mb-10">付款狀態</label>
                                            <div>
                                                <span class="payed" v-if = "order.is_paid"> 已付款 </span>
                                                <span class="noPay" v-else> 未付款 </span>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="form-group col-md-4">
                                            <label for="description" class="mb-10">訂單出貨狀態</label>
                                            <div>
                                                <span class="payed" v-if = "alreadySent"> 已出貨 </span>
                                                <span class="noPay" v-else> 未出貨 </span>
                                            </div>
                                        </div>
                                </div>
                                <!-- firstArea end -->
                                <!-- secArea -->
                                <div class="modal-content border-0">
                                    <div class="modal-header">
                                        <h5  class="titleStyle d-flex jc-center" id="exampleModalLabel"><!--title-->
                                            <span >訂單內容</span>
                                        </h5>
                                    </div>
                                    <!-- 訂單商品卡片區 -->
                                    <div class="h-200 orderProducts">
                                        <div v-for="(item, i) in order.products" :key="i" class="d-flex mb-15 procuctArea ai-center"> <!--v-if=" item !== '' "-->
                                            <img :src="item.product.imageUrl" class="checkOutAreaImg" alt=""><!---->
                                            <div class="w-100">
                                                <div class="d-flex jc-space-around">
                                                    <section  class="">{{item.product.title}}</section> <!---->
                                                    <section class="EachPrice">單價 {{item.final_total | currency}}</section> <!---->
                                                    <section class="totalPriceEach">合計 {{item.final_total | currency}}</section> 
                                                </div>
                                                <div class="d-flex ai-center">
                                                    <!-- <BtnForNum /> -->
                                                    <i  class="delIcon fas fa-trash-alt p-15"></i> <!--@click="removeCartItem(item.id)"-->
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <!-- 訂單商品卡片區 結束 -->
                                </div>
                                <!-- secArea end -->
                            </div>
                            <!-- model content end -->
                        </div>
                        <div class="form-group col-md-12">
                            <label for="description" class="orderTotal mb-10">訂單總金額{{ order.total | currency}}</label>
                        </div>                        
                        <!-- model footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn bigBtn" @click="payOrder(item.id)">此筆結帳</button>
                        </div>
                        <!-- model footer end -->
                    </div>
                </div>
            </div>       
        <!-- Modal end -->
        <bottom/>
    </div>
</template>
<script>
import $ from 'jquery';
import bottom from './bottom';
import {mapGetters,mapActions} from 'vuex';
export default {
    data(){
        return {
            orderList: [],
            order: {},
            alreadySent:false,
        }
    },
    components:{
        bottom
    },
    methods:{
        turnPage(currentPage){
            const vm = this;
            vm.$store.dispatch('turnPage',currentPage);
        },
        getOrderList(page){
            const vm = this;
            const url = `https://vue-course-api.hexschool.io/api/yop/orders?page=${page}`
            vm.$store.dispatch('updateLoading',true);
            vm.$http.get(url).then((response)=>{
                vm.orderList = response.data.orders;
                console.log('取得訂單列表',vm.orderList);
            })
            vm.$store.dispatch('updateLoading',false);
        },
        getOrder(order_id){
            const vm = this;
            const url = `https://vue-course-api.hexschool.io/api/yop/order/${order_id}`
            vm.$http.get(url).then((response) => {
                vm.orderList.forEach((item) => {
                    if(order_id === item.id){
                        vm.order = response.data.order;
                        console.log('取得一筆訂單',response.data.order);
                    }
                });
            })
            this.openModel();
        },
        payOrder(id){
            console.log('確定結帳',id);
            this.closeModel();
        },
        openModel(){
            $('#orderModal').modal('show');
        },
        closeModel(){
            $('#orderModal').modal('hide');
        }
    },
    created(){
        this.turnPage("orders");        
        this.getOrderList();
        this.getOrderList();
    },
    computed:{
        ...mapGetters(['isLoading'])
    }
}
</script>