<template>
	<div class="lexiconAnswersType">

  </div> 
</template>



<script> 
export default {     
name: 'lexiconAnswersType',
data(){
    return {
        lexiconAnswers: []
    } 
},

mounted: function(){
	this.getLexiconsAnswersTypes();
},
methods:{       
	getLexiconsAnswersTypes: function(){

      var that = this;                           
      axios.get('http://localhost:9010/lexicon/getLexiconsType', {

        })
        .then(function (response) {
          that.lexiconAnswers = response.data;
          that.$emit('event_lexiconAnswersTypes', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
	}
}
}
</script>