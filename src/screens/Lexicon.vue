<template>
  <div id="lexicon">
    <div v-for="(lexicon, index) in lexicons" v-show="showRow[index].show">
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
    <lexiconsComponent v-on:event_lexicons="eventLexicons" :lexiconsSubmit="lexiconsSubmit"></lexiconsComponent>
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
     showRow: [],
     lexiconsSubmit: {lexiconsIds: [], wordsEdits: [], lexiconsTypeIds: []}
     
    }
  },


    mounted: function(){

  },
  methods: {
      eventLexicons: function(lexicons) {
        this.lexicons = lexicons;
        this.showRow = [];
        var show = '';
        for (var i = 0; i < lexicons.length; i++) {
             this.showRow.push({show: true});
        }
        
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
          this.showRow[index].show=false;
          
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
