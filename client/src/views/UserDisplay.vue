<template>
  <div>
    <b-container v-if="loggedIn">
        <p class="red">{{message}}</p>
        <h1>User</h1>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4">
                <user-item class="items" v-bind:user="userinfo"/>
            </b-col>
        </b-row>
    </b-container>

    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">Achievements</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-row align-h="center">
            <b-col cols="12" sm="6" md="4" v-for="achievement in achievements" :key="achievement._id">
                <user-achievement-item class="items" v-bind:achievementObject="achievement"/>
            </b-col>
        </b-row>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

  </div>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem.vue'
import cookiesC from '../cookies/cookies'
import UserAchievementItem from '@/components/UserAchievementItem.vue'

export default {
  name: 'users',
  props: ['loggedIn', 'logging'],
  components: {
    UserItem,
    UserAchievementItem
  },
  mounted() {
    this.getAchievement()
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
      message: '',
      text: '',
      userinfo: {},
      achievements: []
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
          this.message = error.message
          this.achievements = []
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
