<template>
    <b-container v-if="loggedIn">
        <p class="red">{{message}}</p>
        <h1>User</h1>
        <b-button variant="danger" v-on:click="deleteUserCollection">Remove Kebab User</b-button>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4">
                <user-item class="items" v-bind:user="userinfo"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem.vue'
import cookiesC from '../cookies/cookies'

export default {
  name: 'users',
  props: ['loggedIn', 'logging'],
  components: {
    UserItem
  },
  mounted() {
    console.log(this.loggedIn + ' this is kjfhgöd')
    var id = cookiesC.getCookieValue('id')
    console.log(id)
    Api.get(`/Users/${id}`)
      .then(response => {
        console.log(response)
        this.userinfo = response.data
      })
      .catch(error => {
        this.message = error.message
        this.users = []
      })
      .then(() => {
        this.message = 'testing how this works'
      })
  },
  data() {
    return {
      users: [],
      message: '',
      text: '',
      userinfo: {}
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
    }
  }
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
