<template>
<div class="mainContainer">
        <!--全螢幕讀取效果-->
        <div class="vld-parent">
            <loading :active.sync="isLoading" ></loading>    
        </div>
        <!--全螢幕讀取效果結束-->
        <homenav/>
        <!-- firstRow --><!--title-->
        <div class="topDiv d-flex flex-wrap">
            <div class="insideTopdiv d-flex ai-center">
                <div  class="insideTop">
                    <h1 class="bigTitleintop mb-10 animated__animate animate__fadeInLeft">
                        Enjoy Your 
                    </h1>
                    <h1 class="bigTitleintop animated__animate                     
                      animate__fadeInLeft mb-10">
                      Minimalist Lifestyle.
                    </h1>
                    <h2 class="smTitleintop mb-10">The best crafts in Taiwan. Get your free shipping on the first order.</h2>
                    <a href="/product.html mb-10">
                        <router-link to="/product/productList">
                            <input class="shopBtn p-15" type="button" value="Shop now"></input>
                        </router-link> 
                    </a>
                </div>
            </div>
            <div class="d-flex topDivright jc-flex-end" 
            :style="{ backgroundImage: 'url(' + require('@/assets/img/index-1.jpg') + ')' }">
            </div>
        </div>
        <!-- firstRow end -->
        <!-- secondRow --><!--three img-->
        <div>
            <div class="d-flex flex-wrap mb-25 h-250">
                <div  class="secondRow m-rwd" 
                :style="{ backgroundImage: 'url(' + require('@/assets/img/index-2.jpg') + ')' }"></div>
                <div class="d-flex ai-center secondRow ai-center  m-rwd">
                    <section class="secRowsection">
                        <h2>Special Clays</h2>
                        <p>A general body formulation for contemporary earthenware is 25% kaolin, 25% ball clay, 35% quartz and 15% feldspar.</p>
                        <router-link to="">
                            <h3>learn more</h3>
                        </router-link>
                    </section>
                </div>
            </div>
            <div class="secFix h-250 secRowRwd"> <!--待會回來修理這裡-->
                <div class="d-flex ai-center secondRow  reRow">
                    <section class="secRowsection">
                        <h2>Less is more</h2>
                        <p>Trimming pottery can transform a weighty Earth-bound pot into one that is a pleasure to hold, look at, and use.</p>
                        <router-link to="">
                            <h3>learn more</h3>
                        </router-link>
                    </section>
                </div>
                <div class="secondRow" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-3.jpg') + ')' }"></div>
            </div>
            <div class="d-flex flex-wrap mb-25 h-250 secRowRwd">
                    <div class="secondRow m-rwd" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-4.jpg') + ')' }"></div>
                    <div class="d-flex ai-center secondRow">
                        <section class="secRowsection">
                            <h2>Marvelous Detail</h2>
                            <p>In Craftsman, the art director, working with marketers, develops or creates an idea of a new creation.</p>
                            <router-link to="">
                                <h3>learn more</h3>
                            </router-link>
                        </section>
                    </div>
            </div>
        </div>
        <!-- secondRow end -->
    <!-- thirdRow --> <!--big img-->
    <div class="d-flex thirdRow mt-70 m-rwd thirdRowoutsideRwd" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-5.jpg') + ')' }">
        <div class=" d-flex thirdTurnRwd leftSide ai-center">
            <p class="m-30">“I want to make the life more simple by crafts.”</p>
        </div>
        <div class="thirdTurnRwd d-flex jc-center ai-center">
            <section class="rightSide ">
                <h2>Art Director</h2>
                <h1 class="mb-10">hsiao-Ming Chen</h1>
                <ul class="d-flex">
                    <li>
                        <a href="">
                        Instagram
                        </a>
                    </li>
                    <li>
                        <a href="">
                        Facecbook
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    </div>
    <!-- thirdRow end -->
    <!-- fourthRow products--> <!--等新版product做好，要import進來-->
    <div class="fourthRowinside mb-25">
        <div v-for="(item) in products" :key="item.id" class="productCard">
            <!-- 商品照片 -->
            <!-- <div :style="{ backgroundImage: 'url(' + require('@/assets/img/img-1.jpg') + ')' }"></div> -->
            <div class="outsideProImg">
                <img class="proImg" :src="item.imageUrl" alt="">
                <div class="cate">{{item.category}}</div>             
            </div>
            <h2 >{{ item.title }}</h2> <!--商品名稱-->
            <ul class="d-flex">
                <li class="text-dec">原價{{ item.origin_price | currency }}</li> <!--原價-->
                <li>特價{{ item.price | currency }}</li> <!--特價-->
            </ul>
        </div>
    </div>
    <!-- fourthRow end -->
    <bottom/>

</div>
</template>
<script>
import homenav from './homenav.vue';
import bottom from './bottom';
import productList from './productlist';
export default {
    components:{
                homenav,
                bottom,
                productList
            },
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
    // data end
    methods:{
        getProducts(){
            const api=`https://vue-course-api.hexschool.io/api/yop/admin/products`;
            const vm=this;
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                console.log(response.data);
                vm.isLoading=false;
                vm.products=response.data.products;
            })
        },

    },
    // methods end
    created() {
        this.getProducts();
    },
    // created end
}
</script>