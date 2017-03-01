<template>
  <div id="adminHome">
    <headerComponent></headerComponent>
    <div class="row">
      <div class="col-lg-4" style="">
        <div class="dropdown" style="">
            <h2 style="margin-left:170px">Annotation Statistics</h2>
            <div style="margin-left:265px;">
            <button @click="showDropDownMenu('myDropdown1')" class="dropbtn">{{currentAnnotationQuestion}}     </button>
              <div id="myDropdown1" class="dropdown-content">
                <div v-for="AnnotationQuestion in AnnotationQuestions">
                  <a href="#" @click="displayAnnotationChart(AnnotationQuestion)">{{AnnotationQuestion}}</a>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class="col-lg-4" style="">
        <div class="dropdown" style="">
            <h2 style="margin-left:170px">Check Reviews Statistics</h2>
            <div style="margin-left:265px;">
            <button @click="showDropDownMenu('myDropdown2')" class="dropbtn">{{currentCheckQuestion}}     </button>
              <div id="myDropdown2" class="dropdown-content">
                <div v-for="checkQuestion in checkQuestions">
                  <a href="#" @click="displayCheckChart(checkQuestion)">{{checkQuestion}}</a>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class="col-lg-4" style="">
            <h2 style="margin-left:170px">Lexicons Statistics</h2>
      </div>
    
    </div>
    <div class="row">
      <div class="col-lg-4">
        <doughuntChartComponent :width="250" :height="250" style="" :labels="annotationLabel" :data="AnnotationData" :colors="annotationColors"></doughuntChartComponent>
      </div>
      <div class="col-lg-4">
        <doughuntChartComponent :width="250" :height="250" style="" :labels="checkLabel" :data="checkData" :colors="checkColors"></doughuntChartComponent>
      </div>
      <div class="col-lg-4">
        <doughuntChartComponent :width="250" :height="250" style="" :labels="lexiconsLabel" :data="lexiconsData" :colors="lexiconsColors"></doughuntChartComponent>
      </div>
    </div>
    <div class="row">
        <div class="col-lg-4">
          <topAnnotatorsComponent style="margin-left:100px;margin-top:100px;"></topAnnotatorsComponent>
        </div>  
        <div class="col-lg-4">
          <topCheckersComponent style="margin-left:100px;margin-top:100px;"></topCheckersComponent>
        </div>  
        <div class="col-lg-4">
          <topLexiconCheckersComponent style="margin-left:100px;margin-top:100px;"></topLexiconCheckersComponent>
        </div> 
    </div>
  </div>
</template>

<script>

import MenuComponent from '../components/MenuComponent'
import LogoutComponent from '../components/LogoutComponent'
import DoughuntChartComponent from '../components/DoughuntChartComponent'
import TopAnnotatorsComponent from '../components/TopAnnotatorsComponent'
import TopCheckersComponent from '../components/TopCheckersComponent'
import HeaderComponent from '../components/HeaderComponent'
import TopLexiconCheckersComponent from '../components/TopLexiconCheckersComponent'

export default {
  name: 'adminHome',
  components: {
     MenuComponent, LogoutComponent, DoughuntChartComponent, TopAnnotatorsComponent, TopCheckersComponent, TopLexiconCheckersComponent, HeaderComponent
  },
 
  data(){
    return{
      annotationLabel: ['Number Of Undone Reviews', 'Number Of Done Reviews Annotations'],
      annotationColors: ['#c40909', '#0000FF'],
      annotationDataMap: new Object(),
      AnnotationQuestions: [],
      AnnotationData: [0,0],
      currentAnnotationQuestion: 'select question',

      checkLabel: ['Number Of Undone Reviews', 'Number Of Done Reviews checks'],
      checkColors: ['#c40909', '#196f3d'],
      checkDataMap: new Object(),
      checkQuestions: [],
      checkData: [0,0],
      currentCheckQuestion: 'select question',

      lexiconsLabel: ['Number Of Undone Lexicons', 'Number Of Done Lexicons'],
      lexiconsColors: ['#c40909', '#f2e80a'],
      lexiconsData: [0,0]



    }
  },

  mounted: function(){
      this.annotationReviewsStatistics();
      this.checkReviewsStatistics();
      this.lexiconsStatistics();
  },
  methods: {

    annotationReviewsStatistics: function(){
      var that = this;                           
      axios.get(window.hostname + '/administration/getAnnotationsReviewsStatistics', {
        })
        .then(function (response) {

            that.annotationDataMap = new Object();
            
            for (var i = 0; i < response.data.totalNumberOfAnnotations.length; i++){
              that.annotationDataMap[response.data.totalNumberOfAnnotations[i].question_text] = [response.data.numOfReviews - response.data.totalNumberOfAnnotations[i].count, response.data.totalNumberOfAnnotations[i].count]; 
              that.AnnotationQuestions.push(response.data.totalNumberOfAnnotations[i].question_text);
              that.currentAnnotationQuestion = response.data.totalNumberOfAnnotations[i].question_text;
              that.AnnotationData = [response.data.numOfReviews - response.data.totalNumberOfAnnotations[i].count, response.data.totalNumberOfAnnotations[i].count];
            }


          console.log('hello: ', that.annotationDataMap['pos']);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    checkReviewsStatistics: function(){
      var that = this;                           
      axios.get(window.hostname + '/administration/getCheckReviewsStatistics', {
        })
        .then(function (response) {

            that.checkDataMap = new Object();
            
            for (var i = 0; i < response.data.totalNumberOfChecks.length; i++){
              
              that.checkDataMap[response.data.totalNumberOfChecks[i].question_text] = [response.data.numOfReviews - response.data.totalNumberOfChecks[i].count, response.data.totalNumberOfChecks[i].count]; 
              that.checkQuestions.push(response.data.totalNumberOfChecks[i].question_text);
              that.currentCheckQuestion = response.data.totalNumberOfChecks[i].question_text;
              that.checkData = [response.data.numOfReviews - response.data.totalNumberOfChecks[i].count, response.data.totalNumberOfChecks[i].count];
            }


          console.log('hello: ', that.checkDataMap['pos']);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    lexiconsStatistics: function(){
      var that = this;                           
      axios.get(window.hostname + '/administration/getLexiconsStatistics', {
        })
        .then(function (response) {
            that.lexiconsData = [response.data.totalNumberOfLexicons - response.data.numOfDoneLexicons, response.data.numOfDoneLexicons];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    showDropDownMenu: function(id) {
      document.getElementById(id).classList.toggle("show");
    },

    displayAnnotationChart: function(question_code){

      this.AnnotationData = this.annotationDataMap[question_code];
      this.currentAnnotationQuestion = question_code;

      window.onclick = function(event) {
          if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
      }
    },

    displayCheckChart: function(question_code){

      this.checkData = this.checkDataMap[question_code];
      this.currentCheckQuestion = question_code;

      window.onclick = function(event) {
          if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
      }
    },

    displayLexiconsChart: function(question_code){

      this.lexiconsData = this.lexiconsDataMap[question_code];
      this.currentLexiconsQuestion = question_code;

      window.onclick = function(event) {
          if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
      }
    }
  }

}

</script>

<style>
  .dropbtn {
      background-color: #4CAF50;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
      cursor: pointer;
  }

  .dropbtn:hover, .dropbtn:focus {
      background-color: #3e8e41;
  }

  .dropdown {
      position: relative;
      display: inline-block;
  }

  .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      overflow: auto;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
  }

  .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }

  .dropdown a:hover {background-color: #f1f1f1}

  .show {display:block;}
</style>
