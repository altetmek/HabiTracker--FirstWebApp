<template>
  <div>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
            {{ choresObject.task }}
        <b-badge variant="primary" pill>{{ choresObject.typeExperience }} exp</b-badge>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'chores-item',
  props: ['choresObject']
}
</script>
