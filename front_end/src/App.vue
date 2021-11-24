<template>
  <div id="app">    
    <Hearder></Hearder>  
    <router-view></router-view>
  </div>
</template>

<script>
import Hearder from './components/Hearder.vue'
export default {
  name: 'App',
  components: {
    Hearder
  }
}
</script>

<style>
body{
  margin: 0px; 
}
</style>
