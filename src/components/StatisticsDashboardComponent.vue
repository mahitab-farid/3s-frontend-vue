<template>
  
  <div id="statisticsDashboardComponent">
      <H3 class="center">USERS STATISTICS</H3>
    
    <table style="width:100%">
      <thead>
      <tr>
        <th>Name</th>
        <th>Number of annotation reviews</th>
        <th>Number of checker reviews</th>
        <th>Number of lexicons reviews</th>
        <th>Avg annotation/min</th>
        <th>Avg checking/min</th>
        <th>Avg lexicons/min</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="usersStatistic in usersStatistics">
          <td>{{usersStatistic.user_name}}</td>
          <td>{{usersStatistic.numOfAnnotationReviews}}</td>
          <td>{{usersStatistic.numOfChecksReviews}}</td>
          <td>{{usersStatistic.numOfLexiconsReviews}}</td>
          <td>{{usersStatistic.avgAnnotationTime}}</td>
          <td>{{usersStatistic.avgCheckingTime}}</td>
          <td>{{usersStatistic.avgLexiconsTime}}</td>
        </tr>
        </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'statisticsDashboardComponent',
  components: {
    
  },
 
  data(){
    return{
      usersStatistics: [] 
    }
  },


  mounted: function(){
    this.getUsersStatistics();
  },

  methods: {
    getUsersStatistics: function(){

      var that = this;                           
      axios.get('http://localhost:9010/administration/statisticsDashboard', {
   
        })
        .then(function (response) {
        console.log(response.data)
          that.usersStatistics = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }      
  }

}

</script>

<style>
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
</style>
