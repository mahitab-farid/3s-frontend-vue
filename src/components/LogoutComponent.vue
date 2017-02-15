<template>
  <div class="logoutComponent">
     <div id="right"> 
      <a href="#" @click="logout()">Logout</a>
     </div> 
  </div>
</template>

<script>
 
export default {
  name: 'logoutComponent',
  components: {},
  data () {
    return {
      
    }
  },

  methods:{
      logout: function(){
        var userId = window.sessionStorage.getItem('user_id');
        var accessToken = window.sessionStorage.getItem('accessToken');
        var userName = window.sessionStorage.getItem('userName');
        console.log('user_id: ', userId);
        this.deleteAllCookies();
        window.sessionStorage.removeItem('user_id');
        window.sessionStorage.removeItem('accessToken');
        window.sessionStorage.removeItem('userName');

        window.location.replace("../../index.html");
      },

        deleteAllCookies: function() {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
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

#right{
  margin-left:1750px;
}
</style>
