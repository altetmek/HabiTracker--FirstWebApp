<template>
  <div>
    <b-jumbotron header="Budget" lead="Please input your expenses, income and intended savings.">
       <p>
        <b-form-input v-model="text" placeholder="Enter your expenses"></b-form-input>
        <b-form-input v-model="text" placeholder="Enter your income"></b-form-input>
        <b-form-input v-model="text" placeholder="Enter your intended savings"></b-form-input>
       </p>
       <p><b-button>I am a Button</b-button></p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'budget',
  data() {
    return {
      text: ''
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
</style>
