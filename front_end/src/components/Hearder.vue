<template>
  <div id="main_container">
    <nav>
      <div id="nav_log" @click="goHome()">
        블로그
      </div>
      <ul id="nav_menu" v-if="navEnable">
        <li
          class="menu_item"
          v-for="(item, index) in menuDataArray"
          :key="index"
          @click="gotoRouterMenu(item.path)"
        >
          {{ item.title }}
        </li>
      </ul>
      <ul id="nav_menu" v-if="navEnable">
        <li class="menu_item" @click="onSign()" v-if="!isLogin">★ Sign</li>
        <li class="menu_item" @click="onLogOut()" v-if="isLogin">
          ☆ LogOut
        </li>
        <li class="menu_item" @click="onLogin()" v-else>☆ Login</li>
      </ul>
      <a href="#" class="menu-a"
        ><img @click="onMenu()" class="menu-img" src="../assets/menu-icon.png"
      /></a>
    </nav>
    <div class="header_block">
      <!-- <img src="../assets/header_logo.jpg"> -->
      <h1 class="header_block_title">개발 블로그</h1>
    </div>
  </div>
</template>

<script>
import {
  onMounted,
  ref,
  onBeforeUnmount,
  getCurrentInstance,
  computed
  //  computed
} from '@vue/composition-api';
import Common from '@/composition/CommonUtile';
import LoginApi from '@/api/loginApi';
export default {
  setup() {
    let {
      getRouter,
      setStoreWriteInfo,
      showToastError,
      getStore,
      getRoute
    } = Common(getCurrentInstance());

    let showLogInPopup = ref(false);

    let api = new LoginApi();

    let menuDataArray = ref([
      { title: '목록', path: '/' },
      { title: '새 글 작성', path: '/BlogWrite' },
      { title: 'test', path: '/Test' }
    ]);

    let navEnable = ref(true);

    let isLogin = computed(() => {
      //return getStore().state.isLogin;
      //return getStore().getters.state.LoginStore.isLogin;
      return getStore().getters['LoginStore/isLogin'];
    });

    let gotoRouterMenu = value => {
      console.log(value);
      if (value == '/BlogWrite') {
        setStoreWriteInfo(false, 0);
      }

      if (getRouter().history.current.path != value) {
        getRouter()
          .push({ path: value })
          .catch(() => {});
      }
    };

    let onMenu = () => {
      console.log('onMenu');
      navEnable = !navEnable;
    };

    let windowResize = () => {
      navEnable = window.innerWidth >= 600 ? true : false;
    };

    onMounted(() => {
      window.addEventListener('resize', windowResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', windowResize);
    });

    function onSign() {
      console.log('onSign');
      showLogInPopup.value = true;
    }

    async function onLogin() {
      const bodyForm = new FormData();
      bodyForm.append('email', 'aaa@a.com');
      bodyForm.append('password', 'aaaa');

      try {
        let response = await api.login(bodyForm);
        //getStore().commit('SET_TOKEN', response.data.token);
        getStore().commit('LoginStore/SET_TOKEN', response.data.token);
      } catch (error) {
        //getStore().commit('CLEAR_TOKEN');
        getStore().commit('LoginStore/CLEAR_TOKEN');
        showToastError(error);
      }
    }

    function onLogOut() {
      getStore().commit('LoginStore/CLEAR_TOKEN');
      moveToBoardList();
    }

    let moveToBoardList = () => {
      console.log('getRouter', getRouter());
      if (getRoute().name.match('BlogWrite')) {
        goHome();
      }
    };

    function goHome() {
      getRouter()
        .push('/')
        .catch(() => {});
    }

    return {
      menuDataArray,
      navEnable,
      showLogInPopup,
      isLogin,
      onMenu,
      gotoRouterMenu,
      onSign,
      onLogin,
      onLogOut,
      goHome
    };
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(44, 62, 80);
  padding: 0 6px 0 10px;
}

#nav_log {
  font-size: 25px;
  cursor: pointer;
}
.menu_item {
  cursor: pointer;
}

ul {
  display: flex;
  list-style: none;
  padding: 0px;
}

#nav_menu li:hover {
  background-color: rgb(26, 188, 156);
  border-radius: 4px;
}

#nav_menu li {
  padding: 2px 12px;
  font-weight: bolder;
}

#nav_link li {
  padding: 0px 5px 0px 5px;
}

.header_block {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(26, 188, 156);
}

.header_block_title {
  margin: 0px;
  padding: 4px;
}

#main_container {
  color: white;
}

.menu-img {
  width: 30px;
  height: 30px;
}

@media screen and (min-width: 600px) {
  .menu-a {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .header_block {
    display: none;
  }

  #nav_log {
    padding: 5px;
  }
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  #nav_menu {
    flex-direction: column;
    width: 100%;
    text-align: center;
    margin: 5px 0 5px 0;
  }

  #nav_link {
    width: 100%;
    justify-content: center;
    margin: 5px 0 5px 0;
  }

  .menu-a {
    position: absolute;
    top: 6px;
    right: 10px;
  }
}
</style>
