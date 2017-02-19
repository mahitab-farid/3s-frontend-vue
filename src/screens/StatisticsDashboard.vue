F<template>
  
  <div id="statisticsDashboard">
      <headerComponent></headerComponent>
      <H3 class="center">USERS STATISTICS</H3>
    
    <table style="width:100%">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Number of annotation reviews</th>
        <th>Number of checker reviews</th>
        <th>Number of lexicons reviews</th>
        <th>Avg annotations/min</th>
        <th>Avg checks/min</th>
        <th>Avg lexicons/min</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(usersStatistic, index) in usersStatistics">
            
          <td>{{index + 1}}</td>  
          <td> <a href="javascript:void(0)" @click="showTab(usersStatistic.user_id, usersStatistic.user_name)">{{usersStatistic.user_name}}</a></td>
          <td>{{usersStatistic.numOfAnnotationReviews}}</td>
          <td>{{usersStatistic.numOfChecksReviews}}</td>
          <td>{{usersStatistic.numOfLexiconsReviews}}</td>
          <td>{{usersStatistic.avgAnnotationTime}}</td>
          <td>{{usersStatistic.avgCheckingTime}}</td>
          <td>{{usersStatistic.avgLexiconsTime}}</td>
        </tr>
        </tbody>
    </table>
    
    <div id="light" class="white_content"><h3>{{currentUser.name}}'s Statistics</h3>
      <ul class="tab">
        <li><a href="javascript:void(0)" class="tablinks" @click="tabWrite(event, 'Annotation Statistics')">Annotation Statistics</a></li>
        <li><a href="javascript:void(0)" class="tablinks" @click="tabWrite(event, 'Checks Statistics')">Checks Statistics</a></li>
        <li><a href="javascript:void(0)" class="tablinks" @click="tabWrite(event, 'Lexicons Statistics')">Lexicons Statistics</a></li>
      </ul>

      <div id="Annotation Statistics" class="tabcontent">
        <annotationUserStatisticsComponent :user_id="currentUser.id"></annotationUserStatisticsComponent>
      </div>

      <div id="Checks Statistics" class="tabcontent">
        <checksUserStatisticsComponent :user_id="currentUser.id"></checksUserStatisticsComponent>
      </div>

      <div id="Lexicons Statistics" class="tabcontent">
        <lexiconsUserStatisticsComponent :user_id="currentUser.id"></lexiconsUserStatisticsComponent>
      </div> 

      <a href="javascript:void(0)" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">Close</a>
    </div>
    <div id="fade" class="black_overlay"></div>
 
  </div>
</template>

<script>

import AnnotationUserStatisticsComponent from '../components/AnnotationUserStatisticsComponent.vue';
import ChecksUserStatisticsComponent from '../components/ChecksUserStatisticsComponent.vue';
import LexiconsUserStatisticsComponent from '../components/LexiconsUserStatisticsComponent.vue';
import MenuComponent from '../components/MenuComponent'
import HeaderComponent from '../components/HeaderComponent'

export default {
  name: 'statisticsDashboard',
  components: {
    AnnotationUserStatisticsComponent, ChecksUserStatisticsComponent, LexiconsUserStatisticsComponent, MenuComponent, HeaderComponent
  },
 
  data(){
    return{
      usersStatistics: [],
      currentUser: {id: '', name: ''}
    }
  },


  mounted: function(){
    this.getUsersStatistics();
  },

  methods: {
    getUsersStatistics: function(){

      var that = this;                           
      axios.get(window.hostname + '/administration/allUsersStatisticsDashboard', {
   
        })
        .then(function (response) {
          console.log(response.data)
          that.usersStatistics = response.data;
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
      document.getElementById('light').style.display='block';
      document.getElementById('fade').style.display='block';
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
</style>
