<template>
    <div>
            <!-- second nav -->
            <h2 class="secNav mb-15"> <span class="secNavtitle1">填寫資訊</span><span class="secNavtitle3"> ></span> 結帳<span class="secNavtitle3"> > 完成購物!</span></h2>
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
                    <div class="w-100">
                        <h2 class="informationTitle w-100 mb-15">商品資寄送資訊</h2>
                    </div>
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
                        <p  class="EmptyColorBtn w-50 p-15">
                            <router-link to="/product/shopping"></router-link>
                                < 還沒買夠，我想回到賣場! 
                        </p>
                        <button class="fullColorBtn w-50 p-15">
                            <router-link to="/product/myorder/myorder_info">
                                填寫完畢，結帳去!!
                            </router-link>
                        </button>
                    </div>
                  
                    </div>
                </div>
            </div>
            <!-- shopping address end -->
            <!-- left side end -->
</template>