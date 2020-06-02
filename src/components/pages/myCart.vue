<template>
    <div>
    <!-- navbar end     -->
    <div class="d-flex mt-30 jc-space-between">
        <!-- left side -->
        <div class="left w-50">
            <!-- second nav -->
            <h2 class="secNav"> <span class="secNavtitle1">Cart</span><span class="secNavtitle3"> ></span> Information<span class="secNavtitle3"> > Payment</span></h2>
            <!-- second nav end -->
            <!-- contact information -->
            <div>
                <h2></h2>
                <input class="p-15 w-100" type="text" placeholder="Email">
                <div class="d-flex ai-center">
                    <input class="inputEmail p-15" type="checkbox">
                    <p class="gray p-15 mb-0">Keep me up to date on news and special offers</p>
                </div>
            </div>
            <!-- contact information end -->
            <!-- shopping address -->
            <div>
                <div class="row">
                    <h2 class="col-lg-12">Shipping address</h2>
                    <h3 class="informationTitle col-lg-12">Information</h3>
                    <div class="d-flex col-lg-12 jc-space-between ">
                        <input class="p-15 col-lg-6 m-8" type="text" placeholder="Name">
                        <input class="p-15 col-lg-6 m-8" placeholder="Phone" type="text">
                    </div>
                    <div class="d-flex col-lg-12 ">
                        <select class="p-15 col-lg-6 m-8" name="" id="">
                            <option class="option" value="" disabled selected>Country/Region</option>
                        </select>
                        <select class="p-15 col-lg-6 m-8" name="" id="">
                            <option class="option" value=""  disabled selected>City</option>
                        </select>
                    </div>
                    <input class=" ml-16 w-100 p-15 col-lg-12" placeholder="Address" type="text">
                    <div class="m-8 row col-lg-12 jc-space-between">
                        <p  class="mainColor col-lg-6">
                            <a href="/detail.html">
                                < Return to information 
                            </a>
                        </p>
                        <button class="payMent col-lg-6">Continue to payment</button>
                    </div>
                    <!-- <hr> -->
                    <div class="w-100 p-15 row">
                        <hr class="w-100 jc-center">
                        <p class="p-15 option">Purchase Policy</p>
                            <p class="p-15 option">Privacy Policy</p>
                            <p class="p-15 option">Terms & Conditions</p>
                        </div>
                    </div>
                </div>
            <!-- shopping address end -->
            </div>
            <!-- left side end -->
        <div class="d-flex right w-40">
            <div class="col-lg-12">
                <!-- procuct area -->
                <div class="row mb-2 procuctArea">
                    <img class="col-lg-3" src="/img/img-1.jpg" alt="">
                    <section class="col-lg-5">Tatami Cup ×1</section>
                    <section class="col-lg-4">NT$1,080</section>
                </div>
                <div class="row">
                    <img class="col-lg-3" src="/img/img-1.jpg" alt="">
                    <section class="col-lg-5">Baifan Bowl ×2</section>
                    <section class="col-lg-4">NT$3,600</section>
                </div>
                <!-- product area end -->
                <hr>
                <!-- counting area -->
                <div class="d-flex jc-space-between mb-2">
                    <section>Subtotal</section>
                    <section>NT$4,680</section>
                </div>
                <div class="d-flex jc-space-between mb-2">
                    <section>Shipping</section>
                    <section>NT$80</section>
                </div>
                <hr>
                <div class="d-flex jc-space-between mb-2">
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