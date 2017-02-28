<template>
  <div class="LexiconSearch">
    <form >
      <input id="inputbox" type="text" placeholder="word..." v-model="queryWord">
      <input type="button" id="searchButton" class="btn btn-info" value="Search word" @click="submitWord(queryWord)" >
      <input type="button" id="addButton" class="btn btn-info" value="Add word"  @click="Addword(queryWord)">
    </form>
    <br>
    <table  class="table table-bordered table-striped">
      <thead style="text-align:center">
        <tr class="active">
        <tr>
          <th>word</th>
          <th v-for="(lexicon,index) in lexiconAnswers">
           {{ lexicon.type }} 
          </th>
          <th>Remove</th>
        </tr>
      </thead>   
      <tbody>
          <tr v-for="row in tableContent" :id="row.id">
            <td>{{ row.word}}</td>
            <td v-for="(lexicon,index) in lexiconAnswers">
              <input type="radio" :name="'radio_'+row.id" v-bind:id="lexicon.type + '_checkBox_' + row.id" :checked="row.answer_id==lexicon.id"  @click="setLexiconPolarity(row.word,row.id,lexicon.id,lexicon.type)" >
            </td>
            <td><input type="button"  value="Remove" class="btn btn-primary"  @click="removeRow(row.id)"/></td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  name: 'LexiconSearchComponent',
  mounted: function(){
    this.getLexiconsAnswersTypes();
  },
  methods: {
    getLexiconsAnswersTypes: function(){
      var that = this;                           
      axios.get(window.hostname + '/lexicon/getLexiconsType', {
      })
      .then(function (response) {
        that.lexiconAnswers = response.data;
        console.log("answers is"+that.lexiconAnswers);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    submitWord:function(queryword){

      console.log("query word is",queryword)
      var that=this;
      var formData = new FormData();
      formData.append('word', queryword);
             
      axios({
        method: 'POST',
        url: window.hostname + '/lexicon/searchWords',
        data: formData
        ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        that.tableContent= response.data;
        console.log("response is ", response.data)
      })
      .catch(function (error) {
        console.log('[.] Fail : ',error);
      });
    },

    setLexiconPolarity:function(word , id ,lexicon_id, lexicon_type){
      var user_id=window.sessionStorage.getItem('user_id');
      // console.log("query word is",word);
      var that=this;
       console.log("user id is ",user_id);
      console.log("lexicon_type : ", lexicon_type);
      console.log("lexicon_id : ", lexicon_id);
      var formData = new FormData();
      formData.append('reviewer_id', user_id) ; 
      formData.append('reviewer_answer_id', lexicon_id);
      formData.append('lexicon_id', id) ;                       
      axios({
        method: 'POST',
        url: window.hostname + '/lexicon/reviewerSubmitLexicon',
        data: formData
        ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        console.log("response"+response.data);
      })
      .catch(function (error) {
        console.log('[.] Fail : ',error);
      });
    },

    Addword:function(queryword){
      var user_id=window.sessionStorage.getItem('user_id');
      var user_name=window.sessionStorage.getItem('userName');
      console.log("word is ", queryword)
      var that=this;
      var formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('user_name', user_name); 
      formData.append('lexicon', queryword);                     
      axios({
        method: 'POST',
        url: window.hostname + '/lexicon/addLexicon',
        data: formData
        ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
         console.log("response is ",response.data);
        that.tableContent.push({id:response.data,checker_id:'',word:queryword,answer_id:''})
      })
      .catch(function (error) {
        console.log('[.] Fail : ',error);
        console.log("already exist");
      });
    },

    removeRow:function(deleteId){
      console.log("delete id is ", deleteId);
      document.getElementById(deleteId).style.display="none";
      var that=this;
      var formData = new FormData();
      formData.append('lexicon_id', deleteId);                     
      axios({
        method: 'POST',
        url: window.hostname + '/lexicon/deleteLexicon',
        data: formData
        ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        console.log("removed")
      })
      .catch(function (error) {
        console.log('[.] Fail : ',error);
      });
      }
  }

  ,
  data(){
    return{
      queryWord:'',
      tableContent:[],
      lexiconAnswers:[],
      tempPolarity:'',
      staticData:[
        {"word":"حلو",type_id:1,id:1},
        {"word":"اوي",type_id:2,id:2}     
      ],
      type_id:''
    }
    }
}

</script>

<style lang="css">
#inputbox{
  border: 1px solid #ccc;
  padding: 8px 25px;
  margin: 8px 0;
  display: inline-block;
  border-radius: 4px;
  font-size: 15px;
}
#searchButton{
  padding: 9px 12px;
}
#addButton{
  padding: 9px 12px;
}
</style>