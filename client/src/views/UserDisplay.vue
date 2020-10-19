<template>
  <div class ="main bg-dark">
    <b-container v-if="loggedIn">
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
      <b-card no-body class="mb-1 bg-dark">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Personal Achievements</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body v-for="achievement in personalAch" :key="achievement._id">
              <b-button v-if="achFlag">{{ messagea }}click me to create one!</b-button>
                <user-achievement-item class="items" v-bind:achievementObject="achievement"/>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1 bg-dark">
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

      <b-card no-body class="mb-1 bg-dark">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="info">Achievement Categories</b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <div class="px-3 py-2">
            <b-tabs content-class="mt-3">
              <b-tab title="Fitness" active>
                <b-progress :value="fitnessXP" variant="warning" :striped="true" show-progress class="mt-2"></b-progress>
                <b-card-body v-for="fitness in fitnesses" :key="fitness._id">
                  <fitness-item class="items" v-bind:fitnessObject="fitness"/>
                </b-card-body>
              </b-tab>
              <b-tab title="Chores">
                <b-progress :value="choresXP" variant="warning" :striped="true" show-progress class="mt-2"></b-progress>
                <b-card-body v-for="chores in choreses" :key="chores._id">
                  <chores-item class="items" v-bind:choresObject="chores"/>
                </b-card-body>
              </b-tab>
              <b-tab title="Studies">
                <b-progress :value="studiesXP" variant="warning" :striped="true" show-progress class="mt-2"></b-progress>
                <b-card-body v-for="studies in studieses" :key="studies._id">
                  <studies-item class="items" v-bind:studiesObject="studies"/>
                </b-card-body>
              </b-tab>
            </b-tabs>
          </div>
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
import FitnessItem from '@/components/FitnessItem.vue'
import ChoresItem from '@/components/ChoresItem.vue'
import StudiesItem from '@/components/StudiesItem.vue'

export default {
  name: 'users',
  props: ['loggedIn', 'logging'],
  components: {
    UserItem,
    UserAchievementItem,
    UserBudgetItem,
    FitnessItem,
    ChoresItem,
    StudiesItem
  },
  mounted() {
    this.getAchievement()
    this.getBudget()
    this.getCategoryName()
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
      categories: [],
      fitnesses: [],
      choreses: [],
      studieses: [],
      fitnessXP: 0,
      choresXP: 0,
      studiesXP: 0,
      achievementID: '',
      achType: '',
      personalAch: []
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
          for (var i = 0; i < this.achievements.length; i++) {
            if (this.achievements[i].type === 'Other') {
              this.personalAch.push(this.achievements[i])
            }
          }
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
    getCategoryName() {
      var id = cookiesC.getCookieValue('id')
      Api.get(`/users/${id}/categories`)
        .then(response => {
          this.categories = response.data
          for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].categoryType.typeName === 'Fitness') {
              this.fitnesses.push(this.categories[i].categoryType)
            } else if (this.categories[i].categoryType.typeName === 'Chores') {
              this.choreses.push(this.categories[i].categoryType)
            } else {
              this.studieses.push(this.categories[i].categoryType)
            }
          }
        })
        .catch(error => {
          this.catFlag = true
          error.message = 'You have no categories yet, '
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
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
div {
  text-align: center;
}
</style>
