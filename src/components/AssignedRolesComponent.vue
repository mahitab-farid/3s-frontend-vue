<template>
  <div class="assignedRolesComponent">
    <div v-for="(role,index) in roles">
        <input type="checkbox" name="role" :id="index" :value="role.id">{{role.role_name}}<br>
    </div>
     <a href="javascript:void(0)" @click="resetCheckBoxes()" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'">Close</a>
    <button @click="assignedRoles()">Assigned</button>
  </div>
</template>

<script>
  
export default {
  name: 'assignedRolesComponent',
  components: {},
  data () {
    return {
      roles : [],
      AllAssignedRoles: []
    }
  },

  props: ['user_id'],

  mounted: function(){
      this.getRoles();
  },

  methods: {

      getRoles: function(){

          var that = this;
                                 
          axios.get('http://localhost:9010/roles/getRoles', {
           
            })
            .then(function (response) {
              console.log('response: ',response);                    
                that.roles = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

      },

      getSelectedBoxes: function(){
          this.AllAssignedRoles = [];
          var that = this;
          $('input:checked').each(function() {
               // To pass this value to its nearby hidden input
                that.AllAssignedRoles.push($(this).next('input').val(this.value).prevObject[0]._value);          
          });

      },

      assignedRoles: function(){
        this.getSelectedBoxes();

        if (this.AllAssignedRoles.length == 0)
            return;

        
        var that = this;
        var formData = new FormData();
        formData.append('userId', this.user_id);
        formData.append('rolesIds', this.AllAssignedRoles);
      
        axios({
          method: 'POST',
          url: 'http://localhost:9010/roles/assignedRoles',
          data: formData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (response) {
            console.log('[.] Success : ', response);
            alert(response.data);

        })
        .catch(function (error) {
          console.log('[.] Fail : ',error.response.data);
          alert(error.response.data);
        });
    },
    resetCheckBoxes: function(){
        for(var i = 0; i< this.roles.length; i++){
            document.getElementById(i).checked = false;
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}



</style>
