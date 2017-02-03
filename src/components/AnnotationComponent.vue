<template>
  <div class="annotationComponent">

  </div>
</template>

<script>
export default {
  
  name: 'annotationComponent',
  components: {},
 
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
            
        }

    }

}

</script>
