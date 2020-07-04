<template>
  <div class="message-alert">
    <div v-if="item.message !== ''" class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>
<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
<script>
export default {
    name:'Alert',
    data(){
        return{
            messages:[{
                message:'',
                status:'', //追隨bs4 樣式
                timestamp:''
            }],
        }
    },
    methods: {       
        updateMessage(message, status){
            const timestamp = Math.floor(new Date()/1000);  
            const vm = this;
            vm.messages.push({
                message,
                status,
                timestamp
            });
            // console.log('成功更新訊息',vm.messages);
            this.removeMessageWithTiming(timestamp);  //呼叫自動關閉
        },
        removeMessage(num){  //關閉警告視窗
            this.messages.splice(num,1);
            // console.log('成功移除');
        },
        removeMessageWithTiming(timestamp){  // 自動關閉
            const vm = this;
            setTimeout(() =>{
                vm.messages.forEach((item,i)=>{
                    if(item.timestamp === timestamp){
                        vm.messages.splice(i,1);
                    }
                })   
            },5000);
        }
    },
    created(){
        const vm = this;
        vm.$bus.$on('message:push', (message, status = 'warning') => {
            vm.updateMessage(message, status);
        });
    }
}
</script>