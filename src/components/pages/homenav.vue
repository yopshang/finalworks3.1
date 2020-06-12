ASD83A<template>
    <div>
        <!--nav-->
        <nav class="homenav d-flex flex-wrap jc-space-between ai-center p-15">
            <h2 id="navPage" class="topLogo d-flex animated__animate animate__heartBeat">
                <router-link  to="/">
                    <div>
                    CRAFTsMAN
                    </div> 
                </router-link>
                <i id="ham-icon" class="fas fa-bars"></i>
            </h2>
            
            <ul class="d-flex ulList flex-wrap">
                <li id="navPage" class=" dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList animated__animate animate__heartBeat" to="/product/productlist">
                        | My Shop
                    </router-link>
                </li>
                <li id="navPage" class=" dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/product/shopping">
                        | Shopping
                    </router-link>
                </li>
              
                <li id="navPage" class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/login">
                        | Login
                    </router-link>
                </li>
                <li id="navPage" class="dropdown hide mr-15 animated__animate animate__heartBeat">
                    <router-link class="productList" to="/product/myorder">
                        | <i class="fas fa-shopping-cart"></i>
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
    },
    created(){
        $(document).ready(function() {
            console.log( "ready!" );
            $('#ham-icon').click(function(e) {
                e.preventDefault();
                $('.dropdown').toggleClass('hide');
            });
        });
    },
    // created end
}
</script>
