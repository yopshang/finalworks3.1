ASD83A<template>
    <div>
        <!--nav-->
        <nav class="homenav d-flex flex-wrap jc-space-between ai-center">
            <h2 class="topLogo d-flex animated__animate animate__heartBeat">
                <router-link to="/">
                    <div>
                    CRAFTsMAN
                    </div> 
                </router-link>
                <i id="ham-icon" class="fas fa-bars"></i>
            </h2>
            
            <ul class="d-flex ulList flex-wrap">
                <li class=" dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList animated__animate animate__heartBeat" to="/product/productlist">
                        My Shop
                    </router-link>
                </li>
                <li class=" dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/product/productlist">
                        | Shopping
                    </router-link>
                </li>
                <li class=" dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/">
                        | My Order
                    </router-link>
                </li>                
                <li class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/login">
                        | Login
                    </router-link>
                </li>
                <li class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/">
                        | Logout
                    </router-link>
                </li>                
                <!--購物車圖案-->
                <li class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/login">
                        | <i class="fas fa-shopping-cart"></i>
                    </router-link>
                </li>
            </ul>
        </nav>
        <!-- nav end -->
    </div>
</template>

<script>
export default {
    name:'homenav',
    data(){
        return{
        }
    },
}
</script>
<script>
import $ from 'jquery';
$( document ).ready(function() {
    console.log( "ready!" );
    $('#ham-icon').click(function(e) {
        e.preventDefault();
        $('.dropdown').toggleClass('hide');
        console.log('成功點擊');
    })
});
</script>