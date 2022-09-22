<template>

  <el-dialog v-model="showLoginScreen" title="Login Screen">
    <el-form :model="form">
      <el-form-item label="Client ID" :label-width="formLabelWidth">
        <el-input v-model="form.clientID" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="API Key" :label-width="formLabelWidth">
        <el-input v-model="form.apiKey" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="fetch_token"
          >Login</el-button
        >
      </span>
    </template>
  </el-dialog>

</template>


<script>
  import Api from "../services/Api.js";
  

  export default {
    props: ["showLoginScreen"],
    data: function(){
        return {
            formLabelWidth: "140px",
            form: {
                clientID: "",
                password: "",
                apiKey: ""
            }
        }
    },
    methods:{
      fetch_token(){
        let vm = this;

        Api().post(
          "/rest/auth/angelbroking/user/v1/loginByPassword",
          {
            "clientcode": vm.form.clientID,
            "password": vm.form.password
          },
          {
            headers : {
            'X-UserType': 'USER',
            'X-SourceID': 'WEB',
            'X-ClientLocalIP': 'CLIENT_LOCAL_IP',
            'X-ClientPublicIP': 'CLIENT_PUBLIC_IP',
            'X-MACAddress': 'MAC_ADDRESS',
            'X-PrivateKey': vm.form.apiKey
            }
          }
        )
        .then(function (response) {
          let data = response.data.data;
          localStorage.setItem("token", data.jwtToken);
          localStorage.setItem("api_key", vm.form.apiKey);
          location.reload();
          
          })
        .catch(function (error) {
          alert("Getting called unnesseary")
          console.log(error);
        });

      }
    }
  }

</script>