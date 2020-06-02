<template>
    <div>
                <!--購物車-->        
            <table class="table">
                <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in carts" :key="item.id"> 
                        <td class="align-middle">
                            <button @click="removeCartItem(item.id)" type="button" class="btn btn-outline-danger btn-sm">
                                <i class="far fa-trash-alt"></i><!--刪除鈕-->
                            </button>
                        </td>
                        <td class="align-middle">
                            {{ item.product.title }} <!--carts-->
                            <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td><!--carts-->
                        <td class="align-middle text-right">{{ item.final_total }}</td><!--carts-->
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right"></td><!--{{ item.total }}-->
                    </tr>
                    <tr>
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success"></td><!--{{ item.final_total }}-->
                    </tr>
                </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm">
                <input v-model="coupon_code" type="text" class="form-control" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                    <button @click="addCouponCode" class="btn btn-outline-secondary" type="button">
                    套用優惠碼
                    </button>
                </div>
            </div>
            
        <!--購物車結束-->
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    data(){
        return{
            products:[],
            isLoading:false,
            pagination:'',
            product:{},
            status:{
                loadingItem:'',
            },
            tempProduct:{},
            carts:{},
            coupon_code:'',
        };
    },
    methods: {
        getProducts(page=1) {
            const vm = this;
            const api=`https://vue-course-api.hexschool.io/api/yop/products?page=${page}`;
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                vm.products=response.data.products;
                vm.pagination=response.data.pagination;
                vm.isShow=response.data.imageUrl
                console.log(response);
                // console.log(vm.pagination);
                vm.isLoading=false;
            });
        },
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
            vm.isLoading=true;
            this.$http.get(url).then((response)=>{
                console.log(response);
                vm.carts=response.data.data.carts; //vm.carts=response.data.data.carts
                vm.isLoading=false;
            })
        },
        removeCartItem(id){
            const vm=this;
            const url=`https://vue-course-api.hexschool.io/api/yop/cart/${id}`;
            vm.isLoading=true;
            this.$http.delete(url).then((response)=>{
                vm.getCart();
                console.log(response);
                vm.isLoading=false;
            })
            
        },
        addCouponCode(){
            const vm=this;
            const url=`https://vue-course-api.hexschool.io/api/yop/coupon`;
            const coupon={
                code:vm.coupon_code,
            }
            vm.isLoading=true;
            this.$http.post(url,{data:coupon}).then((response)=>{
                vm.getCart();
                vm.isLoading=false;
            })
        }
    },
    created() {
        this.getProducts();
        this.getCart();
    }


}
</script>