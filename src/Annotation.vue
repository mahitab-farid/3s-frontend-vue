<template>
  <div id="annotation">
    <login></login>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Login from './components/Login'

export default {
  name: 'annotation',
  components: {
    Hello, Login
  }
}
</script>

<style>
#annotation {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

