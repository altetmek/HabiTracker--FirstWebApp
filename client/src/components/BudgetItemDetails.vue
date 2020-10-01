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
    <b-card-text>
      <p>Budget name; {{budget.name}}</p>
      <p>Expenses: {{budget.expenses}}</p>
      <p>Income: {{budget.income}}</p>
      <p>Intended Savings: {{budget.savings}}</p>
    </b-card-text>
    <!-- Fix this to go back -->
    <!-- <b-button v-on:click="$emit('get-budget', budget._id)">Show less</b-button> -->
    <b-button variant="danger" v-on:click="$emit('del-budget', budget._id)">Delete Budget</b-button>
  </b-card>
  </div>
</template>

<script>
export default {
  name: 'budget-details',
  props: ['budget'],
  methods: {
    deleteBudget() {
      this.$emit('del-budget', this.budget._id)
    }
  }
}
</script>
