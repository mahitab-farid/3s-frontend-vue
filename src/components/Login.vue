<template>
  <div class="app">
  Email:<br>
  <input type="text" name="email" v-model="email">
  <br>
  Password:<br>
  <input type="password" name="password" v-model="password">
  <br><br>
  <button @click="login()" value="Submit">Login</button>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      response:'',
      email: '',
      password: ''
    }
  },
      
          methods: {
            login: function(){

                  var formData = new FormData();
                  formData.append('email', this.email);
                  formData.append('password', this.password);
                           
                  this.$http.post('http://localhost:9000/administration/login',formData, {headers:{'Content-Type':'application/x-www-form-urlencoded','Content-Type': 'multipart/form-data'}}).then(response => {
                        console.log(response);
                    }, response => {
                  console.log(response,"aaaaaaaa");
                    // error callback
                  });
            }
        }
}
</script>
