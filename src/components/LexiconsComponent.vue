<template>
  <div class="lexiconComponent">
        {{computedLexiconsSubmit}}
    <div class="center">
      <button   id="lexicon" class="btn btn-primary" style="margin-top:300px" @click="getLexicons()">Get Next</button>
    
    </div>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </div>
</template>

<script>
export default {
  
  name: 'lexiconComponent',
  components: {},
  props: ['lexiconsSubmit', 'numOfLexicons'],
  data () {
    return {
      lexicons: []
    }
  },
      
  mounted: function(){
    this.getLexicons();
  },

  computed:{
    computedLexiconsSubmit: function(){
        if (this.numOfLexicons == 0 ){
            this.submit();
        }
    }
  }, 
  methods: {

        getLexicons: function(){

                  var that = this;
                                             
                  axios.get(window.hostname + '/lexicon/getAssignedLexicons', {
                      params: {
                        user_id: window.sessionStorage.getItem('user_id')
                      }
                    })
                    .then(function (response) {
                      console.log('response: ',response);                    
                      if (response.status == 204){
                        alert('There is No lexicons!');
                      }else{

                        that.lexicons = response.data;
                        console.log(response.data[0].word);
                        that.numOfLexicons = response.data.length;
                        that.$emit('event_lexicons', response.data);
                      }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

        },

      submit: function(){

        if (this.lexiconsSubmit.lexiconsIds.length == 0){
             return;
        }
        var that = this;
        var formData = new FormData();
        formData.append('user_id', window.sessionStorage.getItem('user_id'));
        formData.append('lexiconsIds', this.lexiconsSubmit.lexiconsIds);
        formData.append('wordsEdits', this.lexiconsSubmit.wordsEdits);
        formData.append('lexiconsTypeIds', this.lexiconsSubmit.lexiconsTypeIds);    

        axios({
          method: 'POST',
          url: window.hostname + '/lexicon/submitLexicon',
          data: formData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (response) {
            console.log('[.] Success : ', response);
            that.lexiconsSubmit.lexiconsIds = [];
            that.lexiconsSubmit.wordsEdits = [];
            that.lexiconsSubmit.lexiconsTypeIds = [];
            that.numOfLexicons = 0;
        })
        .catch(function (error) {
          console.log('[.] Fail : ',error.response.data);
          alert(error.response.data);
        });
      }

    }

}

</script>

<style scoped>
#lexiconComponent{

}
#lexicon{

}
.center{
  text-align: center
}

</style>
