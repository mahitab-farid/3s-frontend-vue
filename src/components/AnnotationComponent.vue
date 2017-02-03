<template>
  <div class="annotationComponent">
    <div class="center">
      <button @click="submit()" id="annotation">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  
  name: 'annotationComponent',
  components: {},
  props: ['annotationSubmit'],
  data () {
    return {
      annotationReviews: []
    }
  },
      
  mounted: function(){
    this.getAnnotationReviews();
  },

  methods: {

        getAnnotationReviews: function(){

                  var that = this;
                                             
                  axios.get('http://localhost:9010/annotation/getAssignedAnnotationReviews', {
                      params: {
                        user_id: window.sessionStorage.getItem('user_id'),
                        question_code: 'pos'
                      }
                    })
                    .then(function (response) {
                      that.annotationReviews = response.data;
                      that.$emit('event_annotation', response.data);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

        },

      submit: function(){

        var that = this;
        var formData = new FormData();
        formData.append('user_id', window.sessionStorage.getItem('user_id'));
        formData.append('annotationIds', this.annotationSubmit.annotationIds);
        formData.append('reviewsResult', this.annotationSubmit.reviewsResult);
        formData.append('reviewsResultId', this.annotationSubmit.reviewsResultId);    

        axios({
          method: 'POST',
          url: 'http://localhost:9010/Annotation/annotationSubmit',
          data: formData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (response) {
            console.log('[.] Success : ', response);
            that.annotationSubmit.annotationIds = [];
            that.annotationSubmit.reviewsResult = [];
            that.annotationSubmit.reviewsResultId = [];

            that.getAnnotationReviews();

            
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
#annotationComponent{

}

</style>
