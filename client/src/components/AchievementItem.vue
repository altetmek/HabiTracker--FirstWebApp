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
      <p>achievement name: {{info.name}}</p>
      <p>Category: {{info.type}}</p>
      <p>Description: {{info.description}}</p>
      <p>Degree: {{info.degree}}</p>
      <p>Exp: {{info.experiencePoints}}</p>
    </b-card-text>
    <b-card-text v-if="putFlag">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="name" v-model="name" placeholder="Enter new achievement name"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="expense" v-model="expense" placeholder="Enter new expenses"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="income" v-model="income" placeholder="Enter new income"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="saving" v-model="saving" placeholder="Enter new intended savings"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
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
