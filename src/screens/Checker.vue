<template>
  <div id="checker">

    <div v-for="(checkReview, index) in checkReviews" v-show="showRow[index].show">
        <div class="reviewtext">
        {{checkReview.review_text}}
        </div>
        <div class="reviewsanswer" v-bind:style="{ backgroundColor: mapColoring[checkReview.answer_text]}">
          Annotation result is {{checkReview.answer_text}}
        </div>
        <div class="reviewswrapper">
          <button id="reviewsbutton" class="btn btn-primary" @click="submitRow(index, checkReview.id, questionAnswer.answer, questionAnswer.id)"    v-for="questionAnswer in questionAnswers" v-bind:style="{ backgroundColor: questionAnswer.color}">
            {{questionAnswer.answer}}
        </div>
    </div> 
  <checkerComponent v-on:event_checker="eventChecker" :checkerSubmit="checkerSubmit"></checkerComponent>
  <questionAnswers v-on:event_questionAnswers="eventQuestionAnswers"></questionAnswers>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </div>
</template>

<script>

import CheckerComponent from '../components/CheckerComponent'
import QuestionAnswers from '../components/QuestionAnswers'

export default {
  name: 'checker',
  components: {
    CheckerComponent, QuestionAnswers
  },
 
  data(){
    return{
     checkReviews: [],
     questionAnswers: [],
     showRow: [],
     checkerSubmit: {checkerIds: [], reviewsResult: [], reviewsResultId: []},
     mapColoring: ''
     
    }
  },

  methods: {
      eventChecker: function(checkerReviews) {
        this.checkReviews = checkerReviews;
        this.showRow = [];
        var show = '';
        for (var i = 0; i < checkerReviews.length; i++) {
             this.showRow.push({show: true});
        }
        
        console.log('Event from checker component emitted', checkerReviews);
      },

        eventQuestionAnswers: function(questionAnswers) {
          this.questionAnswers = questionAnswers;
          this.mapColoring = new Object();
          for (var i =0 ; i < questionAnswers.length; i++){
              this.mapColoring[questionAnswers[i].answer] = questionAnswers[i].color;
          }
          console.log('Event from questions component emitted', questionAnswers);
      },

      submitRow: function(index, checkerId, checkerAnswer, checkerAnswerId){
          console.log(checkerId, checkerAnswer, checkerAnswerId);

          this.checkerSubmit.checkerIds.push(checkerId);
          this.checkerSubmit.reviewsResult.push(checkerAnswer);
          this.checkerSubmit.reviewsResultId.push(checkerAnswerId);
          this.showRow[index].show=false;
      }
  }

}

</script>

<style>
#checker {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  margin-top: 60px;


}

.reviewswrapper {
    text-align: center;
    margin-top: 20px;
  margin-left:260px;
}

.reviewsanswer {
  float: right;
  text-align: center;
  height:45px;
  background-color: #D3D3D3;
  width:350px;
  margin:20px auto;

   font-size: 20px;
   font-family: "sans-serif";
   border: 2px solid black;
   padding: 6px;
}

.reviewtext{
    height:150px;
  /*width:1170px;*/
  overflow:scroll;
  background-color:#F6F6F6;
  text-align: center;
  width:1600px;
   margin:20px auto;
   font-size: 20px
}

#reviewsbutton{
margin: 1px;

}
</style>
