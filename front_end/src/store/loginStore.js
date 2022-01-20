import VueCookies from 'vue-cookies';

export default {
  namespaced: true,
  state: {
    isLogin: VueCookies.isKey('ljw_auth')
  },

  mutations: {
    SET_TOKEN(state, token) {
      if (token !== '') {
        VueCookies.set('ljw_auth', token, 60 * 5);
      } else {
        VueCookies.remove('ljw_auth');
      }
      state.isLogin = VueCookies.isKey('ljw_auth');
    },
    CLEAR_TOKEN(state) {
      VueCookies.remove('ljw_auth');
      state.isLogin = VueCookies.isKey('ljw_auth');
    }
  },

  getters: {
    isLogin(state) {
      return state.isLogin;
    }
  }
};

/*
this.$store.state.userListStore.userList;
this.$store.commit('userListStore/ADD_NAME','Jaewon');
this.$store.dispatch("userListStore/getUserList",this.userUrl);
this.$store.getters['userListStore/getFilterName'];
*/
