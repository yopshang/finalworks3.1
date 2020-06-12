<template>
<div class="PDL">
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>    
    <!-- product filter -->
    <div class="mb-30"> <!--做一個分類fiter-->
        <div class="productFilter p-15 d-flex">
            <ul class="d-flex w-100 jc-space-between">
                <li class="filterList" :class="{'active':sort=='all'}" @click="sort='all'">
                    ALL
                </li>                                        
                <li class="filterList" :class="{'active':sort=='保養品'}" @click="sort='保養品'">
                    保養品
                </li>
                <li class="filterList" :class="{'active':sort=='玩具'}" @click="sort='玩具'">
                    玩具
                </li>
                <li class="filterList" :class="{'active':sort=='外套'}" @click="sort='外套'">
                    外套
                </li>
                <li class="filterList" :class="{'active':sort=='配件'}" @click="sort='配件'">
                    配件
                </li>
                <li class="filterList" :class="{'active':sort=='鞋子'}" @click="sort='鞋子'">
                    鞋子
                </li>
                <li class="filterList" :class="{'active':sort=='其他'}" @click="sort='其他'">
                    其他
                </li>

            </ul>
        </div>
    </div>
    <!-- test Modal -->

    <!-- test Modal ende-->
    <div class="d-flex jc-space-between ai-center">
        <div class="mylogoDiv">購物專區</div>      
    </div>
    <!-- product filter end -->
    <div class="productcard">
        <div  v-for="(item) in products" :key="item.id"
        @click="getProduct(item.id)" 
        v-if="item.category==sort || sort=='all'"
        class="productArea cardHover"><!--這邊要用v-for引入資料-->
            <div class="cateContainer">
                <img :src="item.imageUrl" class="productImg mb-10" alt="">
                <div class="cate">{{item.category}}</div>
                <section class="d-flex fd-column">
                    <div class="d-flex jc-center">
                        <h2 class="mb-15 mr-15">{{item.title}}</h2>
                        <div class="addToCardBtn" @click="addtoCart(product.id)">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                    </div>
                    <div class="w-100 d-flex jc-space-between">
                        <p class="">{{item.price | currency}}</p>
                        <p class="text-dec">{{item.origin_price | currency}}</p>
                    </div>
                </section>
            </div>
        </div>          
    </div>
    <!-- page number -->
    <div class="p-15">
        <ul class="pageUl d-flex jc-center">
            <li class="pageNumber p-15" 
            v-if="pagination.has_pre"> <!--:class="{'disabled':!pagination.has_pre}"-->
                <a href="#" @click.prevent="getProducts(pagination.current_page-1)">
                    <<
                </a>
            </li>
            <li class="pageNumber  p-15" 
            v-for="page in pagination.total_pages" 
            :key="page" 
            :class="{'active':pagination.current_page===page}">
                <a href="#" @click.prevent="getProducts(page)">
                    {{page}}
                </a>
            </li>
            <li class="pageNumber  p-15"
            v-if="pagination.has_next"><!--:class="{'disabled':!pagination.has_next}"-->
                <a href="#" @click.prevent="getProducts(pagination.current_page+1)">
                    >>
                </a>
            </li>
        </ul>
    </div>
    <!-- page number end -->
    <!-- Edit Modal --> <!--修改成取得單一商品-->
    <div class="modal fade  animate__animated animate__fadeInLeft" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header titleStyle">
                    <h5 class=" p-15 d-flex jc-center" id="exampleModalLabel"><!--title-->
                        <span>商品內容</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <!--叉叉按鈕-->
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        <div class="modal-body productDetail">
        <!-- detail -->
        <!-- product detail -->
        <!-- 左邊圖案區塊 -->
        <div class="d-flex flex-wrap-no ">
            <!-- leftSide -->
            <div class="  d-flex w-60 flex-wrap p-15 mr-15">
                 <!--商品圖片-->
                <div class="w-100  mb-30 d-flex jc-center">
                    <img class="smoothInput" :src="product.imageUrl" alt="">
                </div>
                <!-- 商品描述及說明 -->
                <ul class="w-100 d-flex jc-space-around">
                    <li class="w-40 ">
                        <input class="w-100 h-200 smoothInput" type="text" placeholder="請輸入產品描述"  v-model="product.description" disabled="disabled">
                    </li>
                    <li class="w-40">
                        <input class="w-100 h-200 smoothInput" type="text" placeholder="請輸入產品說明內容" v-model="product.content" disabled="disabled">
                    </li>
                </ul>
            </div>
            <!-- rightSide -->
            <div class=" d-flex ai-center w-40 p-15 flex-wrap jc-center">
                <section class="modalInside w-100 jc-flex-start p-15">
                    <div>
                        <div class="mb-30 d-flex">
                            <input class="productDetailTitle w-100 smoothInput" type="text" v-model="product.title" placeholder="請輸入標題" disabled="disabled">
                            <input class="cata smoothInput w-40" type="text" name="" id="" placeholder="請輸入類別"  v-model="product.category" disabled="disabled">
                        </div>
                        <div class="d-flex jc-space-between mb-15 ai-center">
                            <div>原價</div>
                            <input class="w-35 smoothInput" type="text" placeholder="請輸入原價"  v-model="product.origin_price" disabled="disabled">
                            <div>售價</div>
                            <input class="w-35 smoothInput" type="text" placeholder="請輸入售價"  v-model="product.price" disabled="disabled">
                        </div>
                    </div>
                    <footer>
                        <ul class="d-flex ai-center">
                            <li class="sign w-25 p-15 " @click="minus(product.num)">-</li>
                            <input class=" numArea w-25 p-15" type="number" value="" v-model="product.num">
                            <li class="sign w-25 p-15" @click="add">+</li>
                            <!-- <select name="" id="" v-model="product.num">
                                <option value="">
                                    選購1個
                                </option>
                            </select> -->
                            <input class="w-25 smoothInput" type="text" placeholder="請輸入單位"  v-model="product.unit" disabled="disabled">
                            <!-- <li class="fullColorBtn p-15">Add to cart</li> -->
                        </ul>
                    </footer>   
                    <hr>
                    <section class="w-100 d-flex ai-center jc-space-around">
                        <div>小記</div>
                        <div>{{product.num*product.price | currency}} </div>
                        <div>元</div>
                    </section>
                </section>
            </div>
        </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn bigBtn" @click="addtoCart(product.id,product.num)">加入購物車</button>
        </div>
                    </div>
                </div>
            </div>     
    <!-- Edit Modal end -->

    <!-- cart side modal -->
    
    <!-- cart side model end -->
    
