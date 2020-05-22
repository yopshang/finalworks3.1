<template>
    <div>
        <!--navbar-->
        <div class="homeNav d-flex ">
            <div class="logo ai-center d-flex">
                <router-link class="logo" to="/">
                    <i class=" logoIcon fas fa-eye-slash">
                        Shop Buy
                    </i>
                </router-link>
            </div>
            <ul class="navUl ai-center d-flex">
                <li class="navLi"><router-link class="navLi" to="/dashboard/products">| 我的賣場 |</router-link></li>
                <li class="navLi"><router-link class="navLi" to="/dashboard/customer_orders">| 購物去 |</router-link></li>
                <li class="navLi"><router-link class="navLi" to="/dashboard/cart">| 我的購物車 |</router-link></li>
                <li class="navLi"><router-link class="navLi" to="/dashboard/customer_order">| 我的訂單 |</router-link></li>
                <li class="navLi"><router-link class="navLi" to="/dashboard/customer_checkout">| 結帳去 |</router-link></li>
                <li class="navLi"><router-link class="navLi" to="/login">| 登入 |</router-link></li>
                <li class="navLi"><a class="navLi" href="#" @click.prevent="signout">| 登出 |</a></li>
            </ul>
        </div>
        <!--navbar結束-->
    </div>
</template>
<style lang="scss">
    .logo{
        color:blanchedalmond;
    }
</style>