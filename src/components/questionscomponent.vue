<template>
  <div class="questiontable">
<i id="addquestion" class="fa fa-plus" aria-hidden="true" @click="addRow(newitem)"></i>
    <div>

      <table class="table table-hover table-bordered" >
      <thead>
        <tr class="active">
          <th>question_id</th>
          <th>question_code</th>
          <th>text</th>
          <th>edit</th>
          <th>delete</th>
          <th>save</th>
          <th>possible answers</th>
          <th>try</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="(row, index) in questions " :id="row.id">
          <td>{{row.id}}</td>
          <td>{{row.question_code}}</td>
          <td> 
            <span v-show="!row.visible"  >{{row.question_text}}</span>
            <input v-show="row.visible" type="text" v-model="row.question_kind">
          </td>
          <td v-on:click="show3(row)"><i class="fa fa-pencil" aria-hidden="true"></i></td>
          <td v-on:click="deletee(row.id)"><i class="fa fa-trash" aria-hidden="true"></i></td>
          <td v-on:click="save(row.id,row.description,row.question_kind,row)"><i class="fa fa-floppy-o" aria-hidden="true" ></i>
          </td>
          <td v-on:click="showanswer(row.id,row)"><button>show answer</button></td>
          <td>{{row.answers[0].answer}}</td>
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
  props: ['newitem'],
  mounted: function(){
    this.getQuestions();
  },
  methods: {
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

      /*
      axios.get('/Delete', {
      params: {
      id: deleteid,

      }
      })
      .then(function (response) {

      console.log(response);
      })
      .catch(function (error) {
      console.log(error);
      });
      */
    },

    save: function (id,description,question_kind,questions) {
      console.log("id  "+id);
      console.log("description  "+description);
      console.log("question_kind "+question_kind);
      //console.log("visibility is"+questions.visible);
      questions.visible=false;
      console.log("visibility is"+questions.visible);
      /*
      axios.get('/Save', {
      params: {
      id: id,
      description:description,
      question_kind:question_kind,

      }
      })
      .then(function (response) {

      console.log(response);

      })
      .catch(function (error) {
      console.log(error);
      });
      */
    },
    show3:function(value){
      value.visible = true;

    },
    setPage: function(pageNumber) {
      this.currentPage = pageNumber;
      console.log(pageNumber);
    }
    ,
    showanswer:function(questionId,question){
      //console.log("id_question befor "+ this.id_question)
      this.id_question=questionId;
      // console.log("id_question is "+ this.id_question)
      // console.log("show table is "+ this.showtable)

      this.showtable=true;
      this.$emit('show')
      
      // bus.$emit('show', questionId, this.showtable)

    },

    addRow: function (newitem) {
      try {
        console.log("result is"+newitem);
        this.newitem.push({visible:true});

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
      questions:[]

    }


}
}

</script>

<style lang="css">


</style>