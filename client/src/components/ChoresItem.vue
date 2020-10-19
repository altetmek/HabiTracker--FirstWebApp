<template>
  <div>
    <b-list-group>
        <b-list-group-item style="color: white" class="d-flex justify-content-between align-items-center">
            <p class="lightblue">{{ choresObject.task }}</p>
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
