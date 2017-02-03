<template>
  <div id="annotation" v-repeat="submit()">
    <annotationComponent v-on:event_annotation="eventAnnotation"></annotationComponent>
    <questionAnswers v-on:event_questionAnswers="eventQuestionAnswers"></questionAnswers>
    
    <div v-for="(annotationReview, index) in annotationReviews" v-show="showRow[index].show">

        {{annotationReview.review_text}}
        <div class="wrapper">
          <button @click="submitRow(index, annotationReview.id, questionAnswer.answer, questionAnswer.id)"    v-for="questionAnswer in questionAnswers">
            {{questionAnswer.answer}}
        </div>
    </div> 
    <div class="center">
      <button @click="submit()" id="annotation">Submit</button>
    </div>
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
     annotationSubmit: {annotationIds: [], reviewsResult: [], reviewsResultId: []}
     
    }
  },


    mounted: function(){

  },
  methods: {
      eventAnnotation: function(annotationReviews) {
        this.annotationReviews = annotationReviews;
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
      },

      submit: function(){

        var that = this;
        var formData = new FormData();
        formData.append('user_id', window.sessionStorage.getItem('user_id'));
        formData.append('annotationIds', this.annotationSubmit.annotationIds);
        formData.append('reviewsResult', this.annotationSubmit.reviewsResult);
        formData.append('reviewsResultId', this.annotationSubmit.reviewsResultId);    

        axios({
          method: 'POST',
          url: 'http://localhost:9010/Annotation/annotationSubmit',
          data: formData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (response) {
            console.log('[.] Success : ', response);
            that.annotationSubmit.annotationIds = [];
            that.annotationSubmit.reviewsResult = [];
            that.annotationSubmit.reviewsResultId = [];

  
        })
        .catch(function (error) {
          console.log('[.] Fail : ',error.response.data);
          alert(error.response.data);
        });
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
