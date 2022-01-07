<template>
  <div>
    <div>{{ user.name }}</div>
    <!-- //<div v-for="(item, index) in user" :key="index">{{ item }}</div> -->
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/composition-api';
//import Calculator from '../composition/Calculator';
export default {
  setup() {
    let user = ref({ name: '초기화' });

    let test = () => {
      setTimeout(() => {
        console.log('dddddddddd');
        user.value = { name: 'dfsfsdsdfs' };
      }, 2000);
    };

    onMounted(() => {
      test();
    });

    return {
      user
    };
  }
};
</script>

<style></style>
