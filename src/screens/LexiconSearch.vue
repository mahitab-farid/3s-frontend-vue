<template>
  <div class="lexiconSearch">
    <headerComponent></headerComponent>
    <LexiconSearchComponent></LexiconSearchComponent>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent'
import LexiconSearchComponent from '../components/LexiconSearchComponent'
export default {
  name: 'lexiconSearch',
  components: {
   HeaderComponent,LexiconSearchComponent
  },
  data () {
    return {

    }
  },
  methods:{

}
}
</script>


<style scoped>

</style>