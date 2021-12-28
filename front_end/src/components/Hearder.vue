<template>
  <div id="main_container">
    <nav>
      <div id="nav_log" @click="goToBlogList()">
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
      <ul id="nav_link" v-if="navEnable">
        <li>★</li>
        <li>☆</li>
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
import { CommonMixin } from '@/mixins/CommonMixin.js';
export default {
  mixins: [CommonMixin],
  data() {
    return {
      menuDataArray: [
        { title: '목록', path: '/' },
        { title: '새 글 작성', path: '/BlogWrite' }
      ],
      navEnable: true
    };
  },

  mounted() {
    window.addEventListener('resize', this.windowResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize);
  },

  methods: {
    gotoRouterMenu(value) {
      console.log(value);
      if (value == '/BlogWrite') {
        this.setStoreWriteInfo(false, 0);
      }

      if (this.$router.history.current.path != value) {
        this.$router.push({ path: value });
      }
    },

    onMenu() {
      console.log('onMenu');
      this.navEnable = !this.navEnable;
    },

    windowResize() {
      this.navEnable = window.innerWidth >= 600 ? true : false;
    }
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
