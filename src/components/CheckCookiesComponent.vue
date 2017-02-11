<template>

  <div class="checkCookiesComponent">

  </div>
</template>

<script>


export default {
  
  name: 'CheckCookiesComponent',
  components: {},
  data () {
    return {
 
      currentUser: {
          id: '',
          accessToken: '',
          userName: '' 
      }

    }
  },
          mounted: function(){
            
            this.checkCookie();
          },
      
          methods: {

            redirection: function(){
              
                  window.sessionStorage.setItem('user_id', this.currentUser.id);
                  window.sessionStorage.setItem('accessToken', this.currentUser.accessToken);
                  window.sessionStorage.setItem('userName', this.currentUser.userName);
                  window.location.replace("../../menu.html");
            } , 

            setCookie:function(cname,cvalue,exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays*24*60*60*1000));
                var expires = "expires=" + d.toGMTString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            },

            getCookie: function(cname) {
                var name = cname + "=";
                var decodedCookie = decodeURIComponent(document.cookie);
                var ca = decodedCookie.split(';');
                for(var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return "";
            },

            checkCookie: function() {

                var user = this.getCookie("userName");
                console.log('user: ',user);
                if (user != "") {
                    this.$emit('check_cookies', true);
                    this.currentUser.id = this.getCookie("userId");
                    this.currentUser.accessToken = this.getCookie("accessToken");
                    this.currentUser.userName = this.getCookie("userName");
                    this.redirection();
                }
            }
     }
}
</script>

<style>

</style>