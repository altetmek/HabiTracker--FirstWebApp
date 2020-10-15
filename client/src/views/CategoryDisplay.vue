<template>
    <b-container>
        <div>
          <!-- I have no idea whats going on here... -->
            <b-jumbotron bg-variant="dark" text-variant="white" header="Categories" lead="Here you can view your progress.">
            <b-tabs content-class="mt-3">
                <b-tab title="Fitness" if active><p>
                            <b-row align-h="center">
                                <b-col cols="12" sm="6" md="4" v-for="category in categories" v-bind:key="category">
                                    <fitness-item class="items" v-bind:category="category"/>
                                </b-col>
                            </b-row>
                    </p></b-tab>
                <b-tab title="Chores"><p>
                    <b-row align-h="center">
                                <b-col cols="12" sm="6" md="4" v-for="category in categories" v-bind:key="category">
                                    <chores-item class="items" v-bind:category="category"/>
                                </b-col>
                            </b-row>
                    </p></b-tab>
                <b-tab title="Studies"><p>
                    <b-row align-h="center">
                                <b-col cols="12" sm="6" md="4" v-for="category in categories" v-bind:key="category">
                                    <studies-item class="items" v-bind:category="category"/>
                                </b-col>
                            </b-row>
                    </p></b-tab>
            </b-tabs>
            </b-jumbotron>
        </div>
    </b-container>
</template>

<script>
import { Api } from '@/Api'
// import CategoryItem from '@/components/CategoryItem.vue'
import FitnessItem from '@/components/FitnessItem.vue'
import ChoresItem from '@/components/ChoresItem.vue'
import StudiesItem from '@/components/StudiesItem.vue'
import cookiesC from '../cookies/cookies'

export default {
  name: 'categories',
  props: ['loggedIn', 'logging'],
  components: {
    // CategoryItem,
    FitnessItem,
    ChoresItem,
    StudiesItem
  },
  mounted() {
    this.getCategory()
    // this.getAch()
    var id = cookiesC.getCookieValue('id')
    Api.get(`/Users/${id}/Categories`)
      .then(response => {
        this.userinfo = response.data
      })
      .catch(error => {
        this.message = error.message
        this.users = []
      })
  },
  data() {
    return {
      categories: [],
      message: '',
      text: ''
    }
  },
  methods: {}
}
</script>

<style scoped>
.red {
    color: red;
}
</style>
