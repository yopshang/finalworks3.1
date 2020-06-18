<template>
  <div id="app">
    <homenav/>
    <router-view/>
  </div>
</template>

<script>
import homenav from '@/components/pages/homenav.vue';
export default {
  name: 'App',
  components:{
    homenav
  }
}
</script>

<style lang="scss">
@import "./assets/all";
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap');

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

  // margin-top: 60px;
  background-color:	#E0E0E0;
}
</style>
