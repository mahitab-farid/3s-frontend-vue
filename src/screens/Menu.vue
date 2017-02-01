<template>
  <div id="menu">
    <annotation></annotation>
  </div>
</template>

<script>

import Annotation from '../components/Annotation'

export default {
  name: 'menu',
  components: {
    Annotation
  }
}
</script>

<style>
#menu {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
