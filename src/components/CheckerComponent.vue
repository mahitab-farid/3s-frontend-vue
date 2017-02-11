<template>
  <div class="checkerComponent">
    {{computedChecksSubmit}}
    <div class="center">
      <button @click="getCheckReviews()" id="NextReviews">Get Next</button>
    </div>
  </div>
</template>

<script>
export default {
  
  name: 'checkerComponent',
  components: {},
  props: ['checkerSubmit', 'numOfReviews'],
  data () {
    return {
      checkerReviews: []
    }
  },
      
  mounted: function(){
    this.getCheckReviews();
  },

  computed:{
    computedChecksSubmit: function(){
        console.log('hello: ',this.numOfReviews);
        if (this.numOfReviews == 0 ){
            this.submit();
        }
    }
  },

  methods: {

        getCheckReviews: function(){

                  var that = this;
                                             
                  axios.get('http://localhost:9010/checker/getAssignedCheckingReviews', {
                      params: {
                        user_id: window.sessionStorage.getItem('user_id'),
                        question_code: 'pos'
                      }
                    })
                    .then(function (response) {
                      if (response.status == 204){
                          alert('There is No reviews!');
                      }
                      else{
                        that.checkerReviews = response.data;
                        that.numOfReviews = response.data.length;
                        that.$emit('event_checker', response.data);
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

        },

      submit: function(){

        if (this.checkerSubmit.checkerIds.length == 0)
             return;
        
        var that = this;
        var formData = new FormData();
        formData.append('user_id', window.sessionStorage.getItem('user_id'));
        formData.append('checkerIds', this.checkerSubmit.checkerIds);
        formData.append('reviewsResult', this.checkerSubmit.reviewsResult);
        formData.append('reviewsResultId', this.checkerSubmit.reviewsResultId);    

        axios({
          method: 'POST',
          url: 'http://localhost:9010/checker/checkSubmit',
          data: formData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (response) {
            console.log('[.] Success : ', response);
            that.checkerSubmit.checkerIds = [];
            that.checkerSubmit.reviewsResult = [];
            that.checkerSubmit.reviewsResultId = [];
            that.numOfReviews = 0;

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
#checkerComponent{

}

</style>
