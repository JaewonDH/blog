<template>
  <div class="write_container">
    <div class="input_container">
      <div class="input_box"><span class="input_label">제목:</span> <input type="text" v-model="input.title" placeholder="제목을 입력하세요" /></div>
      <div class="input_box"><span class="input_label">TAG:</span> <input type="text" v-model="input.tag" placeholder="태그를 입력하세요" /></div>
      <div id="editor" class="toastUIEditor"></div>
      <div>
        <div class="reg_button" @click="sendForm()">등록</div>
        <div class="reg_button" @click="sendForm()">뒤로가기</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // import 후 사용  vue 기반
import { CommonMixin } from "@/mixins/CommonMixin.js";
import Editor from "@toast-ui/editor";
import "codemirror/lib/codemirror.css"; // codemirror style
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor style
import fontSizePicker from "tui-font-size-picker";
export default {
  mixins: [CommonMixin],
  data() {
    return {
      input: {
        title: "",
        text: "",
        tag: "",
      },
      toastUiEditor: {},
      toastUiViewer: {},
    };
  },
  mounted() {
    this.initToastUiEditor();
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
      });
    },
    sendForm() {
      if (this.input.title == "") {
        this.showToastWarning("제목을 입력해 주세요");
        return;
      }

      if (this.input.tag == "") {
        this.showToastWarning("태그를 입력해 주세요");
        return;
      }

      let markDown = this.toastUiEditor.getMarkdown();
      if (markDown == "") {
        this.showToastWarning("내용을 입력해 주세요");
        return;
      }

      console.log("markDown", markDown);
      const bodyForm = new FormData();
      bodyForm.append("title", this.input.title);
      bodyForm.append("content", markDown);
      bodyForm.append("tag", this.input.tag);
      axios
        .post(this.HOST_ADD + "write", bodyForm)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.showToastSuccess("글 등록 성공");
            this.goToBlogList();
          }
        })
        .catch((error) => {
          this.showToastError(error);
        });
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
