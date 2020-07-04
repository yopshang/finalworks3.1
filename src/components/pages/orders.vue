<template>
    <div>
        <!-- second nav -->
            <div>
                <div class="d-flex flex-wrap">
                    <div class="w-100">
                        <h2 class="informationTitle w-100 mb-15">我的訂單</h2>
                    </div>
                    <hr>
                    <div class="d-flex w-100 jc-space-between mb-15">
                        <input class="p-15 w-50 mr-15" type="text" placeholder="Name">
                        <input class="p-15 w-50" placeholder="Phone" type="text">
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
                            <router-link to="/myorder/myorder_info">
                                填寫完畢，結帳去!!
                            </router-link>
                        </button>
                    </div>
                  
                    </div>
                </div>
                <bottom/>
    </div>
</template>
<script>
import bottom from './bottom'
export default {
    data(){

    },
    components:{
        bottom
    },
    methods:{
        turnPage(currentPage){
            const vm = this;
            vm.$store.dispatch('turnPage',currentPage);
        },
    },
    created(){
        this.turnPage("orders");        
    }
}
</script>