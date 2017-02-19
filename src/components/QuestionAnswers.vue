<template>
	<div class="questionAnswers">

  </div> 
</template>



<script> 
export default {     
name: 'questionAnswers',
data(){
    return {
        questionAnswers: []
    } 
},

mounted: function(){
	this.getQuestionAnswers();
},
methods:{       
	getQuestionAnswers: function(){

      var that = this;                           
      axios.get(window.hostname + '/questions/getQuestionAnswers', {
          params: {
            question_code: 'positivity'
          }
        })
        .then(function (response) {
          that.questionAnswers = response.data;
          that.$emit('event_questionAnswers', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
	}
}
}
</script>