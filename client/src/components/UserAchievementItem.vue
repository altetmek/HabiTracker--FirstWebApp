<template>
  <div>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
            {{ achievementObject.name }}
        <b-badge variant="primary" pill>{{ achievementObject.experiencePoints }} exp</b-badge>
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
