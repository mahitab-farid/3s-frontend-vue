<template>
  <div class="questiontable">
<i id="addquestion" class="fa fa-plus fa-lg" aria-hidden="true" @click="addRow(questions)"></i>
    <div>

      <table  id="rowClick" class="table table-hover table-bordered" >
      <thead>
        <tr class="active">
          <th>#</th>
          <th>question_id</th>
          <th>question_code</th>
          <th>text</th>
          <th>edit</th>
          <th>delete</th>
          <th>save</th>
          <th>possible answers</th>
        </tr>
      </thead>
      <tbody class="member">
        <tr  v-for="(row, index) in questions " :id="row.id">
          <td>{{index}}</td>
          <td>{{row.id}}</td>
          <td>
           <span v-show="!row.visible">{{row.question_code}}</span>
            <input v-show="row.visible" type="text" v-model="row.question_code">
          </td>
          <td> 
             <span v-show="!row.visible"  >{{row.question_text}}</span>
            <input v-show="row.visible" type="text" v-model="row.question_text">
          </td>
          <td v-on:click="edit(row)"><i class="fa fa-pencil" aria-hidden="true"></i></td>
          <td v-on:click="deletee(row.id)"><i class="fa fa-trash" aria-hidden="true"></i></td>
          <td v-on:click="checkId(row.id,row.question_text,row.question_code,row,index)"><i class="fa fa-floppy-o" aria-hidden="true" ></i>
          </td>
          <td v-on:click="showanswer(row.id,row.answers)"><button>show answer</button></td>
        </tr>
      </tbody>
      </table>

      <paginate
      :pageCount="10"
      :clickHandler="clickCallback"
      :prevText="'Prev'"
      :nextText="'Next'"
      :containerClass="'pagination'">
      </paginate>
    </div>
  
  </div>
</template>

<script>
import axios from 'axios'

export default {

  name: 'questionscomponent',
  mounted: function(){
    this.getQuestions();
  },
  methods: {
    checkId:function(rowId,question_text,question_code,row,index){
      if(rowId == null){
        this.insertRow(question_text,question_code,row,index);
      }
      else{

        this.updateRow(rowId,question_text,question_code,row,index);
      }
    },
    insertRow:function(question_text,question_code,row,index){
      var that=this;
      row.visible=false;
      var formData = new FormData();
      formData.append('question_text', question_text);
      formData.append('question_code', question_code)
      axios({
        method: 'POST',
        url: window.hostname + '/questions/addQuestion',
        data: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
         that.key=response.data;
         that.questions[index].id=that.key;
         that.questions[index].answers=[]
         that.$forceUpdate();
         console.log("index id is"+ index);
         console.log("my key is",that.key);

      })
      .catch(function (error) {
         console.log('[.] Fail : ',error);
         alert(error);
      });

    },

    updateRow:function(rowId,question_text,question_code,row,index){
      var that=this;
      row.visible=false;
      that.$forceUpdate();
      console.log("qiuestion is id and code and text",rowId,question_text,question_code)
      var formData = new FormData();
      formData.append('question_text', question_text);
      formData.append('question_code', question_code) ; 
      formData.append('question_id', rowId) ;                       
      axios({
        method: 'POST',
        url: window.hostname + '/questions/editQuestion',
        data: formData
        ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        console.log("response"+response.data);
      })
      .catch(function (error) {
        console.log('[.] Fail : ',error.response.data);
        alert(error.response.data);
      });
    },   

    getQuestions: function(){
      var that = this;
      axios.get(window.hostname+'/questions/getAllQuestionsWithAnswers', {
      params: {
      }
      })
      .then(function (response) {
        console.log('response: ',response);                    
        if (response.status == 204){
        alert('There is No questions!');
        }else{
        that.questions = response.data;
        that.questions.forEach(function(element){
        element['visible']=false;
        });
        // that.$emit('event_questions', response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    clickCallback: function (pageNum) {
      console.log('### page number: ', pageNum)
    },
    deletee: function (deleteId) {
      console.log("id is"+deleteId);
      document.getElementById(deleteId).style.display="none";
      var that=this;
      var formData = new FormData();
      formData.append('question_id', deleteId);

      axios({
        method: 'POST',
        url: window.hostname + '/questions/deleteQuestion',
        data: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        console.log("deleted")

      })
        .catch(function (error) {
        console.log('fail ');
      });
    },

    edit:function(row){
      var vm=this;
      row.visible=true;
      vm.$forceUpdate();
      console.log("visible is "+row.visible)
    },
    showanswer:function(questionId,questionAnswers){
  
      this.showtable=true;
      console.log("question answer in quesstion component is "+questionAnswers)
      console.log("question id is ",questionId)
      this.$emit('event_questions', questionId);
      this.$emit('show',this.showtable);
      this.$emit('event_questionanswers',questionAnswers);
      $("tbody tr").click(function() {
      $(this).addClass('selected').siblings().removeClass("selected");
});

    },
    addRow: function (questions) {
      try {
        console.log("result is"+questions);
        this.questions.push({visible:true});
      }
      catch(e)
      {
      console.log(e);
      }

    }
  }
  ,
  data(){
    return{
      showtable:false,
      questions:[],
      allvisible:'',
      key:''
    }

    }
}

</script>

<style lang="css">
.member tr.selected {
    background-color: rgba(41, 103, 182, 0.89);
    color: black;
}


</style>