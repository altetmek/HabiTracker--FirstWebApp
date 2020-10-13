<template>
  <div id="app">
    <b-button v-b-toggle.sidebar-1>Pages</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          <b-link v-if="!show" href="/">Home</b-link>
        </p>
        <p>
          <b-link v-if="show" href="UserPage">User Page</b-link>
        </p>
        <p>
          <b-link v-if="show" href="UserDisplay">UserDisplay Page</b-link>
        </p>
        <p>
          <b-link v-if="show" href="BudgetPage">Budget Page</b-link>
        </p>
        <p>
          <b-link v-if="show" href="BudgetDisplay">BudgetDisplay Page</b-link>
        </p>
        <p>
          <b-link v-if="show" href="AchievementPage">Achievement Page</b-link>
        </p>
        <p>
          <b-link v-if="show" href="AchievementDisplay">AchievementDisplay Page</b-link>
        </p>
        <p>
          <b-link v-if="show" href="CategoryDisplay">CategoryDisplay Page</b-link>
        </p>
        <p>
          <b-link v-on:click="signOut()" v-if="show" href="/">Sign Out</b-link>
        </p>
      </div>
    </b-sidebar>
    <!-- Render the content of the current page view -->
    <!-- @logged-in is the v-on:logged-in which was created in $emit from Homepage, since homepage is one of its children-->
    <router-view v-bind:loggedIn="loggedIn" v-bind:logging="logging"  @logged-in="changelogInfo" />
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
    // method called when the child homepage emits the 'loggedIn' related information that if the user successfully loggedIn through UserloginItem
    changelogInfo(payload) {
      if (payload) {
        this.show = true
        this.loggedIn = true
        this.logging = false
      } else {
        this.show = false
        this.loggedIn = false
        this.logging = true
      }
    },
    checkLogin() {
      var loggad = cookiesC.getCookieValue('loggedIn')
      if (loggad) {
        this.show = true
        this.loggedIn = true
        this.logging = false
      }
    },
    signOut() {
      this.show = false
      this.loggedIn = false
      this.logging = true
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
