<template>
    <b-container>
        <div>
            <b-jumbotron bg-variant="dark" text-variant="white" header="Categories" lead="Here you can view your progress.">
            <b-tabs content-class="mt-3">
                <b-tab title="Fitness" if active><p>
                            <b-row align-h="center">
                                <b-col cols="12" sm="6" md="4" v-for="category in categories" v-bind:key="category.typeName === 'Fitness'">
                                    <category-item class="items" v-bind:category="category"/>
                                </b-col>
                            </b-row>
                    </p></b-tab>
                <b-tab title="Chores"><p>
                    <b-row align-h="center">
                                <b-col cols="12" sm="6" md="4" v-for="category in categories" v-bind:key="category.typeName === 'Chores'">
                                    <category-item class="items" v-bind:category="category"/>
                                </b-col>
                            </b-row>
                    </p></b-tab>
                <b-tab title="Studies"><p>
                    <b-row align-h="center">
                                <b-col cols="12" sm="6" md="4" v-for="category in categories" v-bind:key="category.typeName === 'Studies'">
                                    <category-item class="items" v-bind:category="category"/>
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
import CategoryItem from '@/components/CategoryItem.vue'

export default {
  name: 'categories',
  components: {
    CategoryItem
  },
  mounted() {
    Api.get('/Categories')
      .then(response => {
        this.categories = response.data.categories
      })
      .catch(error => {
        this.message = error.message
        this.categories = []
      })
      .then(() => {
        this.message = 'testing how this works'
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
