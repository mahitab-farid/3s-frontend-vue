<template>
  <div id="home">
    <menuComponent></menuComponent>
    <statisticsDashboardComponent></statisticsDashboardComponent>


  </div>
</template>

<script>

import StatisticsDashboardComponent from '../components/StatisticsDashboardComponent'
import MenuComponent from '../components/MenuComponent'

export default {
  name: 'home',
  components: {
    StatisticsDashboardComponent, MenuComponent
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
