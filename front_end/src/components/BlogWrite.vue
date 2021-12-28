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
      <div>
        <div class="reg_button" @click="onRegister()">
          {{ getRegAndModifyButtonStr }}
        </div>
        <div class="reg_button" @click="onBack()">취소</div>
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
import axios from "axios"; // import 후 사용  vue 기반
import { CommonMixin } from "@/mixins/CommonMixin.js";
import Editor from "@toast-ui/editor";
import "codemirror/lib/codemirror.css"; // codemirror style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor style
import fontSizePicker from "tui-font-size-picker";
import Popup from "@/components/Popup";
export default {
  components: {
    Popup,
  },
  mixins: [CommonMixin],
  data() {
    return {
      isEditMode: false,
      markDownData: "",
      input: {
        title: "",
        text: "",
        tag: "",
      },
      toastUiEditor: {},
      toastUiViewer: {},
      popup: {
        showPoup: false,
        title: "뒤로가기",
        content: "등록 중인 글을 무시하고 이전 페이지로 갈까요?",
      },
    };
  },
  created() {
    this.isEditMode = this.$store.state.writeInfo.editMode;
  },
  mounted() {
    if (this.isEditMode) {
      this.getBoardInfo(this.$store.state.writeInfo.id);
    } else {
      this.initToastUiEditor();
    }
  },
  computed: {
    getRegAndModifyButtonStr() {
      return this.isEditMode ? "수정" : "등록";
    },
  },
  methods: {
    initToastUiEditor() {
      this.toastUiEditor = new Editor({
        el: document.querySelector("#editor"),
        initialEditType: "markdown",
        previewStyle: "vertical",
        height: "580px",
        language: "ko",
        plugins: [fontSizePicker],
        initialValue: this.markDownData,
      });
    },
    onRegister() {
      if (this.input.title == "") {
        this.showToastWarning("제목을 입력해 주세요");
        return;
      }

      if (this.input.tag == "") {
        this.showToastWarning("태그를 입력해 주세요");
        return;
      }

      let markDown = this.toastUiEditor.getMarkdown();
      console.log("markDown", markDown);

      if (markDown == "") {
        this.showToastWarning("내용을 입력해 주세요");
        return;
      }

      this.sendFormData(markDown)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.showToastSuccess(this.getSuccessToastMsg());
            this.goToBlogList();
          }
        })
        .catch((error) => {
          this.showToastError(error);
        });
    },
    sendFormData(markDown) {
      if (this.isEditMode) {
        return axios.put(
          this.HOST_ADD + `boardInfo/${this.$store.state.writeInfo.id}`,
          this.getFormData(markDown)
        );
      } else {
        return axios.post(this.HOST_ADD + "write", this.getFormData(markDown));
      }
    },
    onBack() {
      if (
        this.input.title == "" &&
        this.input.tag == "" &&
        this.toastUiEditor.getMarkdown() == ""
      ) {
        this.$router.back();
        return;
      }
      this.popup.showPoup = true;
    },
    onButtonEvnet(confirm) {
      console.log("confirm", confirm);
      if (confirm) {
        this.$router.back();
      }
    },
    getFormData(markDown) {
      const bodyForm = new FormData();
      bodyForm.append("title", this.input.title);
      bodyForm.append("content", markDown);
      bodyForm.append("tag", this.input.tag);
      return bodyForm;
    },
    getBoardInfo(id) {
      axios
        .get(this.HOST_ADD + "boardInfo/" + id)
        .then((response) => {
          response.data;
          console.log("boardInfo response", response);
          this.input.title = response.data.title;
          this.input.tag = response.data.name;
          console.log("this.toastUiViewer", this.toastUiViewer);
          this.markDownData = response.data.content;
          this.initToastUiEditor();
        })
        .catch((error) => {
          this.showToastError(error);
        });
    },
    getSuccessToastMsg() {
      return this.isEditMode ? "글 수정 완료" : "글 등록 완료";
    },
  },
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
        font-family: "Gowun Dodum", sans-serif;
      }
    }
    .toastUIEditor {
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .reg_button {
      display: inline-block;
      padding: 10px;
      margin: 10px;
      color: white;
      background-color: rgb(26, 188, 156);
      border-radius: 4px;
      float: right;
      cursor: pointer;
      box-shadow: 2px 2px 5px #999;
      &:hover {
        background-color: rgb(5, 158, 128);
      }
    }
  }
}
</style>
