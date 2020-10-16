<template>
<div>
  <b-card
    bg-variant="dark"
    text-variant="white"
    sub-title=""
  >
    <b-card-text  v-if="show && !putFlag">
      <p>{{achievement.name}}</p>
    </b-card-text>
    <b-card-text v-if="!show">
      <p>Achievement Name: {{info.name}}</p>
      <hr class="my-4">
      <p>Category: {{info.type}}</p>
      <hr class="my-4">
      <p>Description: {{info.description}}</p>
      <hr class="my-4">
      <p>Degree: {{info.degree}}</p>
      <hr class="my-4">
      <p>Exp: {{info.experiencePoints}}</p>
      <hr class="my-4">
    </b-card-text>
    <p>
    <b-button v-on:click="getAchievement">{{ details }}</b-button>
    </p>
    <p>
    <b-button v-on:click="$emit('complete-achievement', achievement._id)"> {{ status }} </b-button>
    </p>
    <b-button variant="danger" v-on:click="$emit('del-achievement', achievement._id)">Delete Achievement</b-button>
  </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'
// import cookies from '../cookies/cookies'

export default {
  data() {
    return {
      show: true,
      putFlag: false,
      status: 'Mark as complete',
      details: 'See Details',
      info: {},
      name: '',
      category: '',
      description: ''
    }
  },
  name: 'achievement-item',
  props: ['achievement'],
  methods: {
    getAchievement() {
      if (this.show === false) {
        this.show = true
        this.details = 'See Details'
      } else {
        this.details = 'Hide'
        this.show = false
        Api.get(`/achievements/${this.achievement._id}`)
          .then(response => {
            this.info = {
              name: response.data.name,
              type: response.data.type,
              description: response.data.description,
              degree: response.data.degree,
              experiencePoints: response.data.experiencePoints
            }
          })
          .catch(error => {
            this.message = error.message
            this.achievement = []
          })
      }
    }
  }
}
</script>
