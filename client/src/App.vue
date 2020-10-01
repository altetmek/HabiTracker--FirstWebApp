<template>
  <div id="app">
    <b-button v-b-toggle.sidebar-1>Pages</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          <b-link href="/">Home</b-link>
        </p>
        <p>
          <b-link href="UserPage">User Page</b-link>
        </p>
        <p>
          <b-link href="BudgetPage">Budget Page</b-link>
        </p>
        <p>
          <b-link href="BudgetDisplay">BudgetDisplay Page</b-link>
        </p>
      </div>
    </b-sidebar>
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
