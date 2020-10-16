<template>
  <div>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
            {{ fitnessObject.task }}
        <b-badge variant="primary" pill>{{ fitnessObject.typeExperience }} exp</b-badge>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'fitness-item',
  props: ['fitnessObject']
}
</script>
