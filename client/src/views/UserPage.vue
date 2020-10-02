<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" header="User" lead="Please input your username and starting title.">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="username" v-model="username" placeholder="Enter your username"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="title" v-model="title" placeholder="Enter your starting title"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <b-button href="UserDisplay" v-on:click="postUser">Save</b-button>
      <br><br><br><br>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'user',
  data() {
    return {
      users: [],
      message: '',
      username: '',
      title: '',
      level: 1,
      experiencePoints: 0
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
    },
    postUser() {
      const params = {
        username: this.username,
        level: this.level,
        title: this.title,
        experiencePoints: this.experiencePoints
      }
      Api.post('/users', params)
        .then(request => {
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
.div {
  height: 100%;
}
</style>
