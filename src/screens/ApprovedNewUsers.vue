<template>
  <div  id="approvedNewUsers">
   <div class="page-header">
     
  </div>
       <div class="container">
  <!--     <div v-for="(unapprovedUser, index) in unapprovedUsers" v-show="showRow[index].show">
         <div class="Pageright"> 
          <p>user name: {{unapprovedUser.user_name}}</p>  
          <p>email: {{unapprovedUser.email}}</p> 
          <p>phone: {{unapprovedUser.phone}}</p>
         </div> 
          <div id="linksdiv">   
              <a href="javascript:void(0)" @click="showTab(unapprovedUser.id)">Roles</a>
          </div>
          <button id="answersbutton" class="btn btn-primary" style="float: right;" @click="approvedUser(unapprovedUser.id, index)">Approved</button>
          
          <br></br>
            
      </div>
       -->
       <table class="table table-striped"  width="100%">
       <tbody>
                   <tr class="info">
                   <th>image</th>
                   <th>Name</th>
                   <th>email</th>            
                    <th>phone</th>
                    <th>Role</th>
                    <th>approved</th>
                   </tr>
                   
                   <tr v-for="(unapprovedUser, index) in unapprovedUsers" v-show="showRow[index].show">
                    <td>
                   <img src="../assets/user.png" width="60px">
                   </td>
                    <td>
                     {{unapprovedUser.user_name}}
                    </td>
                   <td>
                      {{unapprovedUser.email}}
                   </td>
                  
                    <td>
                     {{unapprovedUser.phone}}
                    </td>
              
                    <td>
                    <a href="javascript:void(0)" @click="showTab(unapprovedUser.id)">Roles</a>
                    </td>
                    <td>
                   <button class="btn btn-primary" @click="approvedUser(unapprovedUser.id, index)">Approved</button> 
                    </td>
               
                   </tr>
         </tbody>
       </table>

      <div id="light" class="white_content">
      <a id="closelink" href="javascript:void(0)" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'" style="float:right">X</a>
      <h3 style="text-align:center">Roles</h3>
        <assignedRolesComponent :user_id="currentUserId"></assignedRolesComponent>
       
      </div>
      <div id="fade" class="black_overlay"></div>
  
      <unapprovedUsersComponent v-on:event_unapprovedUsers="eventUnapprovedUsers"></unapprovedUsersComponent>
      
</div>

  </div>
</template>

<script>

import UnapprovedUsersComponent from '../components/UnapprovedUsersComponent'
import AssignedRolesComponent from '../components/AssignedRolesComponent'


export default {
  name: 'approvedNewUsers',
  components: {
    UnapprovedUsersComponent, AssignedRolesComponent
  },
 
  data(){
    return{
      unapprovedUsers: [],
      showRow: [],
      currentUserId: ''
    }
  },


    mounted: function(){

  },
  methods: {
      eventUnapprovedUsers: function(unapprovedUsers) {
        this.unapprovedUsers = unapprovedUsers;
        this.showRow = [];
        for (var i = 0 ; i < unapprovedUsers.length ; i++)
          this.showRow.push({'show': true}); 

        console.log('Event from unapproved component emitted', unapprovedUsers);
      },

      approvedUser: function(id, index){
        this.showRow[index].show = false;
        var that = this;
        var formData = new FormData();
        formData.append('id', id);
   
        axios({
          method: 'POST',
          url: 'http://localhost:9010/user/approvedUser',
          data: formData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (response) {
            console.log('[.] Success : ', response);

        })
        .catch(function (error) {
          console.log('[.] Fail : ',error.response.data);
          alert(error.response.data);
        });
      },

    showTab: function(user_id){
      this.currentUserId = user_id;
      document.getElementById('light').style.display='block';
      document.getElementById('fade').style.display='block';
    } 
  }

}

</script>

<style scoped>
#approvedNewUsers {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  margin-top: 45px;
  padding-top: 12px;


}


.Wrapper {
    text-align: center;
}

.center {
    text-align: center;
}



.approved{
  height:200px;
  /*width:1170px;*/
  overflow:scroll;
  background-color:#F6F6F6;
  text-align: center;
  width:1600px;
   margin:20px auto;
   font-size: 20px
}

.Pageright{
 
 

}

#answersbutton{
  margin: 2px;
  margin-top: -68px;
  margin-right: 100px;
  height: 44px;
}


  ul.tab {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
}

/* Float the list items side by side */
ul.tab li {float: left;}

/* Style the links inside the list items */
ul.tab li a {
    display: inline-block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    transition: 0.3s;
    font-size: 17px;
}

/* Change background color of links on hover */
ul.tab li a:hover {background-color: #ddd;}

/* Create an active/current tablink class */
ul.tab li a:focus, .active {background-color: #ccc;}

/* Style the tab content */
.tabcontent {
    display: none;
    padding: 6px 12px;
  
    border-top: none;
}
.black_overlay {
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 1001;
  -moz-opacity: 0.8;
  opacity: .80;
  filter: alpha(opacity=80);
}
.white_content {
  display: none;
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
  padding: 16px;
  border: 8px solid red;
  background-color: white;
  z-index: 1002;
  overflow: auto;
}
#closelink{
  padding: 5px;
  font-size: 19px;
}

#linksdiv{
  text-align:center;
  margin-top:-60px ;
  font-size: 21px;
  margin-top: -80px;
}
.table{
      margin: -13px;
      font-size: 18px
}
.page-header{
 margin: -77px 0 20px;
 background-color: #D3D3D3;
 height: 107px;
}

</style>
