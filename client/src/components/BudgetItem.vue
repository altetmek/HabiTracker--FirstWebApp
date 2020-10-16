<template>
<div>
  <b-card
    bg-variant="dark"
    text-variant="white"
    title="Your Planned Budget"
    sub-title=""
  >
    <b-card-text  v-if="show && !putFlag">
      <p>{{budget.name}}</p>
    </b-card-text>
    <b-card-text v-if="!show">
      <p>Budget name: {{info.name}}</p>
      <p>Total amount left: {{info.income}}</p>
      <p>Money left for food {{info.food}}</p>
      <p>Money left for essentials {{info.essentials}}</p>
      <p>Money left for leisure {{info.leisure}}</p>
      <p>Money left for miscellaneous expenses {{info.misc}}</p>
      <p>Money put away to savings this month {{info.savings}}</p>
    </b-card-text>
    <b-card-text v-if="putFlag">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="food" v-model="food" placeholder="Enter todays spendings on food"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="essentials" v-model="essentials" placeholder="Enter todays spendings on essentials"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="leisure" v-model="leisure" placeholder="Enter todays spendings on leisure"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="misc" v-model="misc" placeholder="Enter todays spendings on miscellaneous"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-button v-on:click="updateBudget"> Save </b-button>
      </p>
    </b-card-text>
    <p>
    <b-button v-on:click="getBudget">{{ status }}</b-button>
    </p>
    <p>
    <b-button v-on:click="showForm">Update your budget</b-button>
    </p>
    <b-button variant="danger" v-on:click="$emit('del-budget', budget._id)">Delete Budget</b-button>
  </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'
// import cookiesC from '../cookies/cookies'

export default {
  data() {
    return {
      show: true,
      putFlag: false,
      status: 'See Details',
      info: {},
      name: '',
      food: '',
      income: '',
      misc: '',
      essentials: '',
      leisure: '',
      savings: ''
    }
  },
  name: 'budget-item',
  props: ['budget'],
  methods: {
    getBudget() {
      if (this.show === false) {
        this.show = true
        this.status = 'See Details'
      } else {
        this.status = 'Hide'
        this.show = false
        Api.get(`/budgets/${this.budget._id}`)
          .then(response => {
            this.info = {
              name: response.data.name,
              food: response.data.food,
              misc: response.data.misc,
              essentials: response.data.essentials,
              leisure: response.data.leisure,
              income: response.data.income,
              savings: response.data.savings
            }
          })
          .catch(error => {
            this.message = error.message
            this.budgets = []
          })
      }
    },
    showForm() {
      this.putFlag = true
    },
    updateBudget() {
      // var userId = cookiesC.getCookieValue('id')
      const params = {
        food: this.food,
        misc: this.misc,
        essentials: this.essentials,
        leisure: this.leisure
      }
      Api.patch(`/budgets/${this.budget._id}`, params)
        .then(response => {
          window.location.href = 'BudgetDisplay'
        })
        .catch(error => {
          this.message = error.message
          this.budgets = []
        })
    }
  }
}
</script>
