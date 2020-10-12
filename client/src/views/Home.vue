<template>
  <div>
  <b-jumbotron v-if="!loggedIn" bg-variant="dark" text-variant="white">
    <template v-slot:header>Welcome to HabiTracker!</template>
    <template v-slot:lead>
      Welcome to our Habit Tracker where you can create and customize your life, in a categorised manner. <br>
      To start, fill in the information below!
    </template>
    <hr class="my-4">
    <user-register-item v-if="!logging && !loggedIn"></user-register-item>
    <user-login-item v-if="logging && !loggedIn" ></user-login-item>
    <hr class="my-4">
    <p  v-if="logging">Don't have an account?</p>
    <p  v-if="!logging">Already have an account?</p>
    <b-button variant="success" v-on:click="loggingController()" v-if="logging" href="#">Register</b-button>
    <b-button variant="success" v-on:click="loggingController()" v-if="!logging " href="#">Login</b-button>
  </b-jumbotron>
  <b-jumbotron v-if="loggedIn" bg-variant="dark" text-variant="white">
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
import cookiesC from '../cookies/cookies'

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
      password: ''
    }
  },
  mounted() {
    console.log(this.loggedIn)
    // this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn() {
      this.logging = true
      this.loggedIn = cookiesC.getCookieValue('id')
    },
    loggingController() {
      if (this.logging) {
        this.logging = false
      } else {
        this.logging = true
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
