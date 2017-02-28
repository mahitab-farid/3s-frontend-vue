<template>
  <div class="topCheckersComponent">
    <table class="table table-bordered table-striped" style="background: #b3b3b3;border-radius:30px;">
      <thead>
      <tr>
        <th colspan="4"><i class="fa fa-arrow-right fa-lg" aria-hidden="true"></i>Top Checkers</th>
      </tr>
        <tr>
          <th></th>
          <th>#</th>
          <th>User Name</th>
          <th>Reviews</th>

        </tr>
      </thead>
      <tbody v-for="(topChecker, index) in topCheckers">
        <tr style="background: #e6e6e6;">
           <th scope="row"><img src="../assets/user.png" width="40"></th>
          <th>{{index+1}}</th>
          <td style="margin-right:30px;">{{topChecker.user_name}}</td>
          <td>{{topChecker.reviews}}</td>
       
        </tr>

     
      </tbody>
</table>


  </div>
</template>

<script>
  
export default {
  name: 'topCheckersComponent',
  components: {},
  data () {
    return {
      topCheckers: []
    }
  },

  mounted: function(){
      this.getTopCheckers();
  },

  methods:{
    getTopCheckers: function(){
      var that = this;                     
      axios.get(window.hostname + '/administration/topCheckers', {

        })
        .then(function (response) {
            that.topCheckers = response.data;
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
    border-radius: 5px
  }
</style>
