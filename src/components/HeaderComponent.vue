<template>
  <div class="headerComponent">
    <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
     
     <!--      <div class="menubar"> -->
          <li id="mymenu"><menuComponent></menuComponent></li>
          <li v-if="admin"><a href="../adminHome.html" ><i class="fa fa-home fa-lg" aria-hidden="true"></i></a></li>
          <li v-if="!admin"><a href="../home.html" ><i class="fa fa-home fa-lg" aria-hidden="true"></i></a></li>
          <li><a href="#">{{userName}}</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
       <!--  </div>  --> 
        </ul>
        <form class="navbar-form navbar-left" id="search">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
         
          <a href="#" @click="logout()">Logout &nbsp; <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i></a>
       
        </ul>
      
    <!--   <ul class="nav navbar-nav navbar-right">
        <li> <a href="#">Login <i class="fa fa-sign-in" aria-hidden="true"></i> </a></li>
        <li> |<a href="#">Signup <i class="fa fa-user-plus" aria-hidden="true"></i></a>
          </li>
        </ul> -->
      </div>
    </div>
  </nav>

  </div>
</template>

<script>
import LogoutComponent from '../components/LogoutComponent'
import MenuComponent from '../components/MenuComponent'
export default {
  name: 'headerComponent',
  components: {LogoutComponent, MenuComponent},
  data () {
    return {
        roles: [],
        admin: false,
        annotator: false,
        checker: false,
        lexicon_checker: false,
        userName: window.sessionStorage.getItem('userName')
    }
  },
  mounted: function(){
      this.roles = window.sessionStorage.getItem('roles');
      var rolesArray = this.roles.substring(1, this.roles.length-1).split(',');
        
      for (var i = 0 ; i < rolesArray.length; i++){
          var role = rolesArray[i].substring(1, rolesArray[i].length-1);
          
          if(role == 'Admin'){
              this.admin = true;
          }
          else if (role == 'Annotator'){
                this.annotator = true;
          }
          else if (role == 'Checker'){
                this.checker = true;
          }
          else if (role == 'Lexicon_checker'){
                this.lexicon_checker = true;
          }

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
<style type="text/css" scoped>
  .headerComponent{
    background-color: #0000ff;
  }
  #search{

  }

  .container-fluid {
    padding-top: 17px;
    background-color: #ff99ff;
  } 
  .navbar-default .navbar-nav>li>a {
      color: #777;
      font-size: 20px;

  }
  .navbar-right {
      padding-top: 9px;
      padding-bottom: 15px;
      font-size: 21px;
  }
 #mymenu{
  padding-right: 17px;
 }

</style>