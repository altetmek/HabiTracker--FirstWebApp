<template>
  <div>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
            {{ budgetObject.name }}
        <b-badge variant="primary" pill>{{ budgetObject.savings }} Saved!</b-badge>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'user-budget-item',
  props: ['budgetObject']
}
</script>
