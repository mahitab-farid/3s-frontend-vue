<template>
  <div  id="annotation">
    <logoutComponent></logoutComponent>
    <menuComponent></menuComponent>
    <button id="answersbutton" class="btn btn-primary" @click="getPrevious()">Previous</button>
    <div v-for="(annotationReview, index) in annotationReviews">
      <div id="annotate">
        {{annotationReview.review_text}}
      </div>
      <div class="annotationWrapper">
        
        <button id="answersbutton" class="btn btn-primary" @click="submitRow(index, annotationReview.id, questionAnswer.answer, questionAnswer.id)"    v-for="questionAnswer in questionAnswers"  v-bind:style="{ backgroundColor: questionAnswer.color}">
          
          {{questionAnswer.answer}}

      </div>
    </div> 
      <annotationComponent v-on:event_annotation="eventAnnotation" :annotationSubmit="annotationSubmit" :numOfReviews="numOfReviews"></annotationComponent>
      
      <questionAnswers v-on:event_questionAnswers="eventQuestionAnswers"></questionAnswers>
  </div>
</template>

<script>

import AnnotationComponent from '../components/AnnotationComponent'
import QuestionAnswers from '../components/QuestionAnswers'
import MenuComponent from '../components/MenuComponent'
import LogoutComponent from '../components/LogoutComponent'

export default {
  name: 'annotation',
  components: {
    AnnotationComponent, QuestionAnswers, MenuComponent, MenuComponent, LogoutComponent
  },
 
  data(){
    return{
     annotationReviews: [],
     previousAnnotationStack: [],
     questionAnswers: [],
     numOfReviews: 0,
     annotationSubmit: {annotationIds: [], reviewsResult: [], reviewsResultId: []}
     
    }
  },


    mounted: function(){

  },
  methods: {
      eventAnnotation: function(annotationReviews) {
        this.numOfReviews = annotationReviews.length;
        this.annotationReviews = annotationReviews;
  
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
          this.previousAnnotationStack.push(this.annotationReviews[index]);
          this.annotationReviews.splice(index, 1);
          this.numOfReviews -= 1;
          console.log('length: ', this.annotationReviews.length);
      },

      getPrevious: function(){

        if(this.previousAnnotationStack.length != 0){
            this.annotationReviews.unshift(this.previousAnnotationStack.pop());      // add at the begininig of array
            this.numOfReviews += 1;
            console.log('submit: ', this.annotationSubmit.annotationIds.length);
            if(this.annotationSubmit.annotationIds.length != 0){
              this.annotationSubmit.annotationIds.pop();
              this.annotationSubmit.reviewsResult.pop();
              this.annotationSubmit.reviewsResultId.pop();
            }
            return;
        }
          alert('No Previous data!');   
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
 //margin-top: 45px;
  //padding-top: 12px;


}

.annotationWrapper {
    text-align: center;
}

.center {
    text-align: center;
}


#annotate{
  height:200px;
  /*width:1170px;*/
  overflow:scroll;
  background-color:#F6F6F6;
  text-align: center;
  width:1600px;
   margin:20px auto;
   font-size: 20px
}

#answersbutton{
margin: 2px;
}
</style>
