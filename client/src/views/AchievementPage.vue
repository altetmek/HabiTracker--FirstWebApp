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
          <b-col><b-form-select v-model="type" :options="options1"></b-form-select></b-col>
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
      <b-button v-on:click="postAchievement">Save</b-button>
      <br><br><br><br>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import cookiesC from '../cookies/cookies'

export default {
  name: 'achievement',
  data() {
    return {
      type: null,
      options1: [
        { value: null, text: 'please select your category' },
        { value: 'Chores', text: 'Chores' },
        { value: 'Fitness', text: 'Fitness' },
        { value: 'Studies', text: 'Studies' },
        { value: 'Other', text: 'Other' }
      ],
      degree: null,
      options2: [
        { value: null, text: 'please select the degree of it' },
        { value: 'Bronze', text: 'Bronze' },
        { value: 'Silver', text: 'Silver' },
        { value: 'Gold', text: 'Gold' }
      ],
      achievements: [],
      message: '',
      name: '',
      description: '',
      typeName: '',
      task: '',
      level: 1,
      typeExperience: 0,
      experiencePoints: 0,
      achievementID: ''
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
      var id = cookiesC.getCookieValue('id')
      const params = {
        name: this.name,
        type: this.type,
        description: this.description,
        degree: this.degree
      }
      if (this.type === 'Fitness' || this.type === 'Chores' || this.type === 'Studies') {
        Api.post(`users/${id}/achievements`, params)
          .then(request => {
            this.achievementID = request.data._id
            this.postCategory()
          })
          .catch(error => {
            this.message = error
          })
      } else {
        Api.post(`users/${id}/achievements`, params)
          .then(request => {
            window.location.href = 'AchievementDisplay'
          })
          .catch(error => {
            this.message = error
          })
      }
    },
    async postCategory() {
      await this.getAchievementInfo()
      var id = cookiesC.getCookieValue('id')
      const params = {
        categoryType: {
          typeName: this.type,
          task: this.description,
          level: this.level,
          typeExperience: this.typeExperience
        }
      }
      Api.post(`users/${id}/categories`, params)
        .then(request => {
          window.location.href = 'AchievementDisplay'
        })
        .catch(error => {
          this.message = error
        })
    },
    async getAchievementInfo() {
      var idwow = cookiesC.getCookieValue('id')
      var id = this.achievementID
      await Api.get(`users/${idwow}/achievements/${id}`)
        .then(request => {
          this.type = request.data.type
          this.description = request.data.description
          this.level = request.data.level
          this.typeExperience = request.data.experiencePoints
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
