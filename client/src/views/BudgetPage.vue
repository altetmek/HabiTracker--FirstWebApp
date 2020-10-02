<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" header="Budget" lead="Please input your expenses, income and intended savings.">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="name" v-model="name" placeholder="Enter budget name"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="expense" v-model="expense" placeholder="Enter your expenses"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="income" v-model="income" placeholder="Enter your income"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="saving" v-model="saving" placeholder="Enter your intended savings"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <b-button href="BudgetDisplay" v-on:click="postBudget">Save</b-button>
      <br><br><br><br>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'budget',
  data() {
    return {
      budgets: [],
      message: '',
      name: '',
      expense: '',
      income: '',
      saving: ''
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
    postBudget() {
      const params = {
        name: this.name,
        expenses: this.expense,
        income: this.income,
        savings: this.saving
      }
      Api.post('/budgets', params)
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
</style>
