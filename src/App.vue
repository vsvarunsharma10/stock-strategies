<template>

  <div class="common-layout">
    <el-container>
      <template v-if="showLoginScreen">
        <Login :showLoginScreen=showLoginScreen>  </Login>
      </template>
      <template v-else>
        <el-aside width="200px">Aside</el-aside>
        <el-main><Dashboard > </Dashboard></el-main>
      </template>
    </el-container>
  </div>

</template>


<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

export default {
    components:{Login, Dashboard},
    data(){
        return{
          showLoginScreen: false,
        }
    },
    created(){
      this. does_token_exists(); // Check if token exists if not show login screen
    },
    methods:{
      does_token_exists(){
        let token = localStorage.getItem("token");
        if(token && token.length > 0) this.showLoginScreen = false;
        else this.showLoginScreen = true;

      }
    }
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
