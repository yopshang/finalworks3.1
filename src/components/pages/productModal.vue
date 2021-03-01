<template>
<div>
    <!-- 全螢幕讀取效果 -->
    <loading :active.sync="isLoading" ></loading>--

    <el-drawer
        title="商品內容"
        :visible.sync="drawer"
        size="70%">
            <div>
                <el-row>
                    <el-col :span="24">
                        <el-card :body-style="{ padding: '15px' }">
                        <img :src="product.imageUrl" class="image">
                        <el-input v-model="product.title" placeholder="请输入商品名稱"></el-input>
                        <div class="img-url-input">
                            <el-input class="item" v-model="product.imageUrl" placeholder="请输入圖片網址"></el-input>
                            <el-input class="item" @change="uploadFile" type="file" v-model="product.imageUrl" placeholder="或上傳圖片"></el-input>
                            <el-input class="item" v-model="product.unit" placeholder="請輸入單位"></el-input>
                            <el-input class="item" v-model="product.origin_price" placeholder="請輸入原價"></el-input>
                            <el-input class="item" v-model="product.price" placeholder="請輸入售價"></el-input>
                            <el-input class="item" v-model="product.content" placeholder="請輸入產品說明內容"></el-input>
                            <el-input class="item" v-model="product.description" placeholder="請輸入產品描述"></el-input>
                            <el-select v-model="value" placeholder="請選擇類別">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="padding: 14px;">
                            <div class="bottom clearfix">
                                <el-button @click="updateProduct()" type="primary" style="margin-left: 16px;">
                                    確定
                                </el-button>
                                <el-button  @click="drawer = false" type="primary" style="margin-left: 16px;">
                                    取消
                                </el-button>
                            </div>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-drawer>

    <!-- Edit Modal end -->
</div>
</template>
<script>
import $ from 'jquery';
// import {mapGetters,mapActions} from 'vuex';

export default {
    name:'procuctsModal',
    data(){
        return {
            // element-ui-drawer
            // drawer: false,
            innerDrawer: false,
            products:[], // 從Vuex return
            // pagination:'', //從vuex return
            tempProduct:{},
            isNew:false,
            status:{
                fileUploading:false,
            },
            sort:"all",
            // product:{},
            options: [
                {
                    value: '保養品',
                    label: '保養品'
                },
                {
                    value: '玩具',
                    label: '玩具'
                },
                {
                    value: '外套',
                    label: '外套'
                },
                {
                    value: '鞋子',
                    label: '鞋子'
                },
                {
                    value: '其他',
                    label: '其他'
            }],
            value: '',
        }
    },
    props: [
        'drawer',
        'tempProduct',
        'product',
    ],
    components:{
    },
    methods: {
    },
    computed:{
    },
    created(){

    },
    mounted() {

    }
}
</script>