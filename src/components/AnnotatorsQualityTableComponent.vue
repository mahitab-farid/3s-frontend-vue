<template>
  <div class="annotatorsQualityTableComponent">
    <headerComponent></headerComponent>
    <H3 class="center">Annotators Quality</H3>
    
    <table style="width:100%">
      <thead>
      <tr>
        <th>#</th>
        <th>Annotator</th>
        <th># Total annotations checked</th>
        <th># Right annotations checked</th>
        <th>Quality</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(annotatorQuality, index) in annotatorsQuality">
            
          <td>{{index + 1}}</td>  
          <td> <a href="javascript:void(0)" @click="showTab(numOfRightAnnotationsPerUser[index].annotator_id, numOfRightAnnotationsPerUser[index].annotator_name)">{{numOfRightAnnotationsPerUser[index].annotator_name}}</a></td>
          <td>{{numOfRightAnnotationsPerUser[index].total_num_review}}</td>
          <td>{{numOfRightAnnotationsPerUser[index].right_num_reviews}}</td>
          <td>{{annotatorQuality}} %</td>

        </tr>
        </tbody>
    </table>
    <div id="light1" class="white_content"><h3>{{currentUser.name}}'s Wrong Annotations</h3>
      <ul class="tab">
        <li><a href="javascript:void(0)" class="tablinks" @click="tabWrite(event, 'Wrong_annotations')">Wrong annotations</a></li>
      </ul>

      <div id="Wrong_annotations" class="tabcontent">
        <wrongAnnotationsTab :annotator_id="currentUser.id"></wrongAnnotationsTab>
      </div>

      <a href="javascript:void(0)" onclick="document.getElementById('light1').style.display='none';document.getElementById('fade1').style.display='none'">Close</a>
    </div>
    <div id="fade1" class="black_overlay"></div>
  </div>
</template>

<script>
  import WrongAnnotationsTab from './WrongAnnotationsTab'
export default {
  name: 'annotatorsQualityTableComponent',
  components: {WrongAnnotationsTab},
  data () {
    return {
      numOfRightAnnotationsPerUser:[],
      annotatorsQuality: [],
      currentUser: {id: '', name: ''}
    }
  },
  mounted: function(){
    this.getAnnotatorsQuality();
  },

  methods:{

    getAnnotatorsQuality: function(){

      var that = this;
                                 
      axios.get(window.hostname+'/annotation/numOfRightAnnotation', {
          params: {
          }
        })
        .then(function (response) {
          console.log('response: ',response);                 
            that.numOfRightAnnotationsPerUser = response.data;

            for (var i = 0; i < response.data.length; i++){
                var quality = Math.round(response.data[i].right_num_reviews / response.data[i].total_num_review * 100.0);
                that.annotatorsQuality.push(quality);

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
      document.getElementById('light1').style.display='block';
      document.getElementById('fade1').style.display='block';
      this.currentUser.id = userId;
      this.currentUser.name = userName;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
