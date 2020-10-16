<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <div>
        <b-row align-v="center">
          <b-col><div></div></b-col>
          <b-col>
      <b-form-group id="input-group-2" label="Your Username:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.username"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>
      </b-col>
        <b-col><div></div></b-col>
        </b-row>
      </div>
      <div>
        <b-row align-v="center">
          <b-col><div></div></b-col>
          <b-col>
      <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
        <b-form @submit.stop.prevent>
            <b-input v-model="form.password" type="password" aria-describedby="password-help-block"></b-input>
            <b-form-text id="password-help-block">
                Your password must be 8-20 characters long, contain letters and numbers, and must not
                contain spaces, special characters, or emoji.
            </b-form-text>
        </b-form>
      </b-form-group>
      </b-col>
        <b-col><div></div></b-col>
        </b-row>
      </div>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'
import cookiesC from '../cookies/cookies'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  name: 'user-login-item',
  props: ['loggedIn', 'logging'],
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const params = {
        username: this.form.username,
        password: this.form.password
      }
      Api.post('/authenticate/', params)
        .then(response => {
          cookiesC.setCookies(response, 1)
          var logged = true
          this.$emit('logged-In', logged)
          window.location.href = 'UserDisplay'
        })
        .catch(error => {
          console.log(error)
          alert('Your username or password is incorrect!')
        })
    },

    onReset(evt) {
      evt.preventDefault()
      this.form.username = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
