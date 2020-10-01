<template>
    <b-container>
        <p class="red">{{message}}</p>
        <h1>Your Budget</h1>
        <b-button variant="danger" v-on:click="deleteBudgetCollection">Remove Kebab</b-button>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4" v-for="budget in budgets" v-bind:key="budget._id">
                <budget-item class="items" v-bind:budget="budget" v-on:del-budget="deleteBudget"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { Api } from '@/Api'
import BudgetItem from '@/components/BudgetItem.vue'

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
      .then(() => {
        this.message = 'testing how this works'
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
      Api.delete(`/budgets/${id}`)
        .then(response => {
          const index = this.budgets.findIndex(budget => budget._id === id)
          this.budgets.splice(index, 1)
        })
        .catch(error => {
          this.message = error.message
        })
    },
    deleteBudgetCollection() {
      Api.delete('/budgets')
        .then(response => {
          location.reload()
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
