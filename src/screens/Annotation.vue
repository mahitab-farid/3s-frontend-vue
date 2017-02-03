<template>
  <div id="annotation">
    
    <div v-for="(annotationReview, index) in annotationReviews" v-show="showRow[index].show">

        {{annotationReview.review_text}}
        <div class="wrapper">
          <button @click="submitRow(index, annotationReview.id, questionAnswer.answer, questionAnswer.id)"    v-for="questionAnswer in questionAnswers">
            {{questionAnswer.answer}}
        </div>
    </div> 
  <annotationComponent v-on:event_annotation="eventAnnotation" :annotationSubmit="annotationSubmit"></annotationComponent>
  <questionAnswers v-on:event_questionAnswers="eventQuestionAnswers"></questionAnswers>
  </div>
</template>

<script>

import AnnotationComponent from '../components/AnnotationComponent'
import QuestionAnswers from '../components/QuestionAnswers'

export default {
  name: 'annotation',
  components: {
    AnnotationComponent, QuestionAnswers
  },
 
  data(){
    return{
     annotationReviews: [],
     questionAnswers: [],
     showRow: [],
     fish: true,
     annotationSubmit: {annotationIds: [], reviewsResult: [], reviewsResultId: []}
     
    }
  },


    mounted: function(){

  },
  methods: {
      eventAnnotation: function(annotationReviews) {
        this.annotationReviews = annotationReviews;
        this.showRow = [];
        var show = '';
        for (var i = 0; i < annotationReviews.length; i++) {
             this.showRow.push({show: true});
        }
        
        console.log('Event from annotation component emitted', annotationReviews);
      },

        eventQuestionAnswers: function(questionAnswers) {
          this.questionAnswers = questionAnswers;
          console.log('Event from questions component emitted', questionAnswers);
      },

      submitRow: function(index, annotationId, annotationAnswer, annotationAnswerId){
          console.log(annotationId, annotationAnswer, annotationAnswerId);

          this.annotationSubmit.annotationIds.push(annotationId);
          this.annotationSubmit.reviewsResult.push(annotationAnswer);
          this.annotationSubmit.reviewsResultId.push(annotationAnswerId);
          this.showRow[index].show=false;
      }
  }

}

</script>

<style>
#annotation {
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
