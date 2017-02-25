<template>
  <div class="questions">
    <headerComponent></headerComponent>
    <questionscomponent v-on:event_questions="eventQuestions" :showtable="showtable" v-on:show="table" v-on:event_questionanswers="eventquestionanswers"></questionscomponent>
    <answerscomponent  :showtable="showtable" :questions_Id="questions_Id" :questionanswers="questionanswers"></answerscomponent>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent'
import questionscomponent from '../components/questionscomponent'
import answerscomponent from '../components/answerscomponent'
// import ColorPicker from 'vue-bootstrap-colorpicker'

export default {
  name: 'questions',
  components: {
    HeaderComponent,questionscomponent,answerscomponent
  },
  data () {
    return {
      showtable:false,
      questions_Id:'',
      questionanswers:[],
      visible2:''
    }
  },
  methods:{
    eventQuestions:function(questionId){
      this.questions_Id = questionId;
      console.log("question  this.questions_Id came from questions component is"+ this.questions_Id)
    },
    eventquestionanswers:function(questionanswers){
      this.questionanswers = questionanswers;
      this.questionanswers.forEach(function(element){
        element['visible2']=false;
      });
      console.log("the question answers comes from questions component is"+this.questionanswers)
    },
    table: function (showtable) {
      //console.log("table shown"+showtable)
      this.showtable =showtable;
      console.log("table shown"+showtable)
    }

    }
}
</script>


<style scoped>

</style>