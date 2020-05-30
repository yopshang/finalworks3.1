<template>
<div>
            <!-- product filter -->
        <div class="mb-30"> <!--做一個分類fiter-->
            <div class="productFilter p-15 d-flex">
                <ul v-for="(item) in products" :key="item.id" class="d-flex w-100 jc-space-between">
                    <li class="filterList">{{item.category}}<sup></sup></li>
                </ul>
            </div>
        </div>
        <!-- product filter end -->
    <div class="productcard">
        <div v-for="(item) in products" :key="item.id" class="productArea"><!--這邊要用v-for引入資料-->
            <div class="cateContainer">
                <img :src="item.imageUrl" class="productImg" alt="">
                <div class="cate">{{item.category}}</div>
                <section class="d-flex fd-column">
                    <h2 class="mb-15">{{item.title}}</h2>
                    <div class="w-100 d-flex jc-space-between">
                        <p class="">{{item.price | currency}}</p>
                        <p class="text-dec">{{item.origin_price | currency}}</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
    <!-- page number -->
    <div class="row jc-center mb-4">
        <ul class="row col-lg-1 jc-space-between">
            <li class="pageNumber">1</li>
            <li class="pageNumber">2</li>
            <li class="pageNumber">3</li>
        </ul>
    </div>
    <!-- page number end -->    
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