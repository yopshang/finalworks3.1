<template>
    <div>
        <!--nav-->
        <nav class="homenav d-flex flex-wrap jc-space-between ai-center p-15">
            <h2 id="home" class=" topLogo d-flex animated__animate animate__heartBeat">
                <router-link :class="{'activenav':homenavPage == 'home'}" to="/">
                    <div>
                    CRAFTsMAN
                    </div> 
                </router-link>
                <i id="ham-icon" class="fas fa-bars"></i>
            </h2>
            
            <ul class="d-flex ulList flex-wrap">
                <li id="myshop" class=" dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link :class="{'activenav':homenavPage == 'myshop'}" class="hamList productList animated__animate animate__heartBeat" to="/product/productlist">
                        | My Shop
                    </router-link>
                </li>
                <li id="shopping" class=" dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link :class="{'activenav':homenavPage == 'shopping'}" class="hamList productList" to="/product/shopping">
                        | Shopping
                    </router-link>
                </li>
              
                <li id="login" class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link :class="{'activenav':homenavPage == 'login'}" class="hamList productList" to="/login">
                        | Login
                    </router-link>
                </li>
                <li id="cart" class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link :class="{'activenav':homenavPage == 'cart'}" class="hamList productList" to="/myorder/myorder_cart">
                        | <i class="fas fa-shopping-cart"></i>
                    </router-link>
                </li>
                <li id="cart" class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link :class="{'activenav':homenavPage == 'orders'}" class="hamList productList" to="/orders">
                        | <i class="far fa-file-alt"></i>
                    </router-link>
                </li>                
            </ul>
        </nav>
        <!-- nav end -->
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name:'homenav',
    data(){
        return{
        }
    },
    methods:{
        signout(){
            const url= 'https://vue-course-api.hexschool.io/logout';
            const vm = this;
            this.$http.post(url).then((response) =>{
                console.log(response.data);
                if (response.data.success){
                    vm.$router.push('/login');
                }
            })
        },
        // turnPage(currentPage){
        //     const vm = this;
        //     vm.$store.dispatch('turnPage',currentPage);
        // }
    },
    computed:{
        homenavPage(){
            return this.$store.state.homenavPage;
        }
    },
    created(){
        $(document).ready(function() {
            console.log( "ready!" );
            $('#ham-icon').click(function(e) {
                e.preventDefault();
                $('.dropdown').toggleClass('hide');
            });
            $('.hamList').click(function(e) {
                e.preventDefault();
                $('.dropdown').toggleClass('hide');
            });        
        });
        // turnPage(home);
    },
    // created end
}
</script>
