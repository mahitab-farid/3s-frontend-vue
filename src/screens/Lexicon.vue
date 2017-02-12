<template>
  <div id="lexicon">
    <button id="answersbutton" style="float: left;" class="btn btn-primary" @click="getPrevious()">Previous</button>
    <div v-for="(lexicon, index) in lexicons">
      <div :id="'wordEdit'+index" class="lexiconWord" >
        <div id="wordEdit" contenteditable="true">
        {{lexicon.word}}
        </div>
      </div>
      <div class="lexiconWrapper">
        
        <button id="answersbutton" class="btn btn-primary" @click="submitRow(index, lexicon.id, lexiconAnswersType.id)"    v-for="lexiconAnswersType in lexiconAnswersTypes" v-bind:style="{ backgroundColor: lexiconAnswersType.color}">
          
          {{lexiconAnswersType.type}}

      </div>
    </div> 
    <lexiconsComponent v-on:event_lexicons="eventLexicons" :lexiconsSubmit="lexiconsSubmit" :numOfLexicons="numOfLexicons"></lexiconsComponent>
    <lexiconAnswersTypesComponent v-on:event_lexiconAnswersTypes="eventLexiconAnswersTypes"></lexiconAnswersTypesComponent>
  </div>
</template>

<script>

import LexiconsComponent from '../components/LexiconsComponent'
import LexiconAnswersTypesComponent from '../components/LexiconAnswersTypesComponent'

export default {
  name: 'lexicon',
  components: {
    LexiconsComponent, LexiconAnswersTypesComponent
  },
 
  data(){
    return{
     lexicons: [],
     lexiconAnswersTypes: [],
     previousLexiconStack: [],
     numOfLexicons: 0,
     lexiconsSubmit: {lexiconsIds: [], wordsEdits: [], lexiconsTypeIds: []}
     
    }
  },


    mounted: function(){

  },
  methods: {
      eventLexicons: function(lexicons) {
        this.numOfLexicons = lexicons.length;
        this.lexicons = lexicons;
        
        console.log('Event from lexicons component emitted', lexicons);
      },

        eventLexiconAnswersTypes: function(lexiconAnswersTypes) {
          this.lexiconAnswersTypes = lexiconAnswersTypes;
          console.log('Event from lexiconAnswersTypes component emitted', lexiconAnswersTypes);
      },

      submitRow: function(index, lexiconId, lexiconAnswerTypeId){
          console.log(index, lexiconId, lexiconAnswerTypeId);
         
          var wordEdit = $('#wordEdit'+index).text().trim();
          console.log(wordEdit);
          this.lexiconsSubmit.lexiconsIds.push(lexiconId);
          this.lexiconsSubmit.wordsEdits.push(wordEdit);
          this.lexiconsSubmit.lexiconsTypeIds.push(lexiconAnswerTypeId);
          this.lexicons[index].word = wordEdit;
          this.previousLexiconStack.push(this.lexicons[index]);
          this.lexicons.splice(index, 1);
          this.numOfLexicons -= 1;
      },
      getPrevious: function(){

        if(this.previousLexiconStack.length != 0){
            this.lexicons.unshift(this.previousLexiconStack.pop());      // add at the begininig of array
            this.numOfLexicons += 1;
            console.log('submit: ', this.lexiconsSubmit.lexiconsIds.length);
            if(this.lexiconsSubmit.lexiconsIds.length != 0){
              this.lexiconsSubmit.lexiconsIds.pop();
              this.lexiconsSubmit.wordsEdits.pop();
              this.lexiconsSubmit.lexiconsTypeIds.pop();
            }
            return;
        }
          alert('No Previous data!');   
    }
  }

}

</script>

<style scoped>
#lexicon {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 45px;
  padding-top: 12px;


}

.lexiconWrapper {
    text-align: center;
}

.center {
    text-align: center;
}


.lexiconWord{
  height:50px;
  /*width:1170px;*/
 // overflow:scroll;
  //background-color:#F6F6F6;
  text-align: center;
  width:1600px;
   margin:20px auto;
   font-size: 40px
}

#answersbutton{
margin: 2px;
}
</style>
