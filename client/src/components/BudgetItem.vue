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
      <p>Expenses: {{info.expenses}}</p>
      <p>Income: {{info.income}}</p>
      <p>Intended Savings: {{info.savings}}</p>
    </b-card-text>
    <b-card-text v-if="putFlag">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="name" v-model="name" placeholder="Enter new budget name"></b-form-input></b-col>
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
    <b-button v-on:click="getBudget">{{ status }}</b-button>
    <b-button v-on:click="putBudget">Update your budget</b-button>
    <b-button variant="danger" v-on:click="$emit('del-budget', budget._id)">Delete Budget</b-button>
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
              expenses: response.data.expenses,
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
    putBudget() {
      if (this.putFlag === true) {
        this.putFlag = false
      } else {
        this.putFlag = true
        const params = {
          name: this.name,
          expenses: this.expense,
          income: this.income,
          savings: this.saving
        }
        Api.put(`/budgets/${this.budget._id}`, params)
          .then(response => {
          })
          .catch(error => {
            this.message = error.message
            this.budgets = []
          })
      }
    }
  }
}
</script>
