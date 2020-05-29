<template>
    <div>
        <div class="main-container">
        <!-- 新nav -->
        <nav class="row navOnproduct ai-center "><!--ai-center-->
            <h2 class="titleIntop">
                <router-link to="/home">
                    CRAFTsMAN
                </router-link>
            </h2>
            <ul class="row ulOnnav mb-0">
                <li class="productList col-lg-3">Product</li>
                <li class="productList col-lg-3">Blog</li>
                <li class="productList col-lg-3">Blog</li>
                <li><i class="productList col-lg-3 fas fa-shopping-cart"></i></li>
            </ul>
        </nav>
        <!-- nav end -->
        <!-- product filter -->
        <!-- 改良分類nav -->
        <div class="mb-3">
            <div class="productFilter row ai-center jc-space-around">
                <ul class="productUl row mb-2 mt-2 col-lg-12">
                    <li><router-link to="/dashboard/products" class="listOntop">我的賣場<sup>24</sup></router-link></li>
                    <li><router-link to="/dashboard/customer_orders" class="listOntop">購物去<sup>10</sup></router-link></li>
                    <li><router-link to="/dashboard/cart" class="listOntop">我的購物車<sup>8</sup></router-link></li>
                    <li><router-link to="/dashboard/customer_order" class="listOntop">我的訂單<sup>3</sup></router-link></li>
                    <li><router-link to="/dashboard/customer_checkout" class="listOntop">結帳去<sup>3</sup></router-link></li>
                    <li><router-link to="/login" class="listOntop">登入<sup>3</sup></router-link></li>
                    <li><router-link to="" class="listOntop" @click.prevent="signout">登出<sup>3</sup></router-link></li>
                </ul>
            </div>
        </div>
        <!-- 新nav結束 -->
        <!-- 舊的nav     -->
        <!-- <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow bg-nav">
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
                    <router-link class="logo" to="/">
                            <i class="fas fa-eye-slash">
                            Shop Buy
                            </i>
                    </router-link>
                </a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
                </li>
            </ul>
        </nav> -->
        <!-- 舊的nav結束 -->
        </div>
    </div>
</template>
<script>
export default {
    name:'Navbar',
    methods:{
        signout(){
            const vm = this;
            const url= 'https://vue-course-api.hexschool.io/logout';
            this.$http.post(url).then((response) =>{
                console.log(response.data);
                if (response.data.success){
                    vm.$router.push('/login');
                }
            })
        }
    }
}
</script>