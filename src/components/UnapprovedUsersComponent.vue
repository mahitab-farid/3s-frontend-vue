<template>
  <div class="UnapprovedUsersComponent">
    
  </div>
</template>

<script>
  
export default {
  name: 'UnapprovedUsersComponent',
  components: {},
  data () {
    return {
      unapprovedUsers: []
    }
  },

  mounted: function(){
      this.getAllUnprovedUsers();
  },

  methods: {

    getAllUnprovedUsers: function(){

      var that = this;
                                 
      axios.get('http://localhost:9010/user/getAllUnapprovedUsers', {
       
        })
        .then(function (response) {
          console.log('response: ',response);                    
          if (response.status == 204){
            alert('There is No Unapproved Users!');
          }else{

            that.unapprovedUsers = response.data;
            that.$emit('event_unapprovedUsers', response.data);
          }
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
