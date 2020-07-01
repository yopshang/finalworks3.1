<template>
    <div class="d-flex">
        <li class="sign addMiuns w-25 p-15 " @click="minus(product.num)">-</li>
        <input disabled class="numArea border w-25 p-15" type="number" value="" v-model="product.num">
        <li class="sign addMiuns w-25 p-15" @click="add">+</li>        
    </div>
</template>
<style lang="scss" scope>
    .border{
        border: solid;
    }
    .addMiuns:hover{
        color: #0E8A00;
    }
</style>
<script>
export default {
    data(){
        return {
            product:{
                num : 1 
            }
        }
    },
    methods:{
        add(){
            const vm=this;
            vm.product.num++;
        }, 
        minus(num){
            const vm=this;
            if(num<=1){
                vm.product.num=1;
            }else{
                vm.product.num--;
            }
        },          
    }
}
</script>