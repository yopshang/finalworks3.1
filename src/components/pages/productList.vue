<template>
<div class="PDL">
    <Alert/>
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
    <div class="d-flex jc-space-between ai-center p-15">
        <div class="mylogoDiv">我的商城</div>
        <div>
            <el-button @click="openModal(false)" type="primary" style="margin-left: 16px;">
                + 新增商品
            </el-button>
            <!-- <button class="addProduct mr-15" data-toggle="modal" data-target="#productModal" @click="openModal(true)"> + 新增商品</button> -->
            <el-button @click.prevent="signout" type="primary" style="margin-left: 16px;">
                登出
            </el-button>
            <!-- <button @click.prevent="signout"  class="addProduct">登出</button> -->
            <!-- <a  href="#" >
                登出
            </a>   -->
        </div>
    </div>
    <!-- product filter end -->
    <div class="productcard">
        <div v-for="(item) in products" :key="item.id"
        v-if="item.category==sort || sort=='all'"
        class="productArea"><!--這邊要用v-for引入資料-->
            <div class="cateContainer">
                <img :src="item.imageUrl" class="productImg" alt="">
                <div class="cate">{{item.category}}</div>
                <section class="d-flex fd-column">
                    <h2 class="mb-15">{{item.title}}</h2>
                    <div class="w-100 d-flex jc-space-between">
                        <p class="">{{item.price | currency}}</p>
                        <p class="text-dec">{{item.origin_price | currency}}</p>
                    </div>
                    <div class="w-100 mt-15 d-flex jc-space-between">
                        <!-- <button class="smBtn p-10" data-toggle="modal"
                        data-target="#editModal" @click="openModal(false,item)">編輯</button> -->
                        <el-button type="success" @click="openModal(false,item)">編輯</el-button>
                        <!--  -->
                        <el-button type="info" @click="deleteProduct(item)">刪除</el-button>
                        <!-- <button class="smBtn-cancel p-10" @click="deleteProduct(item)">刪除</button> -->
                    </div>
                </section>
            </div>
        </div>

    </div>
    <!-- page number -->
    <div class="p-15">
        <ul class="pageUl d-flex jc-center">
            <li class="pageNumber p-15"
            v-if="pagination.has_pre" :class="{'disabled':!pagination.has_pre}">
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
            v-if="pagination.has_next" :class="{'disabled':!pagination.has_next}">
                <a href="#" @click.prevent="getProducts(pagination.current_page+1)">
                    >>
                </a>
            </li>
        </ul>
    </div>
    <!-- page number end -->
    <!-- Modal --> <!--id="productModal"-->
    <div class="modal fade" id="" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content border-0">
                            <div class="modal-header">
                                <h5  class="titleStyle p-15 d-flex jc-center" id="exampleModalLabel"><!--title-->
                                    <span >新增產品</span>
                                </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <!--叉叉按鈕-->
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex">
                                <div class="w-40 mr-15">
                                    <div class="form-group ">
                                        <label class=" mb-10" for="image">輸入圖片網址</label>
                                        <input v-model="tempProduct.imageUrl" type="text" class="form-control p-15" id="image"
                                        placeholder="請輸入圖片連結">
                                    </div>
                                    <div class="form-group">
                                        <label for="customFile" class="mb-15">或 上傳圖片
                                            <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                        </label>
                                        <input type="file" id="customFile" class="form-control"
                                        ref="files" @change="uploadFile">
                                    </div>
                                    <div class="urlImgDiv p-15 mb-10">
                                        <img class="img-fluid" :src="tempProduct.imageUrl"
                                        alt="" img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80">
                                    </div>
                                </div>
                                <div class="w-60">
                                    <div class="form-group">
                                        <label for="title" class="mb-15">標題</label>
                                        <input type="text"  v-model="tempProduct.title" class="form-control p-15" id="title"
                                        placeholder="請輸入標題">
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="category" class="mb-10">分類</label>
                                            <input type="text" class="form-control p-15" id="category"
                                            placeholder="請輸入分類"  v-model="tempProduct.category">
                                        </div>
                                    <div class="form-group col-md-6">
                                        <label for="price" class="mb-10">單位</label>
                                        <input type="unit" class="form-control p-15" id="unit"
                                        placeholder="請輸入單位"  v-model="tempProduct.unit">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price" class="mb-10">原價</label>
                                        <input type="number" class="form-control p-15" id="origin_price"
                                        placeholder="請輸入原價"  v-model="tempProduct.origin_price">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price" class="mb-10">售價</label>
                                        <input type="number" class="form-control p-15" id="price"
                                        placeholder="請輸入售價"  v-model="tempProduct.price">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description" class="mb-10">產品描述</label>
                                    <textarea type="text" class="form-control p-15" id="description"
                                    placeholder="請輸入產品描述"  v-model="tempProduct.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content" class="mb-10">說明內容</label>
                                    <textarea type="text" class="form-control p-15" id="content"
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
    <!-- Edit Modal -->
    <div  class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div  class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header">
                    <h5 class="titleStyle p-15 d-flex jc-center" id="exampleModalLabel"><!--title-->
                        <span>編輯商品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <!--叉叉按鈕-->
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        <div class="modal-body">
        <!-- detail -->
        <!-- product detail -->
        <!-- 左邊圖案區塊 -->
        <div class="d-flex flex-wrap-no underProductDetail">
            <!-- leftSide -->
            <div class="  d-flex flex-wrap p-15">
                <div class="w-100 d-flex jc-center">
                    <img class="smoothInput" :src="tempProduct.imageUrl" alt="">
                </div>
                <!-- <div else class="tempImg mb-30 w-100" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-1.jpg') + ')' }"></div> -->
                <div class="d-flex w-100 ai-center mb-15">
                    <input type="text" v-model="tempProduct.imageUrl" class="w-50 m-10 form-control p-15 " id="image" placeholder="請輸入圖片連結">
                    <input type="file" id="customFile" class="form-control m-10 w-50" placeholder="請拖曳或上傳圖片" ref="files" @change="uploadFile">
                </div>
                <ul class="w-100 d-flex jc-space-around ai-center">
                    <li class="w-40">
                        <input class="w-100 smoothInput eidtInput" type="text" placeholder="請輸入產品描述"  v-model="tempProduct.description">
                    </li>
                    <li class="w-40">
                        <input class="w-100 smoothInput eidtInput" type="text" placeholder="請輸入產品說明內容" v-model="tempProduct.content">
                    </li>
                </ul>
            </div>
            <!-- rightSide -->
            <div class=" d-flex ai-center w-60 rightSide">
                <section class="modalInside w-100 jc-flex-start p-15">
                    <input class="smoothInput w-40 detailArea_text_center" type="text" name="" id="" placeholder="請輸入類別"  v-model="tempProduct.category">
                    <div>
                        <div class="productDetailTitle  mb-30">
                            <input class="w-100 smoothInput detailArea_text_center" type="text" v-model="tempProduct.title" placeholder="請輸入標題">
                        </div>
                        <div class="d-flex jc-space-between ai-center">
                            <div>原價</div>
                            <input class="w-35 smoothInput" type="text" placeholder="請輸入原價"  v-model="tempProduct.origin_price">
                            <div>售價</div>
                            <input class="w-35 smoothInput" type="text" placeholder="請輸入售價"  v-model="tempProduct.price">
                        </div>
                    </div>
                    <footer>
                        <ul class="d-flex">
                            <li class="p-15 detailArea_text_center">-</li>
                            <li class="p-15 detailArea_text_center">1</li>
                            <li class="p-15 detailArea_text_center">+</li>
                            <input class="w-35 smoothInput detailArea_text_center" type="text" placeholder="請輸入單位"  v-model="tempProduct.unit">
                            <!-- <li class="fullColorBtn p-15">Add to cart</li> -->
                        </ul>
                    </footer>
                </section>
            </div>
        </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn bigBtn" @click="updateProduct">確認</button>
        </div>
                    </div>
                </div>
    </div>

    <el-drawer
        title="+新增商品"
        :visible.sync="drawer"
        size="70%">
        <div>
        <!-- <el-button @click="innerDrawer = true">打开里面的!</el-button> -->
        <!-- <el-drawer
            title="我是里面的"
            :append-to-body="true"
            :before-close="handleClose"
            :visible.sync="innerDrawer">
            <p>_(:зゝ∠)_</p>
            
        </el-drawer> -->
        <el-row>
            <el-col :span="24">
                <el-card :body-style="{ padding: '15px' }">
                <img :src="tempProduct.imageUrl" class="image">
                <el-input v-model="tempProduct.title" placeholder="请输入商品名稱"></el-input>
                <div class="img-url-input">
                    <el-input class="item" v-model="tempProduct.imageUrl" placeholder="请输入圖片網址"></el-input>
                    <!-- <el-input class="item" @change="uploadFile" type="file" v-model="tempProduct.imageUrl" placeholder="或上傳圖片"></el-input> -->
                    <input class="item" @change="uploadFile" ref="files" type="file" placeholder="或上傳圖片"></input>
                    <el-input class="item" v-model="tempProduct.unit" placeholder="請輸入單位"></el-input>
                    <el-input class="item" v-model="tempProduct.origin_price" placeholder="請輸入原價"></el-input>
                    <el-input class="item" v-model="tempProduct.price" placeholder="請輸入售價"></el-input>
                    <el-input class="item" v-model="tempProduct.content" placeholder="請輸入產品說明內容"></el-input>
                    <el-input class="item" v-model="tempProduct.description" placeholder="請輸入產品描述"></el-input>
                    <el-select v-model="value" placeholder="請選擇類別">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="padding: 14px;">
                    <div class="bottom clearfix">
                        <el-button @click="updateProduct()" type="primary" style="margin-left: 16px;">
                            確定
                        </el-button>
                        <el-button  @click="drawer = false" type="primary" style="margin-left: 16px;">
                            取消
                        </el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
        </el-row>
            </div>
        </el-drawer>

    <!-- Edit Modal end -->
