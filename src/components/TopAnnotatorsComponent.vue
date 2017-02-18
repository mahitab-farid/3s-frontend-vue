<template>
  <div class="topAnnotatorsComponent">
    <table class="table table-bordered table-striped" style="background: #66ff66;border-radius:30px;">
      <thead>
      <tr>
        <th colspan="4"><i class="fa fa-arrow-right fa-lg" aria-hidden="true"></i>Top Annotators</th>
      </tr>
        <tr>
          <th></th>
          <th>#</th>
          <th>User Name</th>
          <th>Reviews</th>

        </tr>
      </thead>
      <tbody v-for="(topAnnotator, index) in topAnnotators">
        <tr style="background: #b3fff0;">
           <th scope="row"><img src="../assets/user.png" width="40"></th>
          <th>{{index+1}}</th>
          <td style="margin-right:30px;">{{topAnnotator.user_name}}</td>
          <td>{{topAnnotator.reviews}}</td>
       
        </tr>

     
      </tbody>
</table>


  </div>
</template>

<script>
  
export default {
  name: 'topAnnotatorsComponent',
  components: {},
  data () {
    return {
      topAnnotators: []
    }
  },

  mounted: function(){
      this.getTopAnnotators();
  },

  methods:{
    getTopAnnotators: function(){
      var that = this;                           
      axios.get('http://localhost:9010/administration/topAnnotators', {
        })
        .then(function (response) {
            that.topAnnotators = response.data;
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
  .table {
    width: 400px;
    max-width: 100%;
    margin-bottom: 20px;
    border-radius: 15px;
  }
  .table-bordered {
    border: 4px solid white;

  }
  .table>thead>tr>th {
    vertical-align: bottom;
    border-bottom: 2px solid #ddd;
    border-radius: 5px;

  }
</style>
