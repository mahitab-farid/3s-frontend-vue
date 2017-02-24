<template>
  <div class="wrongAnnotationTab">
    <H3 class="center">Wrong Annotations</H3>
    <table style="width:100%">
      <thead>
      <tr>
        <th>#</th>
        <th>Review</th>
        <th>Annotator Answer</th>
        <th>Checker Name</th>
        <th>Checker Answer</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(wrongAnnotation, index) in wrongAnnotations">
          <td>{{index + 1}}</td>  
          <td> {{wrongAnnotation.review_text}}</td>
          <td>{{wrongAnnotation.annotator_answer}}</td>
          <td>{{wrongAnnotation.checker_name}}</td>
          <td>{{wrongAnnotation.checker_answer}}</td>

        </tr>
        </tbody>
    </table>  

  </div>
</template>

<script>
 
export default {
  name: 'wrongAnnotationTab',
  components: {},
  data () {
    return {
      wrongAnnotations: []
    }
  },

 props: ['annotator_id'],

 watch:{
  'annotator_id': {
      handler: function (newData, oldData) {
        this.getWrongAnnotations(newData);
      },
      deep: true
    }
 },

 methods:{
    getWrongAnnotations:function(annotator_id){

      var that = this;                           
      axios.get(window.hostname + '/annotation/wrongAnnotations', {
            params:{
              annotator_id: annotator_id
            }
        })
        .then(function (response) {
            that.wrongAnnotations = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

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
