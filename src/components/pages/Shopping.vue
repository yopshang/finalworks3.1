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
    <div class="d-flex jc-space-between ai-center">
        <div class="mylogoDiv">購物專區</div>      
    </div>
    <!-- product filter end -->
    <div class="productcard">
        <div  @click="getProduct(item.id)" v-for="(item) in products" :key="item.id" 
        v-if="item.category==sort || sort=='all'"
        class="productArea cardHover"><!--這邊要用v-for引入資料-->
            <div class="cateContainer">
                <img :src="item.imageUrl" class="productImg mb-10" alt="">
                <div class="cate">{{item.category}}</div>
                <section class="d-flex fd-column">
                    <div class="d-flex jc-center">
                        <h2 class="mb-15 mr-15">{{item.title}}</h2>
                        <i class=" fas fa-shopping-cart"></i>
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
    <!-- Modal --> <!--引入detail版型-->
    <div class="modal fade  animate__animated animate__fadeInLeft" id="productModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content border-0">
                            <div class="modal-header">
                                <h5 class="titleStyle p-15 d-flex jc-center" id="exampleModalLabel"><!--title-->
                                    <span></span>
                                </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <!--叉叉按鈕-->
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- detail -->
        <!-- product detail -->
        <!-- 左邊圖案區塊 -->
        <div  class="d-flex flex-wrap-no productDetail"><!--v-for="item in product" :key="item.id"-->
            <div data-aos="zoom-in" class="row detailImg w-100">
                <img alt=""> <!--:src="item.imageUrl"-->
            <!-- 加入購物車div塊 右邊 -->
            <div class=" animate__animated animate__fadeInRight detailText row col-lg-6 ai-center jc-center">
                <div class="underText row">
                    <div>
                        <h3 class="h3inText">Home / Product / Cup</h3>
                        <h2 class="h2inText"></h2> <!--{{item.title}}-->
                    </div>
                    <ul class="d-flex priceDiv jc-flex-end">
                        <li class="originPrice">NT$1,200</li>
                        <li class="price">NT$1,080</li>
                    </ul>
                    <ul class="row flex-wrap-no">
                        <button class="button col-lg-2  d-flex ai-center">
                            <li>
                                -
                            </li>
                        </button>
                        <li  class="button col-lg-2 d-flex ai-center">
                            <p class="mb-0">1</p>
                        </li>
                        <button  class="button  col-lg-2  d-flex ai-center">
                            <li>
                                +
                            </li>
                        </button>
                        <button class="btn bigBtn col-lg-8 d-flex ai-center jc-center addTocart"  
                        type="button"
                        data-toggle="modal"
                        data-target="#cart">
                                Add to cart
                        </button>
                    </ul>
                </div>
            </div>
            <!-- 加入購物車div塊結束 -->
            </div>
        </div>
        <!--product detail 下面文字-->
        <div class="row col-lg-8 mt-2 mb-2 ">
            <p class="script col-lg-8">This beautiful light grey cup comes from Taiwan. Add some minimalist scenes to your lifetime and use this cup for tea, coffee, dessert, or to place small items as a dish tray.</p>
            <p class=" col-lg-4">Made in Taiwan 8 x 8 x 6 cm Dishwasher and Microwave-safe</p>
        </div>
        <!-- product detail 下面文字 end-->
        <!-- product detail end -->
        <!-- you might like -->
        <div>
            <h1>You might also like…</h1>
            <ul class="ulOndetail row flex-wrap-no">
                <li class="animate__animated animate__fadeInRight col-lg-3">
                    <img alt="">
                    <div class="onsile">ON SALE</div>
                    <section>
                        <h2 class="underOnsile">Tatami Cup</h2>
                        <div class="row col-lg-6 jc-space-around">
                            <p>NT$1,080</p>
                            <p class="text-dec">NT$1,200</p>
                        </div>
                    </section>
                </li>
                <li class="animate__animated animate__fadeInRight col-lg-3">
                    <img src="/img/img-1.jpg" alt="">
                    <div class="onsile">ON SALE</div>
                    <section>
                        <h2 class="underOnsile">Tatami Cup</h2>
                        <div class="row col-lg-6 jc-space-around">
                            <p>NT$1,080</p>
                            <p class="text-dec">NT$1,200</p>
                        </div>
                    </section>
                </li>
                <li class="animate__animated animate__fadeInRight col-lg-3">
                    <img src="/img/img-1.jpg" alt="">
                    <div class="onsile">ON SALE</div>
                    <section>
                        <h2 class="underOnsile">Tatami Cup</h2>
                        <div class="row col-lg-6 jc-space-around">
                            <p>NT$1,080</p>
                            <p class="text-dec">NT$1,200</p>
                        </div>
                    </section>
                </li>
                <li class="animate__animated animate__fadeInRight col-lg-3">
                    <img src="/img/img-1.jpg" alt="">
                    <div class="onsile">ON SALE</div>
                    <section>
                        <h2 class="underOnsile">Tatami Cup</h2>
                        <div class="row col-lg-6 jc-space-around">
                            <p>NT$1,080</p>
                            <p class="text-dec">NT$1,200</p>
                        </div>
                    </section>
                </li>
                <li class="animate__animated animate__fadeInRight col-lg-3">
                    <img src="/img/img-1.jpg" alt="">
                    <div class="onsile">ON SALE</div>
                    <section>
                        <h2 class="underOnsile">Tatami Cup</h2>
                        <div class="row col-lg-6 jc-space-around">
                            <p>NT$1,080</p>
                            <p class="text-dec">NT$1,200</p>
                        </div>
                    </section>
                </li>
            </ul>
        </div>
        <!-- you might like end -->
        <!-- detail end -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn bigBtn" @click="updateProduct()">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger">
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>       
    <!-- Modal end -->
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
            carts:{},
            sort:"all",
            product:[]
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
                vm.carts=response.data.data.carts; //vm.carts=response.data.data.carts
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
    },
    created() {
        this.getProducts();
        this.getCart();
    }
}
</script>