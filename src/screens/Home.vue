<template>
  <div id="home">
    <headerComponent></headerComponent>
    <menuComponent></menuComponent> 
      <h1><center><font color="red">WELCOME IN NLP-NEW-SYSTEM</font></center></h1>
  </div>
</template>

<script>

import MenuComponent from '../components/MenuComponent'
import HeaderComponent from '../components/HeaderComponent'

export default {
  name: 'home',
  components: {
     MenuComponent, HeaderComponent
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
