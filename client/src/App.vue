<template>
  <div id="app">
    <b-button v-b-toggle.sidebar-1>Pages</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          <b-link href="/">Home</b-link>
        </p>
        <p>
          <b-link href="UserPage">User Page</b-link>
        </p>
        <p>
          <b-link href="UserDisplay">UserDisplay Page</b-link>
        </p>
        <p>
          <b-link href="BudgetPage">Budget Page</b-link>
        </p>
        <p>
          <b-link href="BudgetDisplay">BudgetDisplay Page</b-link>
        </p>
        <p>
          <b-link href="AchievementPage">Achievement Page</b-link>
        </p>
        <p>
          <b-link href="AchievementDisplay">AchievementDisplay Page</b-link>
        </p>
        <p>
          <b-link href="CategoryDisplay">CategoryDisplay Page</b-link>
        </p>
        <p>
          <b-link v-on:click="signOut()" v-if="!show" href="">Sign Out</b-link>
        </p>
      </div>
    </b-sidebar>
    <!-- Render the content of the current page view -->
    <router-view v-bind:loggedIn="loggedIn" v-bind:logging="logging"  @logged-In="changeloggedIn($event)" @logg-ing="changeLogging($event)" />
  </div>
</template>

<script>
import cookiesC from './cookies/cookies'

export default {
  data() {
    return {
      show: false,
      loggedIn: false,
      logging: true
    }
  },
  methods: {
    changeloggedIn(payload) {
      this.loggedIn = payload.loggedIn
      console.log(payload)
      // console.log(this.loggedIn + 'After change Root')
    },
    changeLogging(payload) {
      this.logging = payload.logging
      // console.log(this.logging + 'After change Root')
    },
    checkLogin() {
      var login = cookiesC.getCookieValue('loggedIn')
      if (login === true) {
        this.show = true
      } else {
        this.show = false
      }
    },
    signOut() {
      this.show = false
      var obj = JSON.parse(cookiesC.getCookieObj())
      cookiesC.setCookies(obj, -1)
    }
  },
  mounted() {
    this.checkLogin()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
