<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" header="Achievement" lead="Create an achivement and choose how much it will reward you">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="name" v-model="name" placeholder="Enter the name of the achievement"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-select v-model="category" :options="options1"></b-form-select></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
         <b-row align-v="start">
         <b-col></b-col>
         <b-col><b-form-select v-model="degree" :options="options2"></b-form-select></b-col>
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
      category: null,
      options1: [
        { value: null, text: 'please select an option' },
        { value: 'Chores', text: 'Chores' },
        { value: 'Fitness', text: 'Fitness' },
        { value: 'Studies', text: 'Studies' }
      ],
      degree: null,
      options2: [
        { value: null, text: 'please select an option' },
        { value: 'bronze', text: 'Bronze' },
        { value: 'silver', text: 'Silver' },
        { value: 'gold', text: 'Gold' }
      ],
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
