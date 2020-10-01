<template>
<div>
  <b-card bg-variant="dark" text-variant="white" title="Card Title">
    <b-card-text  v-if="show && !patchFlag">
      <p>{{user.username}}</p>
    </b-card-text>
    <b-card-text v-if="!show">
      <p>Username: {{info.username}}</p>
      <p>Title: {{info.title}}</p>
      <p>Level: {{info.level}}</p>
      <p>Experience Points: {{info.experiencePoints}}</p>
    </b-card-text>
    <b-card-text v-if="patchFlag">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="title" v-model="title" placeholder="Enter new title"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
    </b-card-text>
    <b-button v-on:click="getUser">{{ status }}</b-button>
    <b-button v-on:click="patchUser">Update your profile</b-button>
    <b-button variant="danger" v-on:click="$emit('del-user', user._id)">Delete Profile</b-button>
  </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      show: true,
      patchFlag: false,
      status: 'See Details',
      info: {},
      username: '',
      title: ''
    }
  },
  name: 'user-item',
  props: ['user'],
  methods: {
    deleteUser() {
      this.$emit('del-user', this.user._id)
    },
    getUser() {
      if (this.show === false) {
        this.show = true
        this.status = 'See Details'
      } else {
        this.status = 'Hide'
        this.show = false
        Api.get(`/users/${this.user._id}`)
          .then(response => {
            this.info = {
              username: response.data.username,
              title: response.data.title,
              level: response.data.level,
              experiencePoints: response.data.experiencePoints
            }
          })
          .catch(error => {
            this.message = error.message
            this.users = []
          })
      }
    },
    patchUser() {
      if (this.patchFlag === true) {
        this.patchFlag = false
      } else {
        this.patchFlag = true
        const params = {
          title: this.title
        }
        Api.patch(`/users/${this.user._id}`, params)
          .then(response => {
          })
          .catch(error => {
            this.message = error.message
            this.users = []
          })
      }
    }
  }
}
</script>
