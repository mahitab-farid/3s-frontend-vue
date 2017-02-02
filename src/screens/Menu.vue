<template>
  <div id="menu">
    <annotation></annotation>
    <questionAnswers></questionAnswers>

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
      good: 'hello'
    }
  },


    mounted: function(){
      console.log("hello",this.annotationReviews);
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
