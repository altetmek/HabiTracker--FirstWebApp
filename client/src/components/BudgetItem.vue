<template>
  <div>
      <b-button-close v-on:click="$emit('del-budget', budget._id)" >&times;</b-button-close>
      <div class="customizemaybe">
          <p>Budget name: {{budget.name}}</p>
          <p>Expenses: {{budget.expenses}}</p>
          <p>Income: {{budget.income}}</p>
          <p>Intended Savings: {{budget.savings}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'budget-item',
  props: ['budget'],
  methods: {
    deleteBudget() {
      this.$emit('del-budget', this.budget._id)
    }
  }
}
</script>