</div>
</template>
<script>
import $ from 'jquery';
export default {
    name:'Procucts',
    data(){
        return {
            products:[],
            isLoading:false, //控制全螢幕讀取效果
            pagination:'',
            tempProduct:{},
            status:{
                loadingItem:'',
            },
            tempProduct:{},
            sort:"all",
            product:{},
        }
    },
    methods: {
        getProducts(page=1){
            const api=`https://vue-course-api.hexschool.io/api/yop/products?page=${page}`;
            const vm=this;
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                vm.products=response.data.products;
                vm.pagination=response.data.pagination;
                vm.isShow=response.data.imageUrl
                console.log(response.data);
                vm.isLoading=false;
            })
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
        signout(){
            const url= 'https://vue-course-api.hexschool.io/logout';
            const vm = this;
            this.$http.post(url).then((response) =>{
                console.log(response.data);
                if (response.data.success){
                    vm.$router.push('/login');
                }
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
                vm.carts=response.data.carts; //vm.carts=response.data.data.carts
                vm.isLoading=false;
            })
        },
        openModal(isNew,item){
            if(isNew){
                this.tempProduct={};
                this.isNew=true;
            }else{
                this.tempProduct=Object.assign({},item);
            }
            $('#productModal').modal('show');
        },
        updateProduct(){
            let api=`https://vue-course-api.hexschool.io/api/yop/admin/product`;
            const vm= this;
            let httpMethods=`post`;
            if(!vm.isNew){
                api=`https://vue-course-api.hexschool.io/api/yop/admin/product/${vm.tempProduct.id}`;
                httpMethods='put';
            }
            this.$http[httpMethods](api,{data:vm.tempProduct}).then((response)=>{
                console.log(response.data);
                if (response.data.success){
                    $('#productModal').modal('hide');
                    vm.getProducts();
                }else{
                    $('#productModal').modal('hide');
                    console.log('新增失敗');
                }
            })
        },
        uploadFile(){
            console.log(this);
            const uploadFile=this.$refs.files.files[0];
            const vm= this;
            const formData=new FormData();
            formData.append('file-to-upload',uploadFile);
            const url=`https://vue-course-api.hexschool.io/api/yop/admin/upload`;
            vm.status.fileUploading=true;
            this.$http.post(url,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
            }).then((response)=>{
                console.log(response.data);
                vm.status.fileUploading=false;
                if (response.data.success){
                    // vm.tempProduct.imageUrl=response.data.imageUrl;
                    // console.log(vm.tempProduct);
                    vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
                }else{
                    this.$bus.$emit('message:push',response.data.message,'danger');
                }
            });
        },
        add(){
            const vm=this;
            vm.product.num++;
        }, 
        minus(num){
            const vm=this;
            if(num<=1){
                vm.product.num=1;
            }else{
                vm.product.num--;
            }
        },     
    },
    created() {
        this.getProducts();
        this.getCart();
    }
}
</script>