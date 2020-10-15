<template>
    <b-container>
        <p class="red">{{message}}</p>
        <h1>Your Achievements</h1>
        <p>
        <b-button variant="danger" v-on:click="deleteAchievementCollection">Remove ALL achievements</b-button>
        </p>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4" v-for="achievement in achievements" v-bind:key="achievement._id">
               <achievement-item class="items" v-bind:achievement="achievement" v-on:del-achievement="deleteAchievement" v-on:complete-achievement="completeAchievement"/>
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
    Api.get('/achievements/')
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
    async completeAchievement(id) {
      var userId = cookiesC.getCookieValue('id')
      async function calcUserXp() {
        var userExperience
        await Api.get(`users/${userId}`)
          .then(response => {
            userExperience = response.data.experiencePoints
            console.log(userExperience)
          }).catch(error => {
            this.message = error.message
          })
        await Api.get(`users/${userId}/achievements/${id}`)
          .then(response => {
            userExperience += response.data.experiencePoints
            console.log(userExperience)
          })
          .catch(error => {
            this.message = error.message
          })
        console.log(userExperience)
        return userExperience
      }

      const paramsUser = {
        experiencePoints: await calcUserXp()
      }
      console.log(paramsUser)
      Api.patch(`users/${userId}`, paramsUser)
        .then(response => {
          alert('yo')
        })
      const paramsAchievement = {
        complete: true
      }
      Api.patch(`/achievements/${id}`, paramsAchievement)
        .then(response => {
          alert('Congratulations on completing your goal!')
          // window.location.href = 'AchievementDisplay'
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
