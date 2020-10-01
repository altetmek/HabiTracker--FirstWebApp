<template>
<div>
  <b-card
    overlay
    img-src="https://images.pexels.com/photos/4040859/pexels-photo-4040859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    img-alt="Card Image"
    text-variant="white"
    title="Your Planned Budget"
    sub-title=""
  >
    <b-card-text  v-if="show">
      <p>{{budget.name}}</p>
    </b-card-text>
    <b-card-text v-if="!show">
      <p>Budget name: {{info.name}}</p>
      <p>Expenses: {{info.expenses}}</p>
      <p>Income: {{info.income}}</p>
      <p>Intended Savings: {{info.savings}}</p>
    </b-card-text>
    <b-button v-on:click="getBudget">{{ status }}</b-button>
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
      status: 'See Details',
      info: {}
    }
  },
  name: 'budget-item',
  props: ['budget'],
  methods: {
    deleteBudget() {
      this.$emit('del-budget', this.budget._id)
    },
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
    }

  }
}
</script>
