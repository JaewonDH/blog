<template>
  <div id="app">
    <ToastMessage />
    <Hearder></Hearder>
    <router-view></router-view>
  </div>
</template>

<script>
import Hearder from '@/components/Hearder.vue'
import ToastMessage from '@/components/ToastMessage'
export default {
  name: 'App',
  components: {
    Hearder,
    ToastMessage
  }
}
</script>

<style>
body {
  margin: 0px;
}

body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
p,
span input {
  font-family: 'Gowun Dodum', sans-serif;
}
</style>
