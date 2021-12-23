import Vue from "vue";
import Vue18n from "vue-i18n";

Vue.use(Vue18n);

const messages = {
  ko: {
    message: {
      menu_about: "about",
      menu_home: "Home",
      menu_title: "Dev Blog",
    },
  },
};

const i18n = new Vue18n({
  locale: "ko", // set locale
  messages, // set locale messages
});

export default i18n;
