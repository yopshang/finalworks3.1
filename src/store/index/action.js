export const action = ()=>{
    getProducts(context,page=1){
        const api=`https://vue-course-api.hexschool.io/api/yop/products?page=${page}`;
        const vm=this;
        context.commit('LOADING',true);
        axios.get(api).then((response)=>{
            console.log(response.data);
            context.commit('LOADING',false);
            context.commit('PRODUCTS', response.data.products);
            context.commit('PAGINATION', response.data.pagination);
        }).catch(()=>{
            this.$bus.$emit('message:push',"連線錯誤,請重新嘗試",'danger');
            setTimeout(() => {
                context.dispatch('reload');
            }, 1000);
        })
    },
    
}