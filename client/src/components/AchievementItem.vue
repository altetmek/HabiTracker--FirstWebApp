<template>
<div>
  <b-card
    bg-variant="dark"
    text-variant="white"
    title="Achievement"
    sub-title=""
  >
    <b-card-text  v-if="show && !putFlag">
      <p>{{achievement.name}}</p>
    </b-card-text>
    <b-card-text v-if="!show">
      <p>achievement name: {{info.name}}</p>
      <p>Category: {{info.category}}</p>
      <p>Description: {{info.description}}</p>
      <p>Degree: {{info.degree}}</p>
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
    <b-button v-on:click="getAchievement">{{ status }}</b-button>
    <b-button v-on:click="putAchievement">Update your Achievement</b-button>
    <b-button variant="danger" v-on:click="$emit('del-achievement', achievement._id)">Delete Achievement</b-button>
  </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      show: true,
      putFlag: false,
      status: 'See Details',
      info: {},
      name: '',
      expense: '',
      income: '',
      saving: ''
    }
  },
  name: 'achievement-item',
  props: ['achievement'],
  methods: {
    deleteAchievement() {
      this.$emit('del-achievement', this.achievement._id)
    },
    getAchievement() {
      if (this.show === false) {
        this.show = true
        this.status = 'See Details'
      } else {
        this.status = 'Hide'
        this.show = false
        Api.get(`/achievements/${this.achievement._id}`)
          .then(response => {
            this.info = {
              name: response.data.name,
              category: response.data.category,
              description: response.data.description,
              degree: response.data.degree
            }
          })
          .catch(error => {
            this.message = error.message
            this.achievement = []
          })
      }
    }
    // putAchievement() {
    //   if (this.putFlag === true) {
    //     this.putFlag = false
    //   } else {
    //     this.putFlag = true
    //     const params = {
    //       name: this.name,
    //       expenses: this.expense,
    //       income: this.income,
    //       savings: this.saving
    //     }
    //     Api.put(`/achievements/${this.achievement._id}`, params)
    //       .then(response => {
    //       })
    //       .catch(error => {
    //         this.message = error.message
    //         this.achievements = []
    //       })
    //   }
    // }
  }
}
</script>
