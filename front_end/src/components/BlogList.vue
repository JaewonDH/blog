<template>
  <div class="list_container">
    <div class="list_block" v-for="(item,index) in listData" :key="index" @click="gotoDetailInfo()">      
      <div class="tag_value">
        <p><span class="tag_bar">{{item.tagValue}}</span></p>        
      </div>
      <div class="content_block">
        <div>
          <p class="title_content">{{item.title}}</p>
          <p class="sub_title_content">{{item.subTitle}}</p>
        </div>
        <div class="title_date_block">
          <p>{{item.date}}</p>
        </div>        
      </div>      
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      listData:[
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
      {tagValue:'Design', title:'리디북스 PAPER PRO UI 디자인하기', subTitle:'리디북스 전자 임크 리더기의 UI 디자인 과정을 공유 합니다.',date:'2021.08.02'},
    ]
    }
  },

  methods:{    
    gotoDetailInfo(){

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