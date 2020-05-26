<template>
  <div id="app">
    <LogInPrompt :name="userInfo.name" :mail="userInfo.mail" :password="userInfo.password" v-on:loginAttempt="attemptLogin"  />
    <LogInHistory :attempts="userLoginData" />
  </div>
</template>

<script>
import LogInPrompt from "./components/LogInPrompt"
import LogInHistory from "./components/LogInHistory"

export default {
  name: 'App',
  components: {
    LogInPrompt,
    LogInHistory
  },
  data() {
      return {
        userInfo: {name: '', mail: '', password: ''},
        userLoginData: []
      }
  }, 
  methods: {
    attemptLogin(credentials) {
      this.userLoginData.push({'state': 'ERROR', 'userInfo': window.navigator.userAgent, 'dateTime': new Date(), })
      this.userInfo = credentials;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
