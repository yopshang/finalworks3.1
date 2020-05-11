<template>
    <div>
        <Navbar/>
        <Alert/>
            <div class="container-fluid">
                <div class="row">
                    <Sidebar/>
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
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
export default {
    components: {
        Sidebar,
        Navbar,
        Alert
    }
}

</script>