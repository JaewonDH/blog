<template>
  <div class="write_container">
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
          <button @click="send()">등록</button>
          <button @click="sendForm()">form</button>
        </div>
      </div>              
    </div>        
  </div>
</template>

<script>
import axios from 'axios'; // import 후 사용  vue 기반
export default {
  data(){
    return{
      input:{
        title:'',
        text:'',
        tag:''
      },
      HOST_ADD:'http://localhost:3333/'
    }
  },
  components: {
   
  },
  methods:{    
    sendForm(){
      const bodyForm = new FormData();
      bodyForm.append('email', "eve.holt@reqres.in");
      bodyForm.append('password', "cityslicka");

      // let headers = {
      //   'Content-Type': 'multipart/form-data'
      // }

      axios.post(this.HOST_ADD+'create_form',bodyForm).then(response=>{        
        console.log(response);
      });
    },
    send(){     
      let test={
        name:'jjjj',
        add:'adddd'
      }
      axios.post(this.HOST_ADD+'create',test).then(response=>{
        console.log(response);
      });
    }
  }
}
</script>

<style >
.write_container{
  display: flex;
  justify-content: center;
  width: 1200px;
  height: 600px;
  margin: auto;
  margin-top: 20px;
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
  width: 20px;
  height: 30px;
}

input {  
  height: 30px;
}

textarea{
  width: 870px;
  height: 400px;
}

button{
  width: 800px;
  margin-top:10px;
  height: 30px;
}
</style>
