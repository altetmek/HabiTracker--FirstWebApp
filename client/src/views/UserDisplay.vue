<template>
    <b-container>
        <p class="red">{{message}}</p>
        <h1>User</h1>
        <b-button variant="danger" v-on:click="deleteUserCollection">Remove Kebab User</b-button>
        <b-row align-h="center">
            <b-col cols="12" sm="6" md="4" v-for="user in users" v-bind:key="user._id">
                <user-item class="items" v-bind:user="user" v-on:del-user="deleteUser"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { Api } from '@/Api'
import UserItem from '@/components/UserItem.vue'

export default {
  name: 'users',
  components: {
    UserItem
  },
  mounted() {
    Api.get('/Users')
      .then(response => {
        this.users = response.data.users
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
      text: ''
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
