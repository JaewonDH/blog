
<template>
  <div class="top_container">
    <div class="top_title">{{boardInfo.title}}</div>
    <div class="top_info_container">
      <div>{{boardInfo.created}}</div>
      <div class="edit_container">
        <div class=edit_item>수정</div>
        <div class=edit_item @click="onDelete">삭제</div>
      </div>
    </div>
    <div class="line"></div>
    <div id="viewer"/>        
  </div>
</template>

<script>
import axios from 'axios';
import {CommonMixin} from '@/mixins/CommonMixin.js';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
export default {
  mixins:[CommonMixin], 
  data(){
    return{
      boardInfo:{},
      toastUiViewer:{}
    }
  },
  created(){
    console.log('this.$route.params',this.$route.params);
    this.getBoardInfo(this.$route.params.id);
  },
  mounted(){
    this.initToastUiViewer();
  },
  methods: {
    getBoardInfo(id) {
      axios.get(this.HOST_ADD + 'boardInfo/' + id)
        .then(response => {
          this.boardInfo = response.data;
          console.log('boardInfo response', response)
          this.toastUiViewer.setMarkdown(this.boardInfo.content);
        });
    },
    initToastUiViewer() {     
      this.toastUiViewer = new Viewer({
        el: document.querySelector('#viewer'),       
      });
    },
    onDelete(){
       axios.delete(this.HOST_ADD + 'board/' + this.$route.params.id)
        .then(response => {         
           console.log('onDelete response', response)   
          if(response.status==200){
            this.$router.back();
          }                
        }).catch(error=>{
          console.log('onDelete error', error)
        });
    }
  }
}
</script>

<style lang="scss">
$info_width:730px;

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
        &:hover{
          color: rgb(0, 0, 0);
        }
      }
    }
  }
  .detail_text{
    width: $info_width;
    margin-top: 30px;
    font-size: 20px;
  }
}


</style>



