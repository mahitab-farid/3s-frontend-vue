<template>
  <div class="questions">
    <headerComponent></headerComponent>
    <questionscomponent :newitem="res" :showtable="showtable" v-on:show="table"></questionscomponent>
    <answerscomponent  :showtable="showtable" ></answerscomponent>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent'
import questionscomponent from '../components/questionscomponent'
import answerscomponent from '../components/answerscomponent'
// import answerscomponent from './components/answerscomponent'
// import ColorPicker from 'vue-bootstrap-colorpicker'

var res=[
  { 
  "description": 'here is description' ,
  "id":1,
  "question_code":12,
  "question_kind":'a',
  "visible":false

  },
  { "description": ' description2' ,

  "id":2,
  "question_code":19,
  "question_kind":'b',
  "visible":false,


  },
  { "description": ' description3' ,

  "id":3,
  "question_code":15,
  "question_kind":'b',
  "visible":false,


  },
  { "description": ' description4' ,

  "id":4,
  "question_code":15,
  "question_kind":'b',
  "visible":false,


  },
  { "description": ' description5' ,

  "id":5,
  "question_code":20,
  "question_kind":'b',
  "visible":false,

  }
];

var visiblity=false;
var question_code='';
var question_kind='';
var description='';
var questions=[];
var visible2 =false;
var showtable=false;

export default {
  name: 'questions',
  components: {HeaderComponent,questionscomponent,answerscomponent},
  // components: {HeaderComponent,questionscomponent,answerscomponent,ColorPicker},
  data () {
    return {
     res:res
    }
  },
  methods:{
    submit:function(){
      var mydata = this;
      axios.get('/questions').then(function(response){
        mydata.questions= response.data;

      }); 
      /*
      axios.get('/http://localhost:9000/question/getQuestionAnswers').then(function(response){
        mydata.answers= response.data;
        mydata.answers.forEach(function(element){
          element['visible2']=false;

        });
      });
      */
      mydata.showtable=true;
    },
    table: function () {

      //console.log("table shown"+showtable)
      this.showtable =true;
      console.log("table shown"+showtable)

    },
    show4 :function(value){
      value.visible2 = true;
    },
    deleteanswer: function(id){
      console.log("id is"+id);
      document.getElementById(id).style.display="none";
      
      // axios.get('/Delete', {
      //   params: {
      //    id: id,

      //   }
      // })
      // .then(function (response) {

      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      
    },
    saveanswer: function (id,answer_text,color,answer) {
      console.log("id is"+id);
      console.log("answer is"+answer_text);
      console.log("color is"+color);
      console.log("visibile"+answer.visible2);
      answer.visible2=false;
      
      // axios.get('/Save', {
      //   params: {
      //     id: id,
      //     answer:answer,
      //     color:color,

      //   }
      // })
      // .then(function (response) {
      //   console.log(response);

      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      
    }
  },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
