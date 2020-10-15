<template>
  <div>
    <b-container v-if="loggedIn">
        <h1>User</h1>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4">
                <user-item class="items" v-bind:user="userinfo"/>
            </b-col>
        </b-row>
    </b-container>

    <b-row align-h="center">
      <b-col></b-col>
      <b-col cols="12" sm="6" md="4">
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Achievements</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body  v-for="achievement in achievements" :key="achievement._id">
              <b-button v-if="achFlag">{{ messagea }}click me to create one!</b-button>
                <user-achievement-item class="items" v-bind:achievementObject="achievement"/>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="info">Budgets</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body v-for="budget in budgets" :key="budget._id">
              <b-button v-if="budFlag">{{ messageb }}click me to create one!</b-button>
                <user-budget-item class="items" v-bind:budgetObject="budget"/>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="info">Other Categories</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body v-for="category in categories" :key="category._id">
              <b-button v-if="catFlag">{{ messagec }}click me to create one!</b-button>
                <user-category-item class="items" v-bind:categoryObject="category"/>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem.vue'
import cookiesC from '../cookies/cookies'
import UserAchievementItem from '@/components/UserAchievementItem.vue'
import UserBudgetItem from '@/components/UserBudgetItem.vue'
import UserCategoryItem from '@/components/UserCategoryItem.vue'

export default {
  name: 'users',
  props: ['loggedIn', 'logging'],
  components: {
    UserItem,
    UserAchievementItem,
    UserBudgetItem,
    UserCategoryItem
  },
  mounted() {
    this.getAchievement()
    this.getBudget()
    this.getCategory()
    var id = cookiesC.getCookieValue('id')
    Api.get(`/Users/${id}`)
      .then(response => {
        this.userinfo = response.data
      })
      .catch(error => {
        this.message = error.message
        this.users = []
      })
  },
  data() {
    return {
      messagea: '',
      messageb: '',
      messagec: '',
      text: '',
      userinfo: {},
      achFlag: false,
      budFlag: false,
      catFlag: false,
      achievements: [],
      budgets: [],
      categories: []
    }
  },
  methods: {
    deleteUser(id) {
      Api.delete(`/users/${id}`)
        .then(response => {
          const index = this.users.findIndex(user => user._id === id)
          this.users.splice(index, 1)
        })
        .catch(error => {
          this.message = error.message
        })
    },
    deleteUserCollection() {
      Api.delete('/users')
        .then(response => {
          location.reload()
        })
        .catch(error => {
          this.message = error.message
        })
    },
    getAchievement() {
      var id = cookiesC.getCookieValue('id')
      console.log(id)
      Api.get(`/users/${id}/achievements`)
        .then(response => {
          this.achievements = response.data
        })
        .catch(error => {
          this.achFlag = true
          error.message = 'You have no achievements yet, '
          this.messagea = error.message
          this.achievements = []
        })
    },
    getBudget() {
      var id = cookiesC.getCookieValue('id')
      Api.get(`/users/${id}/budgets`)
        .then(response => {
          this.budgets = response.data
        })
        .catch(error => {
          this.budFlag = true
          error.message = 'You have no budget yet, '
          this.messageb = error.message
          this.budgets = []
        })
    },
    getCategory() {
      var id = cookiesC.getCookieValue('id')
      Api.get(`/users/${id}/categories`)
        .then(response => {
          this.categories = response.data
        })
        .catch(error => {
          this.catFlag = true
          error.message = 'You have no other categories yet, '
          this.messagec = error.message
          this.budgets = []
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
