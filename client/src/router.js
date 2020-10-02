import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserPage from './views/UserPage.vue'
import BudgetPage from './views/BudgetPage.vue'
import BudgetDisplay from './views/BudgetDisplay.vue'
import UserDisplay from './views/UserDisplay.vue'
import AchievementPage from './views/AchievementPage.vue'
import AchievementDisplay from './views/AchievementDislpay.vue'

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
    },
    {
      path: '/UserDisplay',
      name: 'userdisplay',
      component: UserDisplay
    },
    {
      path: '/AchievementPage',
      name: 'achievementpage',
      component: AchievementPage
    },
    {
      path: '/AchievementDisplay',
      name: 'achievementdisplay',
      component: AchievementDisplay
    } 
  ]
})
