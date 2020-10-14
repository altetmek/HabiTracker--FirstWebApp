<template>
  <div>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
            <p>{{ info.name }} haha</p>
        <b-badge variant="primary" pill>{{ experiencePoints }} exp</b-badge>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import cookiesC from '../cookies/cookies'

export default {
  data() {
    return {
      achievementinfo: {},
      info: {},
      experiencePoints: 0,
      achievementLength: 0
    }
  },
  name: 'user-achievement-item',
  props: ['achievementUser', 'achievement'],
  mounted() {
    this.getAchievement()
  },
  methods: {
    getAchievement() {
      var id = cookiesC.getCookieValue('id')
      Api.get(`/users/${id}/achievements`)
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            this.achievements.push(response.data[i])
            console.log(this.achievements[i].name)
          }
          this.achievementinfo = {
            name: response.data[0].name
          }
          this.experiencePoints = response.data[0].experiencePoints
          this.achievementLength = response.data.length
        })
        .catch(error => {
          this.message = error.message
          this.achievements = []
        })
    },
    getAchievementNew() {
      Api.get(`/achievements/${this.achievement._id}`)
        .then(response => {
          this.info = {
            name: response.data.name,
            expenses: response.data.expenses,
            income: response.data.income,
            savings: response.data.savings
          }
        })
        .catch(error => {
          this.message = error.message
          this.achievement = []
        })
    }
  }
}
</script>
