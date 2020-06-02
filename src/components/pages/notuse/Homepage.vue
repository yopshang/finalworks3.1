<template>
    <div>
        <!--navbar-->
        <homenav/>
            <!-- <div class="homeNav d-flex">
                <div class="logo ai-center d-flex"><i class=" logoIcon fas fa-eye-slash"></i>Shop Buy</div>
                <ul class="navUl ai-center d-flex">
                    <li class="navLi"><router-link class="navLi" to="/dashboard/products">| 我的賣場 |</router-link></li>
                    <li class="navLi"><router-link class="navLi" to="/dashboard/customer_orders">| 購物去 |</router-link></li>
                    <li class="navLi"><router-link class="navLi" to="/dashboard/cart">| 我的購物車 |</router-link></li>
                    <li class="navLi"><router-link class="navLi" to="/login">| 登入 |</router-link></li>
                    <li class="navLi"><a class="navLi" href="#" @click.prevent="signout">| 登出 |</a></li>
                </ul>
            </div> -->
        <!--navbar結束-->
    <div class="mainDiv">
        <!-- firstDiv -->
            <div class="firstDiv row jc-center">
                <div class="firstLeft col-lg-3">
                </div>
                <img src="//i.imgur.com/eweF5Gt" crossOrigin=""  class="firstLeft col-lg-4"/>
                <div class="fisetRight col-lg-7">
                    <div class=" firstTop col-lg-12">
                        <div class="firstTopup ai-center col-lg-12">
                            <div class="topupInside d-flex">
                                <div class="topupInside1"></div>
                                <div class="topupInside2"></div>
                            </div>
                        </div>
                        <div class="firstTopdown col-lg-12">
                        </div>
                    </div>
                    <div class="firstBottom">
                        <div></div>
                        <div class="">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- firstDiv end -->
        <!-- productDiv -->
        <div class="productDiv d-flex">
            <div class="product1 ai-center col-lg-4">
                <div class=""></div>
                <div class=""></div>
            </div>
            <div class="product2  ai-center col-lg-4">
                <div class=""></div>
                <div class=""></div>
            </div>
            <div class="product3  ai-center col-lg-4">
                <div class=""></div>
                <div class=""></div>
            </div>
        </div>
        <!-- productDiv end -->
    </div>
        <!-- footer -->
        <div class="footer">
            <div class="footerInside">

            </div>
            <div class="footerBottom row">
                <ul class="footerUl col-lg-3">
                    <li class="insideFooterUl1"></li>
                    <li class="insideFooterUl2"></li>
                </ul>
                <ul class="footerUl col-lg-3">
                    <li class="insideFooterUl1"></li>
                    <li class="insideFooterUl2"></li>
                </ul>
                <ul class="footerUl col-lg-3">
                    <li class="insideFooterUl1"></li>
                    <li class="insideFooterUl2"></li>
                </ul>
            </div>
            <div class="bottom d-flex ai-center jc-center">
                <ul class="insideBottom">
                    <li><i class="fas fa-comments"></i> CONTACT US</li>
                    <hr class="hr">
                    <li><i class="fas fa-phone"></i> PHONE NUMBER | 09225854445</li>
                    <li><i class="fas fa-envelope"></i> E-MAIL | 555@gmail.com</li>
                    <li><i class="fas fa-map-marked"></i> ADDRESS | 台北市內湖區</li>
                </ul>
            </div>
        </div>
        <!-- footer end -->
    </div>
</template>

<script>
import homenav from './homenav.vue';
export default {
    name:'Logout',
    components:{
        homenav
    },
    data(){
        return{
        };
    },
    methods: {
        signout(){
            const api =`https://vue-course-api.hexschool.io/logout`;
            const vm=this;
            this.$http.post(api).then((response)=>{
                if(response.data.success){
                    vm.$router.push('/login')
                }
            })
        }
    }
};
</script>