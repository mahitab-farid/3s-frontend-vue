<template>
  <div id="app">
    <checkCookiesComponent v-on:check_cookies="checkCookies"></checkCookiesComponent>
    <login v-if="!isInCookies"></login>
    {{check}}
  </div>
</template>

<script>
import Hello from '../components/Hello'
import Login from '../components/Login'
import CheckCookiesComponent from '../components/CheckCookiesComponent'

export default {
  name: 'app',
  components: {
    Hello, Login, CheckCookiesComponent
  },
  data(){
    return {
      isInCookies:false
    }
  },

  methods:{

    checkCookies: function(isInCookies) {
        this.isInCookies = isInCookies;
        console.log('Event from checkCookies component emitted', isInCookies);
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
