<template>
  <div class="answertable">
    <i id="addquestion" class="fa fa-plus" aria-hidden="true" @click="addRow(answers)"></i>
    <table  class="table table-hover table-bordered"  width="100%" >
    <thead>
      <tr class="active">
        <th>answer</th>
        <th>color</th>            
        <th>edit</th>
        <th>delete</th>
        <th>save</th>
        <th>questionid</th>
      </tr>
      </thead>

<tbody>
      <tr  v-for="answer in answers"  v-bind:id="answer.id">

        <td> <span v-show="!answer.visible2"  >{{answer.answer}}</span>
             <input v-show="answer.visible2" type="text" v-model="answer.answer">
        </td>
        <td>
        <button @click="lightbox(answer)" class="btn btn-primary"
        v-bind:style="{ backgroundColor: answer.color}">AAAAAAA
        </button>
        </td>
        <td v-on:click="show4(answer)"><i class="fa fa-pencil" aria-hidden="true"></i></td>
        <td v-on:click="deleteanswer(answer.id)" ><i class="fa fa-trash" aria-hidden="true"></i></td>
        <td v-on:click="saveanswer(answer.id,answer.answer,answer.color,answer)"><i class="fa fa-floppy-o" aria-hidden="true" ></i></td>
        <td>{{answer.question_id}}</td>

      </tr>
</tbody>
    </table>

    <div id="light" class="white_content">

      <div class="colorpicker">
        <photoshop-picker  v-model="colors" @change-color="onChange" @ok="onOk(selectedanswer)" @cancel="onCancel(selectedanswer)">
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
  props: ['showtable','questions'],
  components: {
   'photoshop-picker': Photoshop
  },
 
  methods:{

      addRow: function (answers) {
        try {
          console.log("result is"+answers);
          this.answers.push({visible2:true});

        } catch(e)
        {
          console.log(e);
        }
        },
        show4:function(value){
          value.visible2 = true;
          // app.$forceUpdate();
        },
      deleteanswer: function(answerId){
        console.log("id is"+answerId);
        console.log("id after hidden"+answerId);
        document.getElementById(answerId).style.display="none";
       
        /*
        axios.get('/Delete', {
        params: {
        id: id,

        }
        })
        .then(function (response) {

        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
        */
    },
    saveanswer: function (id,answer_text,color,answer) {
      var mydata=this;
      console.log("id is"+id);
      console.log("answer is"+answer_text);
      console.log("color is"+color);
      console.log("visibile"+answer.visible2);
      console.log("color is"+mydata.colors.hex);
      answer.visible2=false;
      /*
      axios.get('/Save', {
      params: {
      id: id,
      answer:answer,
      color:mydata.colors.hex,

      }
      })
      .then(function (response) {
      console.log(response);

      })
      .catch(function (error) {
      console.log(error);
      });
      */
    },
    onChange (val) {
      this.colors = val
      console.log('color is', val.hex)
    },
    onOk(answer){

      console.log('ok++ ',this.colors.hex)
      answer.color=this.colors.hex
      document.getElementById('light').style.display='none';
      document.getElementById('fade').style.display='none';

    },
    onCancel(answer){
      console.log('color befor edit++  ',answer.color)
      console.log('cancel ',this.colors.hex)
      document.getElementById('light').style.display='none';
      document.getElementById('fade').style.display='none';

    },
    lightbox(currentAnswer){
      this.selectedanswer = currentAnswer;
      document.getElementById('light').style.display='block';
      document.getElementById('fade').style.display='block';
    }

  },
  data()
  {
    return{
      id_question:'',
      // answers:[],
      colors: defaultProps,
      selectedanswer:'',
      answers:[{  
  "answer": "answer_type1",
  "created_at": "2017-01-18T15:26:57Z",
  "id": 1,
  "question_id": 1,
  "updated_at": "2017-01-18T15:26:57Z" ,
  "color":'red',
  showcolors:false,
  visible2 :false

  },
  { 
  "answer": "answer_type2",
  "created_at": "2017-01-18T15:26:57Z",
  "id": 2,
  "question_id": 2,
  "updated_at": "2017-01-18T15:26:57Z",
  "color":'blue',
  showcolors:false,
  visible2 :false

  }]
    }
  },
  created() {
    // var mydata = this;
    // bus.$on('show', function(id){
    //   console.log('Event in answers table other component emitted', id)
    //   mydata.id_question=id;
    //   console.log("id which reieved in answers table "+mydata.id_question)

    //   axios.get('http://localhost:9000/question/getQuestionAnswers', {
    //     params: {
    //     id_question: mydata.id_question
    //     }
    //   })
    //   .then(function (response) {
    //     mydata.answers=response.data;
    //     console.log(response);

    //   })
    //   .catch(function (error) {
    //     console.log("error with id "+mydata.id_question)
    //     console.log(error);
    //   });

    // });  


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