<template>
  

  <div class="annotation">
    <li v-for="annotationReview in annotationReviews">
      {{ annotationReview.review_text }}
    </li>
  </div>
</template>

<script>


export default {
  
  name: 'annotation',
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
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
            
        }

    }

}

</script>
