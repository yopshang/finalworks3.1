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
                        <el-card :body-style="{ padding: '10px' }">
                        <img :src="product.imageUrl" class="image">
                        <div class="content" style="padding: 14px;">
                            <span class="product-item">商品名稱: {{product.title}}</span>
                            <span class="product-item">商品原價: {{product.origin_price}}</span>
                            <span class="product-item">商品售價: {{product.price}}</span>
                            <span class="product-item">商品描述: {{product.description}}</span>
                            <span class="product-item">商品內容: {{product.content}}</span>
                            <span class="product-item">商品類別: {{product.category}}</span>

                            <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                                <el-button @click="updateProduct()" type="primary" style="margin-left: 16px;">
                                    加入購物車
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
<style lang="scss" scope>
    .content{
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        padding: 10px;
    }
    .product-item {
        margin: 5px 0;
    }
</style>
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