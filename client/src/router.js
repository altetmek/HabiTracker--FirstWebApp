import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserPage from './views/UserPage.vue'
import BudgetPage from './views/BudgetPage.vue'
import BudgetDisplay from './views/BudgetDisplay.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/UserPage',
      name: 'userpage',
      component: UserPage
    },
    {
      path: '/BudgetPage',
      name: 'budgetpage',
      component: BudgetPage
    },
    {
      path: '/BudgetDisplay',
      name: 'budgetdisplay',
      component: BudgetDisplay
    }
  ]
})
