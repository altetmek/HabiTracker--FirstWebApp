<template>
<div>
   <!--<b-card bg-variant="dark" text-variant="white" title="Card Title">
    <b-card-text  v-if="show && !patchFlag">
      <p>{{user.username}}</p>
    </b-card-text>
    <b-card-text v-if="!show">
      <p>Username: {{user.username}}</p>
      <p>Title: {{user.title}}</p>
      <p>Level: {{user.level}}</p>
      <p>Experience Points: {{user.experiencePoints}}</p>
    </b-card-text>
    <b-card-text v-if="patchFlag">
      <p>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="title" v-model="title" placeholder="Enter new title"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
        <b-row align-v="start">
          <b-col></b-col>
          <b-col><b-form-input id="title" v-model="title" placeholder="Enter new title"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
    </b-card-text>
    <b-button v-on:click="getUser()">{{ status }}</b-button>
    <b-button v-on:click="patchUser()">Update your profile</b-button>
  </b-card> -->

  <div>
  <b-card no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item v-on:click="getUser()">{{ status }}</b-nav-item>
        <b-nav-item v-on:click="patchReady()">Update Your Profile</b-nav-item>
      </b-nav>
    </b-card-header>

    <b-card-body class="text-center">
      <b-card-title>Your Profile</b-card-title>

      <b-card-text v-if="show && !patchFlag">
        <p>{{user.username}}</p>
      </b-card-text>

      <b-card-text v-if="!show">
        <p>Username: {{user.username}}</p>
        <p>Title: {{user.title}}</p>
        <p>Level: {{user.level}}</p>
        <p>Experience Progression:</p>
        <b-progress :value="user.experiencePoints" variant="warning" :striped="true" show-progress class="mt-2"></b-progress>
     </b-card-text>

      <b-card-text v-if="patchFlag" align-v="center">
      <p>
        <b-row>
          <b-col></b-col>
          <b-col cols="12" sm="12" md="12"><b-form-input id="title" v-model="title" placeholder="Enter new title"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col></b-col>
          <b-col cols="12" sm="12" md="12"><b-form-input id="username" v-model="username" placeholder="Enter new username"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
        <b-row>
          <b-col></b-col>
          <b-col cols="12" sm="12" md="12"><b-form-input type="password" id="password" v-model="password" placeholder="Enter new password"></b-form-input></b-col>
          <b-col></b-col>
        </b-row>
      </p>
      </b-card-text>

      <b-button v-if="patchFlag" v-on:click="patchUser()" variant="primary">Save</b-button>

    </b-card-body>
  </b-card>
</div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import cookiesC from '../cookies/cookies'

export default {
  data() {
    return {
      show: true,
      patchFlag: false,
      status: 'See Details',
      username: '',
      title: '',
      password: ''
    }
  },
  name: 'user-item',
  props: ['user'],
  methods: {
    getUser() {
      this.patchNotReady()
      if (this.show === false) {
        this.show = true
        this.status = 'See Details'
      } else {
        this.status = 'Hide'
        this.show = false
      }
    },
    patchUser() {
      var id = cookiesC.getCookieValue('id')
      console.log(id)
      const params = {
        title: this.title,
        username: this.username,
        password: this.password
      }
      Api.patch(`/users/${id}`, params)
        .then(response => {
          window.location.href = 'UserDisplay'
          alert('Operation is succesfull!')
        })
        .catch(error => {
          this.message = error.message
          this.users = []
        })
    },
    patchReady() {
      this.patchFlag = true
      console.log(this.patchFlag)
    },
    patchNotReady() {
      this.patchFlag = false
      console.log(this.patchFlag)
    }
  }
}
</script>
