<template>
<div>
  <b-card
    overlay
    img-src="https://images.pexels.com/photos/4040859/pexels-photo-4040859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    img-alt="Card Image"
    text-variant="white"
    title="Your Categories"
    sub-title=""
  >
    <b-card-text  v-if="show">
      <p>{{category.name}}</p>
    </b-card-text>
    <b-card-text v-if="!show">
      <p>Category type: {{info.typeName}}</p>
      <p>Level: {{info.level}}</p>
      <p>Experience Points: {{info.experiencePoints}}</p>
      <p>Achievements: {{info.achievements}}</p>
    </b-card-text>
  </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      show: true,
      putFlag: false,
      status: 'See Details',
      info: {},
      typeName: '',
      level: '',
      experiencePoints: '',
      achievements: ''
    }
  },
  name: 'category-item',
  props: ['category'],
  methods: {
    getCategory() {
      if (this.show === false) {
        this.show = true
        this.status = 'See Details'
      } else {
        this.status = 'Hide'
        this.show = false
        Api.get(`/categories/${this.category._typeName}`)
          .then(response => {
            if (this.category.typeName === 'Fitness') {
              if (response.data.typeName === 'Fitness') {
                this.info = {
                  typeName: response.data.typeName,
                  level: response.data.level,
                  experiencePoints: response.data.experiencePoints,
                  achievements: response.data.achievements
                }
              }
            } else if (this.category.typeName === 'Chores') {
              if (response.data.typeName === 'Chores') {
                this.info = {
                  typeName: response.data.typeName,
                  level: response.data.level,
                  experiencePoints: response.data.experiencePoints,
                  achievements: response.data.achievements
                }
              }
            } else if (this.category.typeName === 'Studies') {
              if (response.data.typeName === 'Studies') {
                this.info = {
                  typeName: response.data.typeName,
                  level: response.data.level,
                  experiencePoints: response.data.experiencePoints,
                  achievements: response.data.achievements
                }
              }
            }
          })
          .catch(error => {
            this.message = error.message
            this.categories = []
          })
      }
    }
  }
}
</script>
