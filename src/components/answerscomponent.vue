<template>
  <div v-show="showtable" class="answertable">
    <i id="addquestion" class="fa fa-plus fa-lg" aria-hidden="true" @click="addRow(questionanswers)"></i>
    <table  class="table table-hover table-bordered"  width="100%" >
    <thead>
      <tr class="active">
        
        <th>#</th>
        <th>answer</th>
        <th>color</th>            
        <th>edit</th>
        <th>delete</th>
        <th>save</th>
  
      </tr>
      </thead>

      <tbody>
      <tr  v-for="(answer,index) in questionanswers"  v-bind:id="answer.id">
        
        <td> {{index + 1}}</td>
        <td> <span v-show="!answer.visible2"  >{{answer.answer}}</span>
             <input v-show="answer.visible2" type="text" v-model="answer.answer">
        </td>
        <td>
        <button @click="lightbox(answer,index)" class="btn btn-primary"
          v-bind:style="{ backgroundColor: answer.color}">
        </button>
        </td>
        <td v-on:click="show4(answer)"><i class="fa fa-pencil" aria-hidden="true"></i></td>
        <td v-on:click="deleteanswer(answer.id)" ><i class="fa fa-trash" aria-hidden="true"></i></td>
        <td v-on:click="saveanswer(answer.id,answer.answer,answer.color,answer.question_id,answer,index)"><i class="fa fa-floppy-o" aria-hidden="true" ></i></td>
    
      </tr>
      </tbody>
    </table>

    <div id="light" class="white_content">

      <div class="colorpicker">
        <photoshop-picker  v-model="colors" @change-color="onChange" @ok="onOk(selectedanswer,index)" @cancel="onCancel(selectedanswer,index)">
        </photoshop-picker>
      </div>

      <a href="javascript:void(0)" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">Close
      </a>
    </div>
    <div id="fade" class="black_overlay">
    </div>
  </div> 
</template>

<script>

import axios from 'axios'
import { Photoshop } from 'vue-color'

var defaultProps = {
  hex: '#194d33',
  hsl: {
  h: 150,
  s: 0.5,
  l: 0.2,
  a: 1
  },
  hsv: {
  h: 150,
  s: 0.66,
  v: 0.30,
  a: 1
  },
  rgba: {
  r: 25,
  g: 77,
  b: 51,
  a: 1
  },
  a: 1
}

export default {

name: 'answertable',
props: ['showtable','questions_Id','questionanswers'],
components: {
  'photoshop-picker': Photoshop
},

methods:{
  addRow: function (questionanswers) {
    try {
      console.log("answers result is"+questionanswers);
      questionanswers.push({visible2:true,question_id:this.questions_Id});

    }
    catch(e)
    {
      console.log(e);
    }
  },
  show4:function(value){
    var vm=this;
    value.visible2 = true;
    vm.$forceUpdate();
  },
  deleteanswer: function(answerId){
    console.log("id is"+answerId);
    console.log("id after hidden"+answerId);
    document.getElementById(answerId).style.display="none";
    var formData = new FormData();
    formData.append('answer_id', answerId);

    axios({
      method: 'POST',
      url: window.hostname + '/questions/deleteAnswer',
      data: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(function (response) {
      console.log("deleted")

    })
    .catch(function (error) {
      console.log('fail ');
    });
  },
  saveanswer: function (id,answer,color,question_id,row,index) {
    if(id == null){
      this.insertRow(id,answer,color,question_id,row,index);
    }
    else{
      this.updateRow(id,answer,color,question_id,row,index);
    }
  },
  insertRow:function(id,answer,color,question_id,row,index){
    console.log("entered insert row function")
    var that=this;
    row.visible2=false;
    that.$forceUpdate();
    var formData = new FormData();
    formData.append('question_id', question_id);
    formData.append('answers', answer);
    formData.append('colors', color);
    axios({
      method: 'POST',
      url: window.hostname + '/questions/addAnswer',
      data: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(function (response) {
      that.key=response.data;
       that.questionanswers[index].id=that.key;
       console.log("key is "+that.key);
       that.$forceUpdate();

    })
    .catch(function (error) {
      console.log('[.] Fail : ', error);
    // alert(error.response.data);
    });

  },
  updateRow:function(id,answer,color,question_id,row){
    var that=this;
    row.visible2=false;
    that.$forceUpdate();
    var formData = new FormData();
    formData.append('answer_id', id);
    formData.append('new_answer_text', answer);
    formData.append('new_color', color);
    axios({
      method: 'POST',
      url: window.hostname + '/questions/editanswer',
      data: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    .then(function (response) {

    })
    .catch(function (error) {
      console.log('[.] Fail : ');

    });

  },
  onChange (val) {
    this.colors = val;
    console.log('color is', val.hex)
  },
  onOk(answer,index){
    var vm=this;
    vm.$forceUpdate();
    console.log("index at on ok is"+answer.id);
    console.log('ok++ ',this.colors.hex);
    answer.color=this.colors.hex;
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';

  },
  onCancel(answer,index){
    console.log('color befor edit++  ',answer.color)
    console.log('cancel ',this.colors.hex)
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';

  },
  lightbox(currentAnswer,index){
    this.selectedanswer = currentAnswer;
    this.index=index;
     console.log("current answer index color  is "+index)
    console.log("current answer id is "+currentAnswer.id)
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
  }

},
data()
{
  return{
  id_question:'',
  colors: defaultProps,
  selectedanswer:'',
  key:'',
  index:''
  }
}

}

</script>

<style>

#addquestion{
  float: left;
}
.btn-primary {
  color: #fff;
  WIDTH: 130px;
  background-color: #286090;
  border-color: #204d74;
}
.black_overlay {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: .80;
  filter: alpha(opacity=80);
}
.white_content {
  display: none;
  position: absolute;
  top: 25%;
  left: 25%;
  width: 37%;
  height: 37%;
  padding: 16px;
  /*border: 8px solid red;*/
  background-color: white;
  z-index: 1002;
  overflow: auto;
}

.colorpicker{
  width: 500px; 
  margin: 0 auto; 
}
</style>