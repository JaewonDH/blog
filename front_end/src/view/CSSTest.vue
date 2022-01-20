<template>
  <div class="container">
    <div class="css-container">
      <div class="static ">static</div>
      <div class="relative">relative</div>
      <div class="absolute">absolute</div>
      <div class="fixed">fixed</div>
    </div>
  </div>
</template>
<style>
.container {
  font-size: 30px;
}
.css-container {
  margin: 30px;
  position: relative;
}
.container div {
  background-color: red;
  border: 2px solid rgb(0, 0, 0);
  color: white;
}
.css-container div {
  margin: 20px;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
}
</style>
