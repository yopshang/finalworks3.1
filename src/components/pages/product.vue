<template>
<div class="mainContainer">
        <!--nav-->
        <homenav/>
        <!-- nav end -->

        <!-- product -->
        <router-view>

        </router-view>
        <!-- product end -->
        <!--layout footer-->
        <bottom/>
        <!-- layout footer end -->
    </div> 
</template>
<script>
import homenav from './homenav.vue';
import bottom from './bottom';
import productList from './productList';
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
    components:{
        homenav,bottom,productList
    },
    methods: {
        getProducts(){
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