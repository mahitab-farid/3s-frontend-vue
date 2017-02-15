<template>
  <div id="adminHome">
    <logoutComponent></logoutComponent>
    <menuComponent></menuComponent> 
        "admin home"
  </div>
</template>

<script>

import MenuComponent from '../components/MenuComponent'
import LogoutComponent from '../components/LogoutComponent'

export default {
  name: 'adminHome',
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
