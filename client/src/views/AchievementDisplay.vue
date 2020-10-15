<template>
    <b-container>
        <p class="red">{{message}}</p>
        <h1>Your Achievements</h1>
        <p>
        <b-button variant="danger" v-on:click="deleteAchievementCollection">Remove ALL achievements</b-button>
        </p>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4" v-for="achievement in achievements" v-bind:key="achievement._id">
                <achievement-item class="items" v-bind:achievement="achievement" v-on:del-achievement="deleteAchievement"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { Api } from '@/Api'
import AchievementItem from '@/components/AchievementItem.vue'
import cookiesC from '../cookies/cookies'

export default {
  name: 'achievement',
  components: {
    AchievementItem
  },
  mounted() {
    Api.get('/Achievements')
      .then(response => {
        this.achievements = response.data.achievements
      })
      .catch(error => {
        this.message = error.message
        this.achievements = []
      })
      .then(() => {
        this.message = 'testing how this works'
      })
  },
  data() {
    return {
      achievements: [],
      message: '',
      text: ''
    }
  },
  methods: {
    deleteAchievement(id) {
      var userId = cookiesC.getCookieValue('id')
      Api.delete(`users/${userId}/achievements/${id}`)
        .then(response => {
          const index = this.achievements.findIndex(achievement => achievement._id === id)
          this.achievements.splice(index, 1)
        })
        .catch(error => {
          this.message = error.message
        })
    },
    deleteAchievementCollection() {
      Api.delete('/achievements')
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
