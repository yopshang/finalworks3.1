<template>
    <div>
        <body class="text-center">
            <form class="form-signin" @submit.prevent="signin">
                <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input v-model="user.username" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                <label for="inputPassword" class="sr-only">Password</label>
                <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
            </form>
        </body>
        </div>
</template>
<script>
export default {
    name:'Login',
    data(){
        return{
            user: {
                username:'',
                password:'',
            },
        };
    },
    methods: {
        signin(){
            const api=`https://vue-course-api.hexschool.io/admin/signin`;
            const vm=this;
            this.$http.post(api,vm.user).then((response)=>{
                console.log(response.data);
                if (response.data.success){
                    vm.$router.push('/dashboard/products');
                }
            })
        },
        loginCheck(){
            const api=`https://vue-course-api.hexschool.io/api/user/check`;
            const vm= this;
            this.$http.post(api).then((response)=>{
                console.log(response.data);
                //驗證是否持續登入
                if (response.data.success){
                    vm.$router.push('/dashboard/products');
                }
            });    
        }
    },
    // methods結束
    created(){
        this.loginCheck();
    }
}
</script>
<style>
    .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    }

    @media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
    }

    html,
    body {
    height: 100%;
    }

    body {
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