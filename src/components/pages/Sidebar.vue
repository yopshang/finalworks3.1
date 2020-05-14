<template>
    <div>
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>| 會員專區 |</span>
                    <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>
                    <li class="nav-item">
                        <a class="nav-link  " href="#" @click="toggle">
                            <router-link to="/dashboard/products">
                                <span data-feather="home">我的賣場</span>
                                 <span class="sr-only"></span>
                            </router-link>
                        </a>
                    </li>

                    </ul>

                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>| 購物專區 |</span>
                    <a class="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link to="/dashboard/customer_orders">
                            <a class="nav-link" href="#" @click="toggle">
                            <span data-feather="file-text"></span>
                                購物去
                            </a>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/dashboard/cart">
                            <a class="nav-link" href="#" @click="toggle">
                            <span data-feather="file-text"></span>
                                我的購物車
                            </a>
                        </router-link>
                    </li>
                    </ul>
                </div>
            </nav>              
        
    </div>
</template>
<style>
.nav-link {
    color: #fff;
}
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