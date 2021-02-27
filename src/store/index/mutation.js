export GETPRODUCTS = ()=>{
    PRODUCTS(state, status){
        state.products = status;
    },
    PAGINATION(state, status){
        state.pagination = status;
    },
}