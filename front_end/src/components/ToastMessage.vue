<template>
  <div class="toast_container" :class="toastType" v-if="showToast">
    <div class="close_icon" @click="closeToast">
      <span class="material-icons">close</span>
    </div>
    <div class="toast_item_container">
      <div class="type_icons">
        <span class="material-icons type_size">{{ getIcone() }}</span>
      </div>
      <div class="content" v-html="message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      showToast: false,
      toastType: "information",
      message: "테스트 입니다 안녕하세요 확인 해주세요 <br> 특히 제목을 입력해야 합니다.",
      TOAST_TYPE_ERROR: "error",
      TOAST_TYPE_WARNING: "warning",
      TOAST_TYPE_SUCCESS: "success",
      TOAST_TYPE_INFOMATION: "information",
      timeOutID: undefined,
    };
  },
  watch: {
    "$store.state.toastData"() {
      if (this.showToast) {
        clearTimeout(this.timeOutID);
      }
      this.toastType = this.$store.state.toastData.type;
      this.message = this.$store.state.toastData.message;
      this.showToast = true;

      this.timeOutID = setTimeout(() => {
        this.showToast = false;
      }, this.$store.state.toastData.time);
    },
  },
  methods: {
    closeToast() {
      this.showToast = false;
    },
    getIcone() {
      switch (this.toastType) {
        case this.TOAST_TYPE_INFOMATION:
          return "error_outline";
        case this.TOAST_TYPE_WARNING:
          return "warning_amber";
        case this.TOAST_TYPE_SUCCESS:
          return "done";
        case this.TOAST_TYPE_ERROR:
          return "cancel";
      }
    },
  },
};
</script>

<style lang="scss">
.error {
  background-color: rgb(255, 51, 51);
}
.warning {
  background-color: rgb(255, 134, 28);
}
.success {
  background-color: rgb(67, 177, 45);
}

.information {
  background-color: rgb(61, 98, 199);
}

.toast_container {
  position: fixed;
  min-width: 300px;
  max-width: 700px;
  right: 27px;
  top: 65px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(black, 0.5px);
  color: white;

  .toast_item_container {
    display: flex;
    flex-direction: row;
    padding: 5px;
    margin-top: 22px;
    .type_size {
      font-size: 50px;
      margin-right: 2px;
      padding: 5px;
    }
    .content {
      font-size: 20px;
      margin-top: 5px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .close_icon {
    position: absolute;
    right: 0;
    top: 3px;
    cursor: pointer;
    color: rgb(236, 236, 236);
    &:hover {
      color: rgb(255, 255, 255);
    }
  }
}
</style>
