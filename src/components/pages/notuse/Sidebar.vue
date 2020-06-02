<template>
    <div>
            <nav class="col-md-2 d-none d-md-block sidebar"><!--bg-light-->
                <div class="sidebar-sticky bgwhite">
                    <ul class="nav flex-column">
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span class=" mb-2">| 會員專區 |</span>
                    <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>
                    <li class="nav-item  mb-2">
                        <a class="nav-link  " href="#" @click="toggle">
                            <router-link to="/dashboard/products">
                                <span class="optionList" data-feather="home">
                                    <i class="fas fa-folder-open">
                                    我的賣場
                                    </i>
                                </span>
                                 <span class="sr-only"></span>
                            </router-link>
                        </a>
                    </li>

                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span class=" mb-2">| 購物專區 |</span>
                    <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>

                    <ul class="sidebarUl nav flex-column mb-2">
                        <li class="nav-item  mb-2">
                            <a class="nav-link" href="#" @click="toggle">
                                <router-link to="/dashboard/customer_orders">
                                    <span class="optionList" data-feather="file-text">
                                        <i class="fas fa-shopping-bag">
                                        購物去
                                        </i>
                                    </span>
                                </router-link>
                            </a>
                        </li>
                        <li class="nav-item  mb-2">
                            <a class="nav-link" href="#" @click="toggle">
                                <router-link to="/dashboard/cart">
                                    <span class="optionList" data-feather="file-text">
                                        <i class="fas fa-shopping-cart">
                                        我的購物車
                                        </i>
                                    </span>
                                </router-link>
                            </a>
                        </li>
                        <li class="nav-item  mb-2">
                            <a class="nav-link" href="#" @click="toggle">
                                <router-link to="/dashboard/customer_order">
                                    <span class="optionList" data-feather="file-text">
                                        <i class="fas fa-file-signature">
                                        我的訂單
                                        </i>
                                    </span>
                                </router-link>
                            </a>
                        </li>
                        <li class="nav-item  mb-2">
                            <a class="nav-link" href="#" @click="toggle">
                                <router-link to="/dashboard/customer_checkout">
                                    <span class="optionList" data-feather="file-text">
                                        <i class="fas fa-money-check-alt">
                                        結帳去
                                        </i>
                                    </span>
                                </router-link>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>              
        
    </div>
</template>
<style>
</style>
<script>
import $ from 'jquery';
export default{
     methods:{
        toggle(){
            $('.nav-link').click(function(){
                $(".active").toggleClass("active");
                $(this).toggleClass("active");
            })
        }
    },
}

</script>