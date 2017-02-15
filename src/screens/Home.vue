<template>
  <div id="home">
    <logoutComponent></logoutComponent>
    <menuComponent></menuComponent> 
      "home"
  </div>
</template>

<script>

import MenuComponent from '../components/MenuComponent'
import LogoutComponent from '../components/LogoutComponent'

export default {
  name: 'home',
  components: {
     MenuComponent, LogoutComponent
  },
 
  data(){
    return{
     
    }
  },


    mounted: function(){

  },
  methods: {

  }

}

</script>

<style>

</style>
