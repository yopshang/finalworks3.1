<template>
<div class="mainContainer">
        <!--全螢幕讀取效果-->
        <div class="vld-parent">
            <loading :active.sync="isLoading" ></loading>    
        </div>
        <!--全螢幕讀取效果結束-->
        <Alert/>
        <!-- firstRow --><!--title-->
        <div class="topDiv  d-flex flex-wrap">
            <div class="topDivLeft  d-flex ai-center">
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
                            <input class="fullColorBtn p-15" type="button" value="Shop now"></input>
                        </router-link> 
                    </a>
                </div>
            </div>
            <div class="d-flex topDivright jc-flex-end" 
            :style="{ backgroundImage: 'url(' + require('@/assets/img/index-1new.jpg') + ')' }">
            </div>
        </div>
        <!-- firstRow end -->
        <!-- secondRow --><!--three img-->
        <div>
            <div class="d-flex flex-wrap mb-25 h-250">
                <div  class="secondRow" 
                :style="{ backgroundImage: 'url(' + require('@/assets/img/index-2new.jpg') + ')' }"></div>
                <div class="d-flex ai-center secondRow ai-center">
                    <section class="secRowsection">
                        <h2>Special Clays</h2>
                        <p>A general body formulation for contemporary earthenware is 25% kaolin, 25% ball clay, 35% quartz and 15% feldspar.</p>
                        <router-link to="">
                            <h3>learn more</h3>
                        </router-link>
                    </section>
                </div>
            </div>
            <div class="secFix h-250 secRowRwd">
                <div class="fixHere d-flex ai-center secondRow">
                    <section class="secRowsection">
                        <h2>Less is more</h2>
                        <p>Trimming pottery can transform a weighty Earth-bound pot into one that is a pleasure to hold, look at, and use.</p>
                        <router-link to="">
                            <h3>learn more</h3>
                        </router-link>
                    </section>
                </div>
                <div class="secondRow" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-3new.jpg') + ')' }"></div>
            </div>
            <div class="d-flex flex-wrap mb-25 h-250 secRowRwd">
                    <div class="secondRow m-rwd" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-4new.jpg') + ')' }"></div>
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
    <div class="d-flex thirdRow m-rwd thirdRowoutsideRwd" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-5new.jpg') + ')' }">
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

    <slick
        class="fourthRowinside"
        ref="slick"
        :options="slickOptions"
        @afterChange="handleAfterChange"
        @beforeChange="handleBeforeChange"
        @breakpoint="handleBreakpoint"
        @destroy="handleDestroy"
        @edge="handleEdge"
        @init="handleInit"
        @reInit="handleReInit"
        @setPosition="handleSetPosition"
        @swipe="handleSwipe"
        @lazyLoaded="handleLazyLoaded"
        @lazyLoadError="handleLazeLoadError">

            <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
            <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
            <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
            <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
            <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>

        </slick>
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


import $ from 'jquery';
import homenav from './homenav.vue';
import bottom from './bottom';
import productList from './productList';
import Alert from './AlertMessage';

import Slick from 'vue-slick'

export default {
    data(){
        return {
            isNew:false,
            status:{
                fileUploading:false,
            },
            slickOptions: {
                slidesToShow: 3,
                // Any other options that can be got from plugin documentation
            },
        }
    },
    // data end
    components:{
                homenav,
                bottom,
                productList,
                Alert,
                Slick,
    },
    methods:{
        next() {
            this.$refs.slick.next();
        },

        prev() {
            this.$refs.slick.prev();
        },

        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },

        // Events listeners
        handleAfterChange(event, slick, currentSlide) {
            console.log('handleAfterChange', event, slick, currentSlide);
        },
        handleBeforeChange(event, slick, currentSlide, nextSlide) {
            console.log('handleBeforeChange', event, slick, currentSlide, nextSlide);
        },
        handleBreakpoint(event, slick, breakpoint) {
            console.log('handleBreakpoint', event, slick, breakpoint);
        },
        handleDestroy(event, slick) {
            console.log('handleDestroy', event, slick);
        },
        handleEdge(event, slick, direction) {
            console.log('handleEdge', event, slick, direction);
        },
        handleInit(event, slick) {
            console.log('handleInit', event, slick);
        },
        handleReInit(event, slick) {
            console.log('handleReInit', event, slick);
        },
        handleSetPosition(event, slick) {
            console.log('handleSetPosition', event, slick);
        },
        handleSwipe(event, slick, direction) {
            console.log('handleSwipe', event, slick, direction);
        },
        handleLazyLoaded(event, slick, image, imageSource) {
            console.log('handleLazyLoaded', event, slick, image, imageSource);
        },
        handleLazeLoadError(event, slick, image, imageSource) {
            console.log('handleLazeLoadError', event, slick, image, imageSource);
        },
        getProducts(){
            const vm = this;
            // vm.$bus.$emit('message:push',"商品載入中 , 夏季優惠全面9折!",'danger');
            vm.$store.dispatch('getProducts');
            // vm.$bus.$emit('message:push',"載入完成 , 歡迎選購!",'success');
        },
        turnPage(currentPage){
            const vm = this;
            vm.$store.dispatch('turnPage',currentPage);
        },
    },
    // methods end
    computed:{
        isLoading(){
            return this.$store.state.isLoading;
        },
        products(){
            return this.$store.state.products;
        },        
    },
    // computed end
    created() {
        this.getProducts();
        this.turnPage("home");
    },
    // created end
}
</script>
<style lang="css">
    @import 'slick-carousel/slick/slick.css';
</style>