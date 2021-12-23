import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        toastData:{
            message:'',
            type:0,
            time:0
        }
    },
    // 동기적 로직 setter로 생각하면됨
    mutations:{
        SHOW_TOAST(state,toastData){
            state.toastData=toastData;
       }
    },
    // 비동기 로직 추가 시간이 오래 걸리는 작업(서버데이터 받기 , 타이머 등)
    actions:{
      
    },
    // 다른 컴포넌트에서 store.getters.getcounter 나 ...mapGetters 로 접근 가능   
    getters:{

    }
});