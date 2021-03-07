<template>
    <div class="text-center loginPage">
    <Alert/>
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>                
            <!-- <div class="w-60" :style="{ backgroundImage: 'url(' + require('@/assets/img/index-5.jpg') + ')' }">  
            </div> -->
            <form class="form-signin w-40" @submit.prevent="signin">
                <!-- <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"> -->
                <i class="far fa-user-circle"></i>
                <h1 class="h3 mb-3 font-weight-normal">歡迎來到會員中心，請登入!</h1>
                <div class="mb-25">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input v-model="user.username" type="email" id="inputEmail" class="form-control" placeholder="請輸入帳號" required autofocus>
                </div>
                <div>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="請輸入密碼" required>
                </div>
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> 記住我!
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
                <!-- <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p> -->
            </form>
        </div>
</template>
<script>
import Alert from './AlertMessage';
import {mapGetters,mapActions} from 'vuex';
import $ from 'jquery';
export default {
    name:'Login',
    data(){
        return{
            user: {
                username:'',
                password:'',
            },
            message : ''
        };
    },
    components:{
        Alert
    },
    methods: {
        signin(){
            const api=`https://vue-course-api.hexschool.io/admin/signin`;
            const vm=this;
            this.$http.post(api,vm.user).then((response)=>{
                // console.log(response.data);
                vm.$store.dispatch('updateLoading',true);
                if (response.data.success){
                    vm.$bus.$emit('message:push',response.data.message+', 歡迎您!','success');
                    setTimeout(() => {
                        vm.$router.push('/product/productlist');
                        vm.$store.dispatch('updateLoading',false);                    
                    }, 2000);
                }else{
                    vm.$bus.$emit('message:push',response.data.message+", 請重新嘗試",'danger');
                    vm.user.username = '';
                    vm.user.password = '';
                    vm.$store.dispatch('updateLoading',false);
                }
            })
        },
        brforeRouterEnter(to, from, next) {
            const api=`https://vue-course-api.hexschool.io/api/user/check`;
            const vm= this;
            this.$http.post(api).then((response)=>{
                console.log(response.data);
                // 驗證是否持續登入
                if (response.data.success){
                    vm.$bus.$emit('message:push','您已登入,歡迎進入會員中心!','success');
                    setTimeout(() => {
                        vm.$router.push('product/productlist');
                    }, 1500);
                }else{
                    vm.$bus.$emit('message:push','您尚未登入,歡迎登入以使用更多功能!','danger');
                }
            });    
        },
        turnPage(currentPage){
            const vm = this;
            vm.$store.dispatch('turnPage',currentPage);
        }         
    },
    // methods結束
    computed:{
        ...mapGetters(['isLoading'])
    },
    created(){
        this.turnPage("login");          
        this.brforeRouterEnter();
    }
}
</script>
<style scoped>
    .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }
    .fa-user-circle {
        margin-bottom: 20px;
    }

    @media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
    }
    .loginPage {
        height: calc(100vh - 78px);
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        justify-content:center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }
    .form-signin .checkbox {
        font-weight: 400;
    }
    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>