<template>
    <div>
        <!--讀取效果-->
        <div class="vld-parent">
            <loading :active.sync="isLoading" ></loading>
        </div>
        <!--讀取效果結束-->
        <!--訂單列表-->
        <!--產品列表卡片-->
        <div class="col-lg-12 mb-4 d-flex flex-wrap">
            <div class="card border-1 shadow-sm col-md-4 mb-2 " v-for="item in products" :key="item.id" >
                <div style="max-width: 300px; background-size: cover; background-position: center">
                    <img :src="item.imageUrl" class="img-fluid" alt="">
                    <!--<img class="img-fluid" src="../img/noimg.png" alt="">-->
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6">原價 {{item.origin_price | currency}} 元</del>
                        <div class="h5">現在只要 {{item.price | currency}} 元</div>
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">    
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                        查看更多
                    </button>
                    <button @click="addtoCart(item.id)" type="button" class="btn btn-outline-danger btn-sm ml-auto">
                        <i class="fas fa-spinner fa-spin" v-if="status.loadingItem===item.id"></i>
                        加到購物車
                    </button>
                </div>
            </div>
        </div>
        <!--產品列表卡片結束-->
        <!--訂單列表結束-->
        <!--Modal-->
                <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content border-0">
                            <div class="modal-header bg-dark text-white">
                                <h5 class="modal-title" id="exampleModalLabel">
                                <span>商品細節</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">                  
                            <div class="row">      
                                <div class="col-sm-12">
                                <!--
                                    <div class="form-group">
                                        <label for="image">輸入圖片網址</label>
                                        <input v-model="tempProduct.imageUrl" type="text" class="form-control" id="image"
                                        placeholder="請輸入圖片連結">
                                    </div>
                                    <div class="form-group">
                                        <label for="customFile">或 上傳圖片
                                        <i class="fas fa-spinner fa-spin" ></i> 
                                        </label>
                                        <input type="file" id="customFile" class="form-control"
                                        ref="files">
                                    </div>
                                -->
                                    <img class="img-fluid" :src="product.imageUrl" alt=""> <!--img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"-->
                                </div>
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label for="title">商品名稱</label>
                                        <input type="text"  v-model="product.title" class="form-control" id="title"
                                        placeholder="請輸入標題" readonly>
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="category">分類</label>
                                            <input type="text" class="form-control" id="category"
                                            placeholder="請輸入分類"  v-model="product.category" readonly>
                                        </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input type="unit" class="form-control" id="unit"
                                        placeholder="請輸入單位"  v-model="product.unit" readonly>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price"
                                        placeholder="請輸入原價"  v-model="product.origin_price" readonly>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" id="price"
                                        placeholder="請輸入售價"  v-model="product.price" readonly>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <div>選購數量</div>
                                    <select v-model="product.num">
                                        <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>                                      
                                    </select>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description"
                                    placeholder="請輸入產品描述"  v-model="product.description" readonly></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content"
                                    placeholder="請輸入產品說明內容" v-model="product.content" readonly></textarea>
                                </div>
                                
                                <!--
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                        id="is_enabled" v-model="product.is_enabled"
                                        :true-value="1"
                                        :false-value="0">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                                -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <!--加入小計多少錢-->
                        <button type="button" class="btn btn-primary" @click="addtoCart(product.id,product.num)">加入購物車</button>
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
        <!--Modal結束-->
        <!--頁籤-->  <!--要微調一下-->
        <nav aria-label="...">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                    <a class="page-link" href="#" tabindex="-1" aria-disabled="true" @click.prevent="getProducts(pagination.current_page-1)">上一頁</a>
                </li>
                <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page===page}">
                    <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
                </li>
                <li class="page-item"  :class="{'disabled':!pagination.has_next}">
                    <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page+1)">下一頁</a>
                </li>
            </ul>
        </nav>  
        <!--頁籤結束-->
        <!--購物車
        
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
                            <button type="button" class="btn btn-outline-danger btn-sm">
                            <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                        <td class="align-middle">
                            {{ item.product.title }} <!--carts-->
                            <!-- <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                            </div>
                        </td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td><!--carts
                        <td class="align-middle text-right">{{ item.final_total }}</td><!--carts
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-right">總計</td>
                        <td class="text-right"></td><!--{{ item.total }}
                    </tr>
                    <tr>
                        <td colspan="3" class="text-right text-success">折扣價</td>
                        <td class="text-right text-success"></td><!--{{ item.final_total }}
                    </tr>
                </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm">
                <input type="text" class="form-control" placeholder="請輸入優惠碼">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                    套用優惠碼
                    </button>
                </div>
            </div>
            
        購物車結束-->
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
        }
    },
    created() {
        this.getProducts();
        this.getCart();
    }


}
</script>