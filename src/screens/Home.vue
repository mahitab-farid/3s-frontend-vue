<template>
  <div id="home">
    <logoutComponent></logoutComponent>
    <menuComponent></menuComponent> 
      <h1><center><font color="red">WELCOME IN NLP-NEW-SYSTEM</font></center></h1>
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
