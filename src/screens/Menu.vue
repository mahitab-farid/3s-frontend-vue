<template>
  <div id="menu">
    <annotation v-on:event_child="eventChild"></annotation>
    <questionAnswers></questionAnswers>
    
    {{annotationReviews}}
  </div>
</template>

<script>

import Annotation from '../components/Annotation'
import QuestionAnswers from '../components/QuestionAnswers'

export default {
  name: 'menu',
  components: {
    Annotation, QuestionAnswers
  },
 
  data(){
    return{
     annotationReviews: []
    }
  },
    created(){
        this.$on('event_parent', function(annotationReviews){
           console.log('Event from parent component emitted', annotationReviews);
        });
    },

    mounted: function(){

      console.log("nabil",this.annotationReviews);
  },
  methods: {
      eventChild: function(annotationReviews) {
        this.annotationReviews = annotationReviews;
        console.log('Event from child component emitted', annotationReviews);
      }
  }




}

</script>

<style>
#menu {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
