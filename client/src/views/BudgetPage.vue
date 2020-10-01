<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" header="Budget" lead="Please input your expenses, income and intended savings.">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="name" v-model="text" placeholder="Enter budget name"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="expense" v-model="text" placeholder="Enter your expenses"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="income" v-model="text" placeholder="Enter your income"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="saving" v-model="text" placeholder="Enter your intended savings"></b-form-input></b-col>
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
      text: ''
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
          request.data.name = this.text.name
          request.data.expenses = this.text.expense
          request.data.income = this.text.income
          request.data.savings = this.text.saving
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
