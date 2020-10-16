<template>
  <div>
  <b-jumbotron v-if="!login" bg-variant="dark" text-variant="white">
    <template v-slot:header>Welcome to HabiTracker!</template>
    <template v-slot:lead>
      Welcome to our Habit Tracker where you can create and customize your life, in a categorised manner. <br>
      To start, fill in the information below!
    </template>
    <hr class="my-4">
    <user-register-item v-if="!notLogin && !login"></user-register-item>
    <!--1st ) same logic will be applied when u implement the functionality for Register
      2nd) the @logged-in here is the same emitted by the homepages children which is in this case the UserloginItem
      3rd) one of the problems we saw before was like when we used to login , we had to refresh the page to reload the values from cookies, and then it would show "you are already logged in" cz it would update the values on Mounted()
      but now it directly updates the values with the emit function-->
    <user-login-item v-if="notLogin && !login" @logged-In="emitOnLoggedIn" ></user-login-item>
    <hr class="my-4">
    <p  v-if="notLogin">Don't have an account?</p>
    <p  v-if="!notLogin">Already have an account?</p>
    <b-button variant="success" v-on:click="loggingController()" v-if="notLogin" href="#">Register</b-button>
    <b-button variant="success" v-on:click="loggingController()" v-if="!notLogin " href="#">Login</b-button>
  </b-jumbotron>
  <b-jumbotron v-if="login" bg-variant="dark" text-variant="white">
     <template v-slot:lead>You are already logged in!</template>
     <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </b-jumbotron>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import UserRegisterItem from '@/components/UserRegisterItem.vue'
import UserLoginItem from '@/components/UserLoginItem.vue'
// import cookiesC from '../cookies/cookies'

export default {
  name: 'home',
  props: ['loggedIn', 'logging'],
  components: {
    UserRegisterItem,
    UserLoginItem
  },
  data() {
    return {
      username: '',
      password: '',
      // variables declared to not use the props directly - See mounted() where the following are assigned to the values recieved from props
      // the logic we had created before for showing and taking off login and register elements remains same, but hte variables names are changed to these variables instead of using directly the props
      // since children can not change props directly but just assign it to new variables and then emit the new changes to the parent, so that the parent can reupdate the props values
      login: false,
      notLogin: true
    }
  },
  mounted() {
    this.login = this.loggedIn
    this.notLogin = this.logging
  },
  methods: {
    emitOnLoggedIn(value) {
      this.login = value
      if (this.login) {
        this.$emit('logged-in', true)
      } else {
        this.$emit('logged-in', false)
      }
    },
    loggingController() {
      if (this.notLogin) {
        this.notLogin = false
      } else {
        this.notLogin = true
      }
    },
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