</div>
</template>
<style lang="scss" scope>
    .uploadInput {
        width: 100%;
    }
</style>
<script>
import $ from 'jquery';
import Alert from './AlertMessage';
import {mapGetters,mapActions} from 'vuex';

export default {
    name:'Procucts',
    data(){
        return {
            // element-ui-drawer
            drawer: false,
            innerDrawer: false,
            products:[], // 從Vuex return
            // pagination:'', //從vuex return
            tempProduct:{},
            isNew:false,
            status:{
                fileUploading:false,
            },
            sort:"all",
            product:{},
            options: [{
                value: '保養品',
                label: '保養品'
                }, {
                value: '玩具',
                label: '玩具'
                }, {
                value: '外套',
                label: '外套'
                }, {
                value: '鞋子',
                label: '鞋子'
                }, {
                value: '其他',
                label: '其他'
            }],
            value: '',
        }
    },
    components:{
        Alert,
    },
    methods: {
        successAlert() {
            this.$message({
            message: '更新成功!',
            type: 'success'
            });
        },
        failAlert(){
            this.$message.error('更新失敗，很抱歉，請重新操作!');
        },
        getProducts(page=1){
            const api=`https://vue-course-api.hexschool.io/api/yop/admin/products?page=${page}`;
            const vm=this;
            vm.$store.dispatch('updateLoading',true);
            this.$http.get(api).then((response)=>{
                console.log(response.data);
                if (response.data.success) {
                    this.successAlert();
                } else {
                    this.failAlert();
                }
                vm.$store.dispatch('updateLoading',false);
                vm.products=response.data.products;
                vm.pagination=response.data.pagination;
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                    this.reload();
                }, 1000);
            })
        },
        openModal(isNew,item){
            if(isNew){
                this.tempProduct={};
                this.isNew=true;
            }else{
                this.tempProduct=Object.assign({},item); //避免物件傳參考的特性
                this.isNew=false;
            }
            // $('#productModal').modal('show'); // 這邊打開modol
            this.drawer = true;
        },
        updateProduct(){
            this.tempProduct.categor = this.value;
            let api=`https://vue-course-api.hexschool.io/api/yop/admin/product`;
            const vm= this;
            let httpMethods='post';
            if(!vm.isNew){
                api=`https://vue-course-api.hexschool.io/api/yop/admin/product/${vm.tempProduct.id}`;
                httpMethods='put';
            }
            this.$http[httpMethods](api,{data:vm.tempProduct}).then((response)=>{
                console.log(response.data);
                if (response.data.success){
                    // $('#productModal').modal('hide');
                    this.drawer = false;
                    vm.getProducts();
                }else{
                    // $('#productModal').modal('hide');
                    this.drawer = false;
                    // vm.getProducts();
                    this.failAlert();
                    // console.log('新增失敗');
                }
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                    this.reload();
                }, 1000);
            })
            this.drawer = false; 
        },
        deleteProduct(item){
            const vm=this;
            const url=`https://vue-course-api.hexschool.io/api/yop/admin/product/${item.id}`;
            this.$http.delete(url).then((response)=>{
            vm.getProducts();
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                this.reload();
                }, 1000);
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
                    vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
                }else{
                    this.$bus.$emit('message:push',response.data.message,'danger');
                }
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                    this.reload();
                }, 1000);
            });
        },
        signout(){
            const vm = this;
            const url= 'https://vue-course-api.hexschool.io/logout';
            this.$http.post(url).then((response) =>{
                console.log(response.data);
                vm.$store.dispatch('updateLoading',true);
                if (response.data.success){
                    vm.$store.dispatch('updateLoading',true);
                    vm.$bus.$emit('message:push','登出成功，歡迎再次光臨!','success');
                    setTimeout(() => {
                        vm.$router.push('/');
                        vm.$store.dispatch('updateLoading',false);
                    }, 2000);
                }else{
                    vm.$bus.$emit('message:push','登出失敗，請重新嘗試!','danger');
                    vm.$store.dispatch('updateLoading',false);
                }
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                    this.reload();
                }, 1000);
            })
        },
        turnPage(currentPage){
            const vm = this;
            vm.$store.dispatch('turnPage',currentPage);
        },
        brforeRouterEnter(to, from, next) {
            const api=`https://vue-course-api.hexschool.io/api/user/check`;
            const vm =this;
            vm.$store.dispatch('updateLoading',true);
            this.$http.post(api).then((response)=>{
                console.log(response.data);
                // 驗證是否持續登入
                if (response.data.success){
                    vm.$store.dispatch('updateLoading',false);
                }else{
                    vm.$bus.$emit('message:push',"您好，請先登入會員! 2秒後自動跳轉",'danger');
                    vm.$store.dispatch('updateLoading',false);
                    setTimeout(() => {
                        vm.$router.push('/login');
                    }, 2000);
                }
            }).catch(()=>{
                vm.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
                setTimeout(() => {
                    this.reload();
                }, 1000);
            });
        },
        reload(){
            // window.location.reload();
            // alert ('錯誤');
            vm.$store.dispatch('updateLoading', false);

        },
        openAlertDel (){
            $('#AlertDelModal').modal('show');
        },
        init () {
            this.getProducts();
            this.turnPage("myshop");
            this.brforeRouterEnter();
            this.$bus.$emit('message:push',"歡迎回到您的商場!",'success');
        }
    },
    computed:{
        ...mapGetters(['isLoading','pagination']),
        pageNumber: ()=>{
            return this.pagination;
        },
        
    },
    created(){
        this.init();
        // this.getProducts();
        // this.turnPage("myshop");
        // this.brforeRouterEnter();
        // this.$bus.$emit('message:push',"歡迎回到您的商場!",'success');
    },
    mounted() {
        this.init();
    }
}
</script>