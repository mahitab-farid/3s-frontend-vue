<template>
  
  <div id="annotationUserStatisticsComponent">
      {{computedUserAnnotationStats}}
    <div v-for="userAnnotationStatistic in userAnnotationStatistics">
     {{userAnnotationStatistic.count}} Annotation reviews   in   {{userAnnotationStatistic.date}}
    </div>  
  </div>
</template>


<script>

export default {
  name: 'annotationUserStatisticsComponent',
  components: {
    
  },

  props: ['user_id'],
 
  data(){
    return{
      userAnnotationStatistics: []
    }
  },

  computed:{
    computedUserAnnotationStats: function(){
        this.getUserAnnotationStatistics();
    }
  },


  methods: {


    getUserAnnotationStatistics: function(){

      var that = this;                
      axios.get('http://localhost:9010/administration/getUserAnnotationStatistics', {

                      params: {
                        user_id: that.user_id
                      }
        })
        .then(function (response) {
          that.userAnnotationStatistics = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
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
