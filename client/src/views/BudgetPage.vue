<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" header="Budget" lead="Please input your expenses, income and intended savings.">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="name" v-model="textName" placeholder="Enter budget name"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="expense" v-model="textExpense" placeholder="Enter your expenses"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="income" v-model="textIncome" placeholder="Enter your income"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="saving" v-model="textSavings" placeholder="Enter your intended savings"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <b-button v-on:click="postBudget">Save</b-button>
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
      textName: '',
      textExpense: '',
      textIncome: '',
      textSavings: ''
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
      Api.post('/budgets')
        .then(request => {
          request.data.name = this.textName
          request.data.expenses = this.textExpense
          request.data.income = this.textIncome
          request.data.savings = this.textSavings
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
