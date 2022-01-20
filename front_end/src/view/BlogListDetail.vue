<template>
  <div class="top_container">
    <div class="top_title">{{ boardInfo.title }}</div>
    <div class="top_info_container">
      <div>{{ boardInfo.created }}</div>
      <div class="edit_container">
        <div class="edit_item" @click="onModify()">수정</div>
        <div class="edit_item" @click="onDelete()">삭제</div>
      </div>
    </div>
    <div class="line"></div>
    <div id="viewer" />
    <Popup
      :showPoup.sync="deletePopup.showPoup"
      :title="deletePopup.title"
      :bodyContent="deletePopup.content"
      @onButtonEvnet="onPopupButtonEvnet"
    />
  </div>
</template>

<script>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import Popup from '@/components/Popup'
import BoardApi from '@/api/BoardApi'
import {
  reactive,
  getCurrentInstance,
  onMounted,
  ref
} from '@vue/composition-api'
import Common from '../composition/CommonUtile'
export default {
  components: {
    Popup
  },
  setup() {
    let {
      showToastError,
      getRouter,
      showToastSuccess,
      setStoreWriteInfo,
      getRoute
    } = Common(getCurrentInstance())

    let boardInfo = ref({})
    let toastUiViewer = ref({})

    let deletePopup = reactive({
      showPoup: false,
      title: '',
      content: ''
    })

    let api = new BoardApi()

    let getBoardInfo = async id => {
      try {
        let response = await api.getBoardInfo(id)
        boardInfo.value = response.data
        console.log('boardInfo response', response)
        toastUiViewer.value.setMarkdown(boardInfo.value.content)
      } catch (error) {
        showToastError(error)
      }
    }

    let initToastUiViewer = () => {
      toastUiViewer.value = new Viewer({
        el: document.querySelector('#viewer')
      })
    }

    let onDelete = () => {
      deletePopup.title = `글 삭제`
      deletePopup.content = `"${boardInfo.value.title}"을 삭제 하시겠습니까?`
      deletePopup.showPoup = true
    }

    async function onPopupButtonEvnet(confirm) {
      if (confirm) {
        try {
          let response = await api.deleteBoard(getRoute().params.id)
          console.log('onDelete response', response)
          if (response.status == 200) {
            showToastSuccess(`"${boardInfo.value.title}" 삭제 완료`)
            getRouter().back()
          }
        } catch (error) {
          showToastError(error)
        }
      }
    }

    let onModify = () => {
      setStoreWriteInfo(true, getRoute().params.id)
      getRouter().push({
        name: 'BlogWrite'
      })
    }

    onMounted(() => {
      initToastUiViewer()
    })

    console.log('this.$route.params', getRoute().params.id)
    getBoardInfo(getRoute().params.id)

    return {
      boardInfo,
      toastUiViewer,
      deletePopup,
      onModify,
      onDelete,
      onPopupButtonEvnet
    }
  }
}
</script>

<style lang="scss">
$info_width: 730px;

.top_container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  .top_title {
    font-size: 70px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }

  .top_info_container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: $info_width;
    font-size: 18px;
    margin-bottom: 15px;

    .edit_container {
      display: flex;
      .edit_item {
        margin-right: 10px;
        color: rgb(88, 88, 88);
        cursor: pointer;
        &:hover {
          color: rgb(0, 0, 0);
        }
      }
    }
  }
  .detail_text {
    width: $info_width;
    margin-top: 30px;
    font-size: 20px;
  }
}
</style>
