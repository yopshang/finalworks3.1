<template>
<div>
    <div class="mainContainer">
        <!-- bottomRow -->
        <div class="bottomRow d-flex jc-flex-start ai-center" 
        :style="{ backgroundImage: 'url(' + require('@/assets/img/footernew.jpg') + ')' }">
            <div class="bottomDiv ai-center">
                <h2 class="">Subscribe for news and special offers!</h2>
                <form class="d-flex jc-center formRwd w-100">
                    <input class="emailInput p-15 " type="text" placeholder="Your email address">
                    <input class="inputBtn p-15" type="button" value="Subscribe">
                </form>
            </div>
        </div>
        <!-- bottomRow end -->
        <!-- footerRow -->
        <div class="footerRow">
            <div class="d-flex ai-center">
                <h2 clasㄘs="mr-15">CRAFTsMAN</h2>
                <p class="mr-15">© 2020. All Rights Reserved.</p>
            </div>
            <ul class="d-flex">
                <router-link to="">
                    <li class="li mr-15">
                            Purchase Policy
                    </li>
                </router-link>
                <router-link to="">
                    <li class="li mr-15">
                        Privacy Policy
                    </li>
                </router-link>
                <router-link to="">
                    <li class="li mr-15">
                        Terms & Conditions
                    </li>
                </router-link>
            </ul>
        </div>
        <!-- footerRow end -->        
    </div>
</div>
</template>