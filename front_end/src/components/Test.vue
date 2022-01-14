<template>
  <div>
    <div>ref :{{ refTest.test }}</div>
    <div ref="testLabel">reactive : {{ reactiveTest.test }}</div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from '@vue/composition-api';
export default {
  setup() {
    let testLabel = ref(null);
    let refTest = ref({ test: 'refTest' });
    let reactiveTest = reactive({ test: '초기화' });

    let refTestF = () => {
      setTimeout(() => {
        console.log('dddddddddd');
        refTest.value = { test: 'refTest 호출됨' };
      }, 2000);
    };

    let reactiveF = () => {
      setTimeout(() => {
        console.log('dddddddddd');
        reactiveTest.test = 'sss';
      }, 2000);
    };

    onMounted(() => {
      refTestF();
      reactiveF();
      console.log('testLabel', testLabel.value);
    });

    return {
      refTest,
      reactiveTest
    };
  }
};
</script>

<style></style>
