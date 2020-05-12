<template>
    <div>
        <!--讀取效果-->
        <div class="vld-parent">
            <loading :active.sync="isLoading" ></loading>    
        </div>
        <!--讀取效果結束-->
        <!--訂單列表-->
        <!--產品列表卡片-->
        <div class="col-md-12 mb-4 d-flex flex-wrap" >
            <div class="card border-0 shadow-sm col-md-4" v-for="item in products" :key="item.id" >
                <div style="height: 150px; background-size: cover; background-position: center">
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                    <h5 class="card-title">
                        <a href="#" class="text-dark">{{item.title}}</a>
                    </h5>
                    <p class="card-text">{{item.content}}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                        <!-- <div class="h5">2,800 元</div> -->
                        <del class="h6">原價 {{item.origin_price}} 元</del>
                        <div class="h5">現在只要 {{item.price}} 元</div>
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                        <i class="fas fa-spinner fa-spin"></i>
                        查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                        <i class="fas fa-spinner fa-spin"></i>
                        加到購物車
                    </button>
                </div>
            </div>
        </div>
        <!--產品列表卡片結束-->
        <!--訂單列表結束-->
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
        <!--頁籤結束-->
    </div>

</template>
<script>
export default {
    data(){
        return{
            products:[],
            isLoading:false,
            pagination:'',
        };
    },
    methods: {
        getProducts() {
            const vm = this;
            const api='https://vue-course-api.hexschool.io/api/yop/products?page=:page';
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                vm.products=response.data.products;
                vm.pagination=response.data.pagination;
                console.log(response);
                vm.isLoading=false;
            });
        }
    },
    created() {
        this.getProducts();
    }


}
</script>