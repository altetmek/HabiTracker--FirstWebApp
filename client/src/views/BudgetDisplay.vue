<template>
<div class ="main bg-dark">
    <b-container>
        <h1>Your Budget</h1>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4" v-for="budget in budgets" v-bind:key="budget._id">
                <budget-item class="items" v-bind:budget="budget" v-on:del-budget="deleteBudget"/>
            </b-col>
        </b-row>
    </b-container>
    </div>
</template>

<script>
import { Api } from '@/Api'
import BudgetItem from '@/components/BudgetItem.vue'
import cookiesC from '../cookies/cookies'

export default {
  name: 'budgets',
  components: {
    BudgetItem
  },
  mounted() {
    Api.get('/Budgets')
      .then(response => {
        this.budgets = response.data.budgets
      })
      .catch(error => {
        this.message = error.message
        this.budgets = []
      })
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
      var userId = cookiesC.getCookieValue('id')
      Api.delete(`users/${userId}/budgets/${id}`)
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
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
h1 {
  color: white;
}
</style>
