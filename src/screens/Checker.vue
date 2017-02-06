<template>
  <div id="checker">
    <div v-for="(checkReview, index) in checkReviews" v-show="showRow[index].show">
        {{checkReview.review_text}}
        <div class="center">
          {{checkReview.answer_text}}
        </div>
        <div class="wrapper">
          <button @click="submitRow(index, checkReview.id, questionAnswer.answer, questionAnswer.id)"    v-for="questionAnswer in questionAnswers">
            {{questionAnswer.answer}}
        </div>
    </div> 
  <checkerComponent v-on:event_checker="eventChecker" :checkerSubmit="checkerSubmit"></checkerComponent>
  <questionAnswers v-on:event_questionAnswers="eventQuestionAnswers"></questionAnswers>
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
     checkerSubmit: {checkerIds: [], reviewsResult: [], reviewsResultId: []}
     
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

.wrapper {
    text-align: right;
}

.center {
    text-align: center;
}




</style>
