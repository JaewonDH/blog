<template>
  <div class="list_container">    
    <div class="list_block" v-for="(item,index) in listData" :key="index" @click="gotoDetailInfo()">      
      <div class="tag_value">
        <p><span class="tag_bar">{{item.tag}}</span></p>        
      </div>
      <div class="content_block">
        <div>
          <p class="title_content">{{item.title}}</p>          
        </div>
        <div class="title_date_block">
          <p>{{item.created}}</p>
        </div>        
      </div>      
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // import 후 사용  vue 기반
export default {
  created(){
    this.getList();
  },
  data(){
    return{  
      listData:[],
      HOST_ADD:'http://localhost:3333/'
    }  
  },

  methods:{    
    getList(){
      axios.get(this.HOST_ADD+'boardList').then(response=>{
        this.listData=response.data;        
      })
    }
  }
}
</script>

<style>
.list_container{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.content_block{
  display: flex;
}

.title_content{
  font-size: 30px;
  font-weight: bolder;
}

.sub_title_content{
  font-size: 20px;
  font-weight: bolder;
  color: gray;
}

.tag_bar{
  background-color: rgb(26,188,156); 
  border-radius: 4px;   
  padding: 2px;
  font-weight: bolder;
  color: white;
}

.title_date_block{
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.line{
  background-color: rgb(26,188,156);  
  border: solid 0.5px rgb(26,188,156);  
}

.list_block p{
  margin: 5px;

}

.list_block{
  cursor: pointer;
  padding: 15px;
}

</style>