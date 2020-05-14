<template>
    <div>
        <div>
            登入成功
            <a href="#" @click.prevent="signout">登出</a>
        </div>
        
    </div>
</template>
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