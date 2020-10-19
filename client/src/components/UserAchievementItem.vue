<template>
  <div>
    <b-list-group>
        <b-list-group-item style="color: white" class="d-flex justify-content-between align-items-center bg-secondary">
            {{ achievementObject.name }}
        <b-badge variant="warning" pill>{{ achievementObject.experiencePoints }} exp</b-badge>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'user-achievement-item',
  props: ['achievementObject']
}
</script>
