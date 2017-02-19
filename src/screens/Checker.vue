<template>
  <div id="checker">
    <headerComponent></headerComponent>
    
    <button id="answersbutton" class="btn btn-primary" @click="getPrevious()">Previous</button>
    <div class="allreviews" v-for="(checkReview, index) in checkReviews">

      <div id="wrap1">
          <div class="reviewtext">
            {{checkReview.review_text}}
          </div>
        
          <div class="QuestionAnswers">
                <h1>{{currentQuestion}}</h1>
                  <ul v-for="questionAnswer in questionAnswers">
                    <li style="padding-left:70px;">
                      <button @click="submitRow(index, checkReview.id, questionAnswer.answer, questionAnswer.id)" class="btn btn-primary"
                        v-bind:style="{ backgroundColor: questionAnswer.color}">{{questionAnswer.answer}} </button>
                    </li>
                  </ul> 
          </div>
      </div>
        <div class="reviewsanswer" v-bind:style="{ backgroundColor: mapColoring[checkReview.answer_text]}">
          Annotation result is {{checkReview.answer_text}}
          Annotator is Mr {{checkReview.annotator_name}}
        </div>
    </div> 
    <checkerComponent v-on:event_checker="eventChecker" :checkerSubmit="checkerSubmit" :numOfReviews="numOfReviews"></checkerComponent>
    <questionAnswers v-on:event_questionAnswers="eventQuestionAnswers"></questionAnswers>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </div>
</template>

<script>

import CheckerComponent from '../components/CheckerComponent'
import QuestionAnswers from '../components/QuestionAnswers'
import MenuComponent from '../components/MenuComponent'
import HeaderComponent from '../components/HeaderComponent'

export default {
  name: 'checker',
  components: {
    CheckerComponent, QuestionAnswers, MenuComponent, HeaderComponent
  },
 
  data(){
    return{
     checkReviews: [],
     questionAnswers: [],
     numOfReviews: 0,
     previousChecksStack: [],
     checkerSubmit: {checkerIds: [], reviewsResult: [], reviewsResultId: []},
     mapColoring: '',
     currentQuestion:''
     
    }
  },

  methods: {
      eventChecker: function(checkerReviews) {
        this.numOfReviews = checkerReviews.length;
        this.checkReviews = checkerReviews;        
        console.log('Event from checker component emitted', checkerReviews);
      },

        eventQuestionAnswers: function(questionAnswers) {
          this.questionAnswers = questionAnswers.answers;
          this.currentQuestion = questionAnswers.question_text;
          this.mapColoring = new Object();
          for (var i =0 ; i < this.questionAnswers.length; i++){
              this.mapColoring[this.questionAnswers[i].answer] = this.questionAnswers[i].color;
          }
          console.log('Event from questions component emitted', questionAnswers);
      },

      submitRow: function(index, checkerId, checkerAnswer, checkerAnswerId){
          console.log(checkerId, checkerAnswer, checkerAnswerId);

          this.checkerSubmit.checkerIds.push(checkerId);
          this.checkerSubmit.reviewsResult.push(checkerAnswer);
          this.checkerSubmit.reviewsResultId.push(checkerAnswerId);
          this.previousChecksStack.push(this.checkReviews[index]);
          this.checkReviews.splice(index, 1);
          this.numOfReviews -= 1;
          
      },

      getPrevious: function(){

        if(this.previousChecksStack.length != 0){
            this.checkReviews.unshift(this.previousChecksStack.pop());      // add at the begininig of array
            this.numOfReviews += 1;
            
            if(this.checkerSubmit.checkerIds.length != 0){
              this.checkerSubmit.checkerIds.pop();
              this.checkerSubmit.reviewsResult.pop();
              this.checkerSubmit.reviewsResultId.pop();
            }
            return;
        }
          alert('No Previous data!');   
    }
  }

}

</script>

<style scoped>
#checker {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  //  margin-top: 60px;

}

.reviewswrapper {
  text-align: center;
  margin-top: 20px;
  margin-left:260px;
}

.reviewsanswer {
  float: right;
  text-align: center;
  height: 58px;
  background-color: #D3D3D3;
  width: 409px;
  font-size: 20px;
  font-family: "sans-serif";
  border: 2px solid black;
  padding: 0px;

}

.reviewtext{
  height:150px;
  overflow:scroll;
  background-color:#F6F6F6;
  text-align: center;
  /*width: 1478px;*/
  margin:20px auto;
  font-size: 20px;
  float:left; 
  width: 1305px;

}

#reviewsbutton{
  margin: 1px;

}
#wrap1 {
  overflow: hidden; 
}

.QuestionAnswers {
  padding-top: 3px;
  padding-left: 77px;
  overflow: hidden;
  float: left; /* add this */
}
.allreviews{
  margin: 58px;
}
ul {
  list-style-type: none;
}

</style>
