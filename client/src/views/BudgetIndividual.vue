<template>
    <b-container>
        <p class="red">{{message}}</p>
        <h1>Your Budget</h1>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4">
                <budget-details class="items" v-on:del-budget="deleteBudget"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { Api } from '@/Api'
// import BudgetItemDetails from '@/components/BudgetItemDetails.vue'

export default {
  name: 'budgets',
  components: {
    // BudgetItemDetails
  },
  data() {
    return {
      budgets: [],
      message: '',
      text: ''
    }
  },
  methods: {
    deleteBudget(id) {
      Api.delete(`/budgets/${id}`)
        .then(response => {
          const index = this.budgets.findIndex(budget => budget._id === id)
          this.budgets.splice(index, 1)
        })
        .catch(error => {
          this.message = error.message
        })
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
