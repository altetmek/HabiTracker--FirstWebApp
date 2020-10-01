<template>
  <div>
  <b-jumbotron bg-variant="dark" text-variant="white">
    <template v-slot:header>Welcome to HabiTracker!</template>
    <template v-slot:lead>
      Welcome to our Habit Tracker where you can create and customize your life, in a categorised manner. <br>
      To start, fill in the information below!
    </template>
    <hr class="my-4">
    <b-form-group id="input-group-1" label="Your Information:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="username"
          required
          placeholder="Enter username"
        ></b-form-input>
    </b-form-group>
    <b-form-input type="password" v-model="password" placeholder="Enter your password"></b-form-input>
    <b-button href="#" v-on:click="getUser" variant="primary">Login</b-button>
    <b-button variant="success" href="#">Create Account</b-button>
    <p>
      It uses utility classes for typography and spacing to space content out within the larger
      container.
    </p>
  </b-jumbotron>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
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
