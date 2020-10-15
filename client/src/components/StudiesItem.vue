<template>
  <div>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
            {{ studiesObject.task }}
        <b-badge variant="primary" pill>{{ studiesObject.typeExperience }} exp</b-badge>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'studies-item',
  props: ['studiesObject']
}
</script>
