<template>
  <div class ="main bg-dark" id="app">
    <b-button v-b-toggle.sidebar-1>Pages</b-button>
    <b-sidebar id="sidebar-1" title="Menu" bg-variant="dark" backdrop shadow>
      <div class="px-3 py-2">
        <hr v-if="!show" class="my-4">
        <p>
          <b-link v-if="!show" href="/" class="serif">Home</b-link>
        </p>
        <hr class="my-4">
        <p>
          <b-link v-if="show" href="UserDisplay" class="serif" id="profileLink">Your Profile</b-link>
        </p>
        <hr v-if="show" class="my-4">
        <p>
          <b-link v-if="show" href="BudgetPage" class="serif">Create a Budget</b-link>
        </p>
        <hr v-if="show" class="my-4">
        <p>
          <b-link v-if="show" href="BudgetDisplay" class="serif">Your Budgets</b-link>
        </p>
        <hr v-if="show" class="my-4">
        <p>
          <b-link v-if="show" href="AchievementPage" class="serif">Create an Achievement</b-link>
        </p>
        <hr v-if="show" class="my-4">
        <p>
          <b-link v-if="show" href="AchievementDisplay" class="serif">Your Achievements</b-link>
        </p>
        <hr v-if="show" class="my-4">
        <p>
          <b-link v-on:click="signOut()" v-if="show" href="/" class="serif">Sign Out</b-link>
        </p>
        <hr v-if="show" class="my-4">
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
template div {
  min-height: 95.9vh;
  display: flex;
  flex-direction: column;
}
.main {
  min-height: 95.9vh;
  display: flex;
  flex-direction: column;
}
.serif {
  font-family: "Times New Roman", Times, serif;
  color: white;
}
#profileLink {
  font-weight: bold;
}
#sidebar-1 {
  background-color: #2c3e50;
}
</style>
