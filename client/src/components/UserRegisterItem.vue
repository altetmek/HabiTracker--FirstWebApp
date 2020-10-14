<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <div>
        <b-row align-v="center">
          <b-col><div></div></b-col>
          <b-col>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="Don't forget to add @"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
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
      <b-form-group id="input-group-3">
        <b-form @submit.stop.prevent>
            <label for="text-password">Your Password</label>
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
      <div>
        <b-row align-v="center">
          <b-col><div></div></b-col>
          <b-col>
      <b-form-group id="input-group-4" label="Set a catchy title that represents you!:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.title"
          required
          placeholder="The Great Coder"
        ></b-form-input>
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

export default {
  data() {
    return {
      form: {
        email: '',
        username: '',
        password: '',
        title: '',
        level: 1,
        experiencePoints: 0
      },
      show: true
    }
  },
  name: 'user-register-item',
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.postUser()
    },
    postUser() {
      const params = {
        email: this.form.email,
        username: this.form.username,
        password: this.form.password,
        title: this.form.title,
        level: this.form.level,
        experiencePoints: this.form.experiencePoints
      }
      Api.post('/users', params)
        .then(request => {
          window.location.href = '/'
        })
        .catch(error => {
          this.message = error
        })
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.username = ''
      this.form.password = ''
      this.form.title = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
