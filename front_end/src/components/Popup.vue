<template>
  <div class="popup-container" v-if="showPoup">
    <div class="popup-content">
      <div class="popup-header">
        <div class="title">{{ title }}</div>
        <div class="close-icon" @click="closePopup()">
          <div class="material-icons type_size">close</div>
        </div>
      </div>
      <div class="popup-body">
        <div class="body-content">{{ bodyContent }}</div>
        <div class="button-container">
          <div class="button" @click="onConfirmButton()">확인</div>
          <div class="button" @click="onCancelButton()">취소</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPoup: Boolean,
    title: String,
    bodyContent: String
  },
  setup(props, context) {
    console.log('props.showPoup', props.showPoup);
    console.log('props.title', props.title);
    console.log('props.bodyContent', props.bodyContent);

    let closePopup = () => {
      context.emit('update:showPoup', false);
    };

    let onConfirmButton = () => {
      closePopup();
      context.emit('onButtonEvnet', true);
    };
    let onCancelButton = () => {
      closePopup();
      context.emit('onButtonEvnet', false);
    };

    return {
      closePopup,
      onConfirmButton,
      onCancelButton
    };
  }
};
</script>

<style lang="scss">
.popup-container {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);

  .popup-content {
    border-radius: 4px;
    background-color: white;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-top: -112px;
    margin-left: -225px;
    width: 450px;
    box-shadow: 0 2px 4px 0 rgba(black, 0.5px);

    .popup-header {
      background-color: rgb(26, 188, 156);
      border-radius: 4px 4px 0 0;
      border-bottom: 2px solid rgb(70, 70, 70);
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      .title {
        font-size: 26px;
        font-weight: bold;
        color: rgb(231, 231, 231);
        padding: 17px;
        margin-bottom: 6px;
      }
      .close-icon {
        width: 30px;
        margin-top: 9px;
        margin-right: 5px;
        cursor: pointer;
        color: rgb(49, 49, 49);
        &:hover {
          color: rgb(0, 0, 0);
        }
      }
    }

    .popup-body {
      display: flex;
      flex-direction: column;
      .body-content {
        padding: 20px;
        font-size: 20px;
      }
      .button-container {
        display: flex;
        justify-content: center;
        .button {
          display: inline-block;
          padding: 10px;
          margin: 10px;
          color: white;
          background-color: rgb(26, 188, 156);
          border-radius: 4px;
          cursor: pointer;
          box-shadow: 2px 2px 5px #999;
          &:hover {
            background-color: rgb(5, 158, 128);
          }
        }
      }
    }
  }
}
</style>
