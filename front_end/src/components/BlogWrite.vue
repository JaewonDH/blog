<template>
  <div class="write_container write_container_resize">
    <div class="write_wrrap">
      <div class="write_editor">
        <div class="input_container">
          <div class="input_box">
            <span class="input_label">제목:</span> <input type="text" v-model="input.title">
          </div>
          <div class="input_box">
            <span class="input_label">내용:</span> <textarea v-model="input.text" ></textarea>
          </div>
          <div class="input_box">
            <span class="input_label">TAG:</span> <input type="text" v-model="input.tag">
          </div>
          <button @click="sendForm()">등록</button>          
        </div>
      </div>              
    </div>        
  </div>
</template>

<script>
import axios from 'axios'; // import 후 사용  vue 기반
import {CommonMixin} from '@/mixins/CommonMixin.js';
export default {
  mixins:[CommonMixin],
  data(){
    return{
      input:{
        title:'',
        text:'',
        tag:''
      },
    }
  },
  methods:{    
    sendForm(){
      const bodyForm = new FormData();
      bodyForm.append('title', this.input.title);
      bodyForm.append('content', this.input.text);
      bodyForm.append('tag', this.input.tag);
      axios.post(this.HOST_ADD+'write',bodyForm).then(response=>{        
        console.log(response);
        this.$router.push({name:'BlogList'});
      });
    },
  }
}
</script>

<style >
.write_container{
  display: flex;
  justify-content: center;  
  height: 600px;
  margin: auto;
  margin-top: 20px;
}

.write_container_resiz{
  width: 400px;
}


.input_container{
  border: solid 1px black;
  padding: 20px;  
}

.input_box{
  width: auto;
  margin-bottom:10px;    
}

.input_label{
  width: 5%;
  height: 30px;
}

input {  
  width: 95%;
  height: 30px;
}

textarea{
  width: 500px;
  height: 400px;
  resize: none;
}

button{
  width: 100%;
  margin-top:10px;
  height: 30px;
}

@media screen and (max-width: 600px) {
  .write_container_resiz{
    width: 1200px;
  }
}

</style>
