<template>
  <div class="sign-up-htm">
    <div class="group">
      <label for="user" class="label">Username</label>
        <input id="user" type="text" class="input" v-model="user_name">
    </div>

    <div class="group">
      <label for="pass" class="label">Password</label>
      <input id="pass" type="password" class="input" data-type="password" v-model="password">
    </div>
    <div class="group">
      <label for="pass" class="label">Repeat Password</label>
      <input id="pass" type="password" class="input" data-type="password" v-model="repeated_password">
    </div>
    <div class="group">
      <label for="pass" class="label">Email Address</label>
      <input id="pass" type="text" class="input" v-model="email">
    </div>
    <div class="group">
      <label for="pass" class="label">Telephone</label>
      <input id="pass" type="tel" class="input" v-model="phone">
    </div>
    <div class="group">
      <input type="submit" @click="signup" class="button" value="Sign Up">
    </div>
    <div class="hr"></div>
    <div class="foot-lnk">
      <label for="tab-1">Already Member?</a>
    </div>
  </div>
</template>

<script>

export default {
  
  name: 'Signup',
  data () {
    return {
      user_name: '',
      password: '',
      repeated_password: '',
      email: '',
      phone: '',
      currentUser: {
        id: '',
        accessToken: '',
        userName: '' 
      }
    }
  },
  
  methods: {
    redirection: function(){
      
      window.sessionStorage.setItem('user_id', this.currentUser.id);
      window.sessionStorage.setItem('accessToken', this.currentUser.accessToken);
      window.sessionStorage.setItem('userName', this.currentUser.userName);
      
    } ,
    signup: function(){
      if (this.validateInputs()){
                  var that = this;
                  
                  var formData = new FormData();
                  formData.append('user_name', this.user_name);
                  formData.append('password', this.password);
                  formData.append('email', this.email);
                  formData.append('phone', this.phone);

                           
                  axios({
                    method: 'POST',
                    url: 'http://localhost:9010/administration/signup',
                    data: formData,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                  })
                  .then(function (response) {
                      console.log('[.] Success : ', response);

                      that.currentUser.id = response.data.user_id;
                      that.currentUser.accessToken = response.data.access_token;
                      that.currentUser.userName = response.data.user_name;

                      that.redirection();
                     
                  })
                  .catch(function (error) {
                    alert('User Exist before!');
                  });
      }
    },

    validateInputs: function(){
      if (this.user_name.length == 0){
          alert('please enter your user name!');
          return false;
      }
      if (this.email.length == 0){
          alert('please enter your email!');
          return false;
      }
      if (this.password.length < 3){
          alert('password is very week !');
          return false;     
      }
      if (this.password != this.repeated_password){
          alert('password not same repeated password !');
          return false;
      }
      if(!(/^\d+$/.test(this.phone)) || this.phone.length < 7){
          alert('Invalid phone number !');
          return false;
      }
      var x = this.email;
      var atpos = x.indexOf("@");
      var dotpos = x.lastIndexOf(".");

      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid e-mail address");
        return false;
      }

      return true;
    }
  }
}
</script>
