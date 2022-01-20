<template>
  <div>
    <div>ref :{{ refTest.test }}</div>
    <div ref="testLabel">reactive : {{ reactiveTest.test }}</div>
    <div v-if="showTest">test!!!!!!!!!!!!!!!!!!!</div>
    <button @click="test()">click</button>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from '@vue/composition-api';
export default {
  setup() {
    let testLabel = ref(null);
    let refTest = ref({ test: 'refTest' });
    let reactiveTest = reactive({ test: '초기화' });

    let showTest = ref(true);

    let refTestF = () => {
      setTimeout(() => {
        refTest.value = { test: 'refTest 호출됨' };
      }, 2000);
    };

    function test() {
      showTest.value = !showTest.value;
    }

    let reactiveF = () => {
      setTimeout(() => {
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
      reactiveTest,
      showTest,
      test
    };
  }
};
</script>

<style></style>
