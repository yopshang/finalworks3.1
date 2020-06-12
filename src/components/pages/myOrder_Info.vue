<template>
    <div>
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>            
    <!-- navbar end     -->
    <div class="d-flex mt-30 jc-space-between flex-wrap">
        <!-- left side -->
        <div class="left">
            <!-- second nav -->
            <h2 class="secNav mb-15"> <span class="secNavtitle3">填寫資訊</span><span class="secNavtitle1"> ></span> 結帳<span class=""> > 完成購物!</span></h2>
            <!-- second nav end -->
            <!-- contact information -->
            <div>
                <h2></h2>
                <input class="p-15 w-100" type="text" placeholder="Email">
                <div class="d-flex ai-center">
                    <input class="inputEmail p-15" type="checkbox">
                    <p class="gray p-15 mb-0">我想收到最新優惠消息</p>
                </div>
            </div>
            <!-- contact information end -->
            <!-- shopping address -->
            <div>
                <div class="d-flex flex-wrap">
                    <h2 class="w-100">商品資寄送資訊</h2>
                    <h3 class="informationTitle w-100 mb-15">Information</h3>
                    <div class="d-flex w-100 jc-space-between mb-15">
                        <input class="p-15 w-40 mr-15" type="text" placeholder="Name">
                        <input class="p-15 w-40" placeholder="Phone" type="text">
                    </div>
                    <div class="d-flex w-100 mb-15">
                        <select class="p-15 w-50 mr-15" name="" id="">
                            <option class="option" value="" disabled selected>Country/Region</option>
                        </select>
                        <select class="p-15 w-50" name="" id="">
                            <option class="option" value=""  disabled selected>City</option>
                        </select>
                    </div>
                    <input class="w-100 p-15 mb-15" placeholder="Address" type="text">
                    <div class="d-flex mb-30 w-100 jc-space-between">
                        <p  class="mainColor w-50 p-15">
                            <router-link to="/product/myorder">
                                < Return to information 
                            </router-link>
                        </p>
                        <button class="fullColorBtn w-50 p-15">Continue to payment</button>
                    </div>
                  
                    </div>
                </div>
            </div>
            <!-- shopping address end -->
            <!-- left side end -->
        <div class="d-flex right">
            <div class="w-100">
                <!-- procuct area -->
                <div class="d-flex mb-15 procuctArea ai-center">
                    <img class="checkOutAreaImg w-25" src="/img/img-1.jpg" alt="">
                    <section class="w-40">Tatami Cup ×1</section>
                    <section class="w-35">NT$1,080</section>
                </div>
                <div class="d-flex procuctArea ai-center">
                    <img class="checkOutAreaImg w-25" src="/img/img-1.jpg" alt="">
                    <section class="w-40">Baifan Bowl ×2</section>
                    <section class="w-35">NT$3,600</section>
                </div>
                <!-- product area end -->
                <hr>
                <!-- counting area -->
                <div class="d-flex jc-space-between mb-15">
                    <section>Subtotal</section>
                    <section>NT$4,680</section>
                </div>
                <div class="d-flex jc-space-between mb-15">
                    <section>Shipping</section>
                    <section>NT$80</section>
                </div>
                <hr>
                <div class="d-flex jc-space-between mb-15">
                    <section>Total</section>
                    <section>NT$4,760</section>
                </div>
                <!-- countiing area -->
                <!-- counting total end -->
            </div>
        </div>
    </div>        
    </div>
</template>