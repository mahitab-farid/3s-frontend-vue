<template>
  <div class="annotationComponent">
    {{computedAnnotationSubmit}}
    <div   style="margin-left:840px;margin-top:300px">

      <button class="btn btn-info" @click="getAnnotationReviews()" id="annotation">Get Next</button>
      
    </div>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  </div>
</template>

<script>
export default {
  
  name: 'annotationComponent',
  components: {},
  props: ['annotationSubmit', 'numOfReviews'],
  data () {
    return {
      annotationReviews: []

    }
  },
      
  mounted: function(){
    this.getAnnotationReviews();
  },

  computed:{
    computedAnnotationSubmit: function(){
          console.log('hello: ',this.numOfReviews);
        if (this.numOfReviews == 0 ){
            this.submit();
        }
    }
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
                      console.log('response: ',response);                    
                      if (response.status == 204){
                        alert('There is No reviews!');
                      }else{

                        that.annotationReviews = response.data;
                        that.numOfReviews = response.data.length;
                        that.$emit('event_annotation', response.data);
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

        },

      submit: function(){
        console.log('bolbol',this.annotationSubmit.annotationIds.length);
        if (this.annotationSubmit.annotationIds.length == 0)
            return;

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
#annotationComponent{

}

</style>
