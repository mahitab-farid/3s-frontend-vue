<template>
  <div class="topLexiconCheckersComponent">
    <table class="table table-bordered table-striped" style="background: #66ff66;border-radius:30px;">
      <thead>
      <tr>
        <th colspan="4"><i class="fa fa-arrow-right fa-lg" aria-hidden="true"></i>Top Lexicon Checkers</th>
      </tr>
        <tr>
          <th></th>
          <th>#</th>
          <th>User Name</th>
          <th>Lexicons</th>

        </tr>
      </thead>
      <tbody v-for="(topLexiconChecker, index) in topLexiconCheckers">
        <tr style="background: #b3fff0;">
           <th scope="row"><img src="../assets/user.png" width="40"></th>
          <th>{{index+1}}</th>
          <td style="margin-right:30px;">{{topLexiconChecker.user_name}}</td>
          <td>{{topLexiconChecker.lexicons}}</td>
       
        </tr>

     
      </tbody>
</table>


  </div>
</template>

<script>
  
export default {
  name: 'topLexiconCheckersComponent',
  components: {},
  data () {
    return {
      topLexiconCheckers: []
    }
  },

  mounted: function(){
      this.getTopLexiconCheckers();
  },

  methods:{
    getTopLexiconCheckers: function(){
      var that = this;                           
      axios.get(window.hostname + '/administration/topLexiconCheckers', {
        })
        .then(function (response) {
            that.topLexiconCheckers = response.data;
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
