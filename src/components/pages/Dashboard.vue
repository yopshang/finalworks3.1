<template>
    <div>
        <homenav/>
        <!-- <Navbar/> -->
        <!-- <Sidebar/> -->
        <Alert/>
            <div class="container-fluid">
                <div class="row">
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-12 px-4">
                        <router-view>
                            <!--這邊放內容-->
                        </router-view>
                    </main>
                </div>
            </div>
    </div>
</template>
<script>
import Sidebar from './Sidebar.vue';
import Navbar from './Navbar.vue';
import Alert from './AlertMessage.vue';
import homenav from './homenav.vue';
export default {
    components: {
        Sidebar,
        Navbar,
        Alert,
        homenav
    }
}

</script>