
<template>
  <div id="lexiconAnnotatorsStatisticsTable">
        <H3 class="center">Lexicon Annotators STATISTICS</H3>
       
        <div class="datePicker1">
          <label id="fromlabel">From </label>
          <datepickercomponent class="A"  v-model="fromDate"></datepickercomponent>
        </div>

        <div class="datePicker2">
          <label id="tolabel">to </label>
          <datepickercomponent class="B"  v-model="toDate"></datepickercomponent>
        </div>

	    <table style="width:100%">
	      <thead>
	      <tr>
	        <th>#</th>
	        <th>Name</th>
	        <th>Number of checking reviews</th>
	        <th>Avg checks/min</th>
	      </tr>
	      </thead>
	      <tbody>
	        <tr v-for="(annotatorsStatistic, index) in annotatorsStatistics">
	            
	          <td>{{index + 1}}</td>  
	          <td> <a href="javascript:void(0)" @click="showTab(annotatorsStatistic.annotator_id, annotatorsStatistic.user_name)">{{annotatorsStatistic.user_name }}</a></td>
	          <td>{{annotatorsStatistic.checking_reviews}}</td>
	          <td>{{annotatorsStatistic.avgCheckingTime}}</td>
	        </tr>
	      </tbody>
	    </table>
      <div id="light5" class="white_content"><h3>{{currentUser.name}}'s Statistics</h3>
        <ul class="tab">
          <li><a href="javascript:void(0)" class="tablinks" @click="tabWrite(event, 'lexicon_annotators_Statistics')">Lexicons Statistics</a></li>
        </ul>

      <div id="lexicon_annotators_Statistics" class="tabcontent">
        
        <lexiconsUserStatisticsComponent :user_id="currentUser.id"></lexiconsUserStatisticsComponent> 
      </div>

      <a href="javascript:void(0)" onclick="document.getElementById('light5').style.display='none';document.getElementById('fade5').style.display='none'">Close</a>
    </div>
    <div id="fade5" class="black_overlay"></div>
  </div>
</template>


<script>
import LexiconsUserStatisticsComponent from './LexiconsUserStatisticsComponent.vue';
import datepickercomponent from 'vue-date'
export default {
  name: 'lexiconAnnotatorsStatisticsTable',
  components: {
       LexiconsUserStatisticsComponent, datepickercomponent
  },

  props: [],
 
  data(){
    return{
      fromDate: '2016-10-16',
      toDate:'2016-10-28',
      annotatorsStatistics: [],
      currentUser: {id: '', name: ''}
    }
  },

    watch: {
  'fromDate': {
      handler: function (newData, oldData) {
          this.getLexiconAnnotatorsStatistics();
      },
      deep: true
    },


    'toDate' : {
        handler: function (newData, oldData) {
             this.getLexiconAnnotatorsStatistics();
        },
        deep: true
    }

  },
 
  mounted: function(){
  	this.getLexiconAnnotatorsStatistics();
  },
  methods: {


     getLexiconAnnotatorsStatistics: function(){

      var that = this;                           
      axios.get(window.hostname + '/administration/usersLexiconStatisticsOverTime', {
            params:{
              from: that.fromDate,
              to: that.toDate
            }
        })
        .then(function (response) {
          that.annotatorsStatistics = [];
          for (var i = 0; i < response.data.length; i++){
            var avgCheckingTime = response.data[i].count * 60.0 ;
            if (response.data[i].timeSum !== 0) 
              avgCheckingTime /= response.data[i].timeSum;
            
            that.annotatorsStatistics.push({user_name: response.data[i].user_name, checking_reviews: response.data[i].count, avgCheckingTime: avgCheckingTime, annotator_id: response.data[i].annotator_id})
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    },

     tabWrite: function(evt, cityName) {
      
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
     
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(cityName).style.display = "block";
       // evt.currentTarget.className += " active";
    },
    showTab: function(userId, userName){
      document.getElementById('light5').style.display='block';
      document.getElementById('fade5').style.display='block';
      console.log('user_id: ', userId);
      this.currentUser.id = userId;
      this.currentUser.name = userName;
    }
  }

}    

</script>




<style type="text/css" scoped>
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

  ul.tab {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Float the list items side by side */
ul.tab li {float: left;}

/* Style the links inside the list items */
ul.tab li a {
    display: inline-block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of links on hover */
ul.tab li a:hover {background-color: #ddd;}

/* Create an active/current tablink class */
ul.tab li a:focus, .active {background-color: #ccc;}

/* Style the tab content */
.tabcontent {
    display: none;
    padding: 6px 12px;
  
    border-top: none;
}
.black_overlay {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: .80;
  filter: alpha(opacity=80);
}
.white_content {
  display: none;
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  padding: 16px;
  border: 16px solid orange;
  background-color: white;
  z-index: 1002;
  overflow: auto;
}
.hide-replaced.ws-inputreplace {
    display: none !important;
}
.input-picker .picker-list td > button.othermonth {
    color: #888888;
    background: #fff;
}
.ws-inline-picker.ws-size-2, .ws-inline-picker.ws-size-4 {
    width: 49.6154em;
}
.ws-size-4 .ws-index-0, .ws-size-4 .ws-index-1 {
    border-bottom: 0.07692em solid #eee;
    padding-bottom: 1em;
    margin-bottom: 0.5em;
}
.picker-list.ws-index-2, .picker-list.ws-index-3 {
    margin-top: 3.5em;
}
div.ws-invalid input {
    border-color: #c88;
}
.ws-invalid label {
    color: #933;
}
div.ws-success input {
    border-color: #8c8;
}
form {
    margin: 10px auto;
    width: 700px;
    min-width: 49.6154em;
    border: 1px solid #000;
    padding: 10px;
}
.form-row {
    padding: 5px 10px;
    margin: 5px 0;
}
label {
    display: block;
    margin: 3px 0;
}
.form-row input {
    width: 220px;
    padding: 3px 1px;
    border: 1px solid #ccc;
    box-shadow: none;
}
.form-row input[type="checkbox"] {
    width: 15px;
}
.date-display {
    display: inline-block;
    min-width: 200px;
    padding: 5px;
    border: 1px solid #ccc;
    min-height: 1em;
}
.show-inputbtns .input-buttons {
    display: inline-block;
}

.A{
    width: 11%;  
    float: left;
    font-size: 14px;
}
.B{
   width: 11%;  
    float: left;
    font-size: 14px;
}
#fromlabel{
  float:left;
 padding: 6px;
}
#tolabel{
  float:left;
      padding: 6px;
}
</style>
