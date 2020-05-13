<template>
    <div>
        <!--全螢幕讀取效果-->
        <div class="vld-parent">
            <loading :active.sync="isLoading" ></loading>    
        </div>
        <!--全螢幕讀取效果結束-->
        <!--產品列表卡片-->
        <div class="text-right mt-4">
            <button class="btn btn primary" data-toggle="model" data-target="#productModal" @click="openModal(true)">建立新的產品</button>
        </div>
        <table class="table table-striped table-sm">
            <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="80">是否啟用</th>
                <th width="120">編輯</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item) in products" :key="item.id">
                <td>{{item.category}}</td>
                <td>{{item.title}}</td>
                <td class="text-right">
                    {{item.origin_price | currency}}
                </td>
                <td class="text-right">
                    {{item.price | currency}}
                </td>
                <td>
                    <span v-if="item.is_enabled" class="text-sucess">啟用</span>
                    <span v-else>未啟用</span>
                </td>
                <td>
                    <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
                </td>
            </tr>    
            </tbody>
        </table>
        <!--產品列表卡片結束-->
        <!--頁籤-->
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
        <!--頁籤-->
        <!--Modal-->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content border-0">
                            <div class="modal-header bg-dark text-white">
                                <h5 class="modal-title" id="exampleModalLabel">
                                <span>新增產品</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="image">輸入圖片網址</label>
                                        <input v-model="tempProduct.imageUrl" type="text" class="form-control" id="image"
                                        placeholder="請輸入圖片連結">
                                    </div>
                                    <div class="form-group">
                                        <label for="customFile">或 上傳圖片
                                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                        </label>
                                        <input type="file" id="customFile" class="form-control"
                                        ref="files" @change="uploadFile">
                                    </div>
                                    <img 
                                    class="img-fluid" :src="tempProduct.imageUrl" alt="" img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80">
                                </div>
                                <div class="col-sm-8">
                                    <div class="form-group">
                                        <label for="title">標題</label>
                                        <input type="text"  v-model="tempProduct.title" class="form-control" id="title"
                                        placeholder="請輸入標題">
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="category">分類</label>
                                            <input type="text" class="form-control" id="category"
                                            placeholder="請輸入分類"  v-model="tempProduct.category">
                                        </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input type="unit" class="form-control" id="unit"
                                        placeholder="請輸入單位"  v-model="tempProduct.unit">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" id="origin_price"
                                        placeholder="請輸入原價"  v-model="tempProduct.origin_price">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" id="price"
                                        placeholder="請輸入售價"  v-model="tempProduct.price">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" id="description"
                                    placeholder="請輸入產品描述"  v-model="tempProduct.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" id="content"
                                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox"
                                        id="is_enabled" v-model="tempProduct.is_enabled"
                                        :true-value="1"
                                        :false-value="0">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
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
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    name:'Procucts',
    data(){
        return {
            products:[],
            pagination:'',
            tempProduct:{},
            isNew:false,
            isLoading:false, //控制全螢幕讀取效果
            status:{
                fileUploading:false,
            }
            
        }
    },
    methods: {
        getProducts(page=1){
            const api=`https://vue-course-api.hexschool.io/api/yop/admin/products?page=${page}`;
            const vm=this;
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                console.log(response.data);
                vm.isLoading=false;
                vm.products=response.data.products;
                vm.pagination=response.data.pagination;
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
    }
}
</script>