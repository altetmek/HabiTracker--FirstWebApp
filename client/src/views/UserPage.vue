<template>
  <div>
    <b-jumbotron bg-variant="dark" text-variant="white" header="User Page" lead="CockSucker42069">
      <b-container class="bv-example-row bv-example-row-flex-cols">
  <b-row align-v="start">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>

  <b-row align-v="center">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>

  <b-row align-v="end">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>

  <b-row align-v="baseline">
    <b-col style="font-size: 0.75rem;">One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col style="font-size: 1.25rem;">One of three columns</b-col>
  </b-row>

  <b-row align-v="stretch">
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
    <b-col>One of three columns</b-col>
  </b-row>
</b-container>
      <b-button variant="primary" href="#">Pornhub</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'user',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
.div {
  height: 100%;
}
</style>
