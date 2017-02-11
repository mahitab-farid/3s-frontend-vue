<template>
  <div class="lexiconComponent">
    <div class="center">

      <button class="btn btn-info" @click="submit()" id="lexicon">Submit</button>
      <button class="btn btn-info" @click="getLexicons()" id="lexicon">Get Next</button>
      
    </div>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </div>
</template>

<script>
export default {
  
  name: 'lexiconComponent',
  components: {},
  props: ['lexiconsSubmit'],
  data () {
    return {
      lexicons: []
    }
  },
      
  mounted: function(){
    this.getLexicons();
  },

  methods: {

        getLexicons: function(){

                  var that = this;
                                             
                  axios.get('http://localhost:9010/lexicon/getAssignedLexicons', {
                      params: {
                        user_id: window.sessionStorage.getItem('user_id')
                      }
                    })
                    .then(function (response) {
                      console.log('response: ',response);                    
                      if (response.status == 204){
                        alert('There is No lexicons!');
                        }

                      that.lexicons = response.data;
                      that.$emit('event_lexicons', response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

        },

      submit: function(){

        if (this.lexiconsSubmit.lexiconsIds.length == 0){
             alert("There is no data to fetch !");
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
          url: 'http://localhost:9010/lexicon/submitLexicon',
          data: formData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (response) {
            console.log('[.] Success : ', response);
            that.lexiconsSubmit.lexiconsIds = [];
            that.lexiconsSubmit.wordsEdits = [];
            that.lexiconsSubmit.lexiconsTypeIds = [];
            
        })
        .catch(function (error) {
          console.log('[.] Fail : ',error.response.data);
          alert(error.response.data);
        });
      }

    }

}

</script>

<style>
#lexiconComponent{

}

</style>
