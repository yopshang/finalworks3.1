<template>
    <div>
        <div class="my-5 row justify-content-center">
            <form class="col-md-6">
                <div class="form-group">
                    <label for="useremail">Email</label>
                    <input class="{'is-invalid':erros.has('name')} form-control" type="email" name="email" id="useremail"
                        v-model="form.user.email" placeholder="請輸入 Email" required> <!-- v-validate=" 'required' "-->
                    <span class="text-danger"></span>
                </div>
            
                <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <input type="text" class="form-control" name="name" id="username"
                        v-model="form.user.name" placeholder="輸入姓名">
                    <span class="text-danger"></span>
                </div>
            
                <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                </div>
            
                <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                        placeholder="請輸入地址">
                    <span class="text-danger">地址欄位不得留空</span>
                </div>
            
                <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                </div>
                <div class="text-right">
                   <button class="btn btn-danger">送出訂單</button>
                </div>
            </form>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isLoading:false,
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:'',
            },
        }
    },
    methods: {
        createOrder(){
            const vm=this;
            const url=`https://vue-course-api.hexschool.io/api/yop/order`
            const order=vm.form;
            vm.isLoading=true;
            this.$http.post(url,{data:order}).then((response)=>{
                console.log('訂單成立');
                vm.isLoading=false;
            })
            
        }
    },
}
</script>