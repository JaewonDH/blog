<template>
  <div class="write_container">
    <div class="input_container">
      <div class="input_box">
        <span class="input_label">제목:</span>
        <input
          type="text"
          v-model="input.title"
          placeholder="제목을 입력하세요"
        />
      </div>
      <div class="input_box">
        <span class="input_label">TAG:</span>
        <input
          type="text"
          v-model="input.tag"
          placeholder="태그를 입력하세요"
        />
      </div>
      <div id="editor" class="toastUIEditor"></div>
      <div class="button-container">
        <div class="reg_button" @click="onBack()">취소</div>
        <div class="reg_button" @click="onRegister()">
          {{ getRegAndModifyButtonStr }}
        </div>
      </div>
    </div>
    <Popup
      :showPoup.sync="popup.showPoup"
      :title="popup.title"
      :bodyContent="popup.content"
      @onButtonEvnet="onButtonEvnet"
    />
  </div>
</template>

<script>
import axios from 'axios'; // import 후 사용  vue 기반
import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css'; // codemirror style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor style
import fontSizePicker from 'tui-font-size-picker';
import Popup from '@/components/Popup';
import Common from '../composition/CommonUtile';
import {
  getCurrentInstance,
  onMounted,
  ref,
  computed
} from '@vue/composition-api';
export default {
  components: {
    Popup
  },
  setup() {
    let {
      getStore,
      getRouter,
      getHost,
      showToastError,
      showToastWarning,
      showToastSuccess,
      goToBlogList
    } = Common(getCurrentInstance());

    let isEditMode = ref(false);
    let markDownData = ref('');
    let input = ref({
      title: '',
      text: '',
      tag: ''
    });
    let toastUiEditor = ref({});
    let toastUiViewer = ref({});
    let popup = ref({
      showPoup: false,
      title: '뒤로가기',
      content: '등록 중인 글을 무시하고 이전 페이지로 갈까요?'
    });

    let getInput = () => {
      return input.value;
    };

    let getRegAndModifyButtonStr = computed(() => {
      return isEditMode ? '수정' : '등록';
    });

    onMounted(() => {
      if (isEditMode) {
        getBoardInfo(getStore().state.writeInfo.id);
      } else {
        initToastUiEditor();
      }
    });

    let initToastUiEditor = () => {
      console.log('markDownData.vlaue', markDownData.vlaue);
      toastUiEditor.value = new Editor({
        el: document.querySelector('#editor'),
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
        height: '580px',
        language: 'ko',
        plugins: [fontSizePicker],
        initialValue: markDownData.value
      });
    };

    let onRegister = () => {
      if (getInput().title == '') {
        showToastWarning('제목을 입력해 주세요');
        return;
      }

      if (getInput().tag == '') {
        showToastWarning('태그를 입력해 주세요');
        return;
      }

      let markDown = toastUiEditor.value.getMarkdown();
      console.log('markDown', markDown);

      if (markDown == '') {
        showToastWarning('내용을 입력해 주세요');
        return;
      }

      sendFormData(markDown)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            showToastSuccess(getSuccessToastMsg());
            goToBlogList();
          }
        })
        .catch(error => {
          showToastError(error);
        });
    };

    let sendFormData = markDown => {
      if (isEditMode) {
        return axios.put(
          getHost() + `boardInfo/${getStore().state.writeInfo.id}`,
          getFormData(markDown)
        );
      } else {
        return axios.post(getHost() + 'write', getFormData(markDown));
      }
    };

    let onBack = () => {
      if (
        getInput().title == '' &&
        getInput().tag == '' &&
        toastUiEditor.value.getMarkdown() == ''
      ) {
        getRouter().back();
        return;
      }
      popup.value.showPoup = true;
    };

    let onButtonEvnet = confirm => {
      console.log('confirm', confirm);
      if (confirm) {
        getRouter().back();
      }
    };

    let getFormData = markDown => {
      const bodyForm = new FormData();
      bodyForm.append('title', getInput().title);
      bodyForm.append('content', markDown);
      bodyForm.append('tag', getInput().tag);
      return bodyForm;
    };

    let getBoardInfo = id => {
      axios
        .get(getHost() + 'boardInfo/' + id)
        .then(response => {
          console.log('boardInfo response', response);
          getInput().title = response.data.title;
          getInput().tag = response.data.name;
          console.log('this.toastUiViewer', toastUiViewer);
          markDownData.value = response.data.content;
          initToastUiEditor();
        })
        .catch(error => {
          showToastError(error);
        });
    };

    let getSuccessToastMsg = () => {
      return isEditMode ? '글 수정 완료' : '글 등록 완료';
    };

    isEditMode = getStore().state.writeInfo.editMode;

    return {
      popup,
      input,
      getRegAndModifyButtonStr,
      onButtonEvnet,
      onBack,
      onRegister
    };
  }
};
</script>
<style lang="scss">
$input_cotainer_width: 1200px;
.write_container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .input_container {
    width: $input_cotainer_width;
    .input_box {
      font-size: 40px;
      display: flex;
      align-items: center;
      padding: 10px;
      .input_label {
        width: 100px;
      }
      input {
        width: 1100px;
        font-size: 40px;
        font-family: 'Gowun Dodum', sans-serif;
      }
    }
    .toastUIEditor {
      margin-top: 30px;
      margin-bottom: 10px;
    }

    .button-container {
      display: flex;
      justify-content: flex-end;
      .reg_button {
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
</style>
