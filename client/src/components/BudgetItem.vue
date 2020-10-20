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
      <hr class="my-4">
      <p>Total amount left: {{info.income}}</p>
      <hr class="my-4">
      <p>Money left for food {{info.food}}</p>
      <hr class="my-4">
      <p>Money left for essentials {{info.essentials}}</p>
      <hr class="my-4">
      <p>Money left for leisure {{info.leisure}}</p>
      <hr class="my-4">
      <p>Money left for miscellaneous expenses {{info.misc}}</p>
      <hr class="my-4">
      <p>Money put away to savings this month {{info.savings}}</p>
      <hr class="my-4">
    </b-card-text>
    <b-card-text v-if="putFlag">
      <p> Enter what you spent today on the categories in each field!</p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col cols="12" sm="12" md="12"><b-form-input id="food" v-model="food" placeholder="Food"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col cols="12" sm="12" md="12"><b-form-input id="essentials" v-model="essentials" placeholder="Essentials"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col cols="12" sm="12" md="12"><b-form-input id="leisure" v-model="leisure" placeholder="Leisure"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col cols="12" sm="12" md="12"><b-form-input id="misc" v-model="misc" placeholder="Miscellaneous"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-button v-on:click="updateBudget"> Save/Quit </b-button>
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
    async updateBudget() {
      var totalFunds
      var totalFood
      var totalEssentials
      var totalMisc
      var totalLeisure
      await Api.get(`/budgets/${this.budget._id}`)
        .then(response => {
          totalFood = response.data.food
          totalFunds = response.data.income
          totalLeisure = response.data.leisure
          totalMisc = response.data.misc
          totalEssentials = response.data.essentials
        })
        .catch(error => {
          this.message = error.message
        })
      totalFood -= this.food
      totalEssentials -= this.essentials
      totalMisc -= this.misc
      totalLeisure -= this.leisure
      totalFunds -= this.food
      totalFunds -= this.essentials
      totalFunds -= this.misc
      totalFunds -= this.leisure
      const params = {
        income: totalFunds,
        food: totalFood,
        misc: totalMisc,
        essentials: totalEssentials,
        leisure: totalLeisure
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
