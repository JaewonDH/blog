export const CommonMixin = {
  data() {
    return {
      HOST_ADD: 'http://localhost:3333/'
    };
  },
  methods: {
    showToastError(message, time) {
      this.showToast(message, 'error', time);
    },
    showToastWarning(message, time) {
      this.showToast(message, 'warning', time);
    },
    showToastSuccess(message, time) {
      this.showToast(message, 'success', time);
    },
    showToastInformation(message, time) {
      this.showToast(message, 'information', time);
    },
    showToast(message, type, time = 2000) {
      let toastData = {
        message,
        type,
        time
      };
      this.$store.commit('SHOW_TOAST', toastData);
    },
    goToBlogList() {
      this.$router.push({
        name: 'BlogList'
      });
    },
    setStoreWriteInfo(editMode, id) {
      this.$store.commit('SET_WRITE_INFO', {
        editMode,
        id
      });
    }
  }
};
