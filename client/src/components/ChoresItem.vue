<template>
  <div>
    <b-list-group>
        <b-list-group-item style="color: white" class="d-flex justify-content-between align-items-center bg-secondary">
            {{ choresObject.task }}
        <b-badge variant="warning" pill>{{ choresObject.typeExperience }} exp</b-badge>
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
