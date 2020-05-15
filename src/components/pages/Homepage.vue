<template>
    <div>
        <div>
            登入成功
            <router-link to="/login">登入</router-link>
            <a href="#" @click.prevent="signout">登出</a>
        </div>
        <!--navbar-->
            <div class="  nav container m0 flex-jcsb">
                <p><i class="fas fa-eye-slash"></i>Shop Buy</p>
                <ul class="container">
                    <li class="navLi">| 我的賣場 |</li>
                    <li class="navLi">| 購物去 |</li>
                    <li class="navLi">| 我的購物車 |</li>
                </ul>
            </div>
        <!--navbar結束-->
        </div>
    </div>
</template>
<style lang="scss">
    .m0{
        margin:0 auto;
    }
    .container {
        display: flex;
    }
    .colorWhite{
        color:#000;
    }
    .flex-jcsb{
        justify-content:space-between;
    }
    .nav{
        max-width:1200px;
        background-color:#aa0601;
    }
    .navLi{
        list-style:none;
    }
</style>
<script>
export default {
    name:'Logout',
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