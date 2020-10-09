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
          <b-col><b-form-input id="description" v-model="description" placeholder="Describe it here"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
         <b-row align-v="start">
         <b-col></b-col>
         <b-col><b-form-select v-model="degree" :options="options2"></b-form-select></b-col>
         <b-col></b-col>
         </b-row>
      </p>
      <b-button href="AchievementDisplay" v-on:click="postUser">Save</b-button>
      <br><br><br><br>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'achievement',
  data() {
    return {
      category: null,
      options1: [
        { value: null, text: 'please select your category' },
        { value: 'Chores', text: 'Chores' },
        { value: 'Fitness', text: 'Fitness' },
        { value: 'Studies', text: 'Studies' }
      ],
      degree: null,
      options2: [
        { value: null, text: 'please select the degree of it' },
        { value: 'bronze', text: 'Bronze' },
        { value: 'silver', text: 'Silver' },
        { value: 'gold', text: 'Gold' }
      ],
      achievements: [],
      message: '',
      name: '',
      description: ''
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
    postAchievement() {
      const params = {
        name: this.name,
        category: this.category,
        description: this.description,
        degree: this.degree
      }
      Api.post('/achievements', params)
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
