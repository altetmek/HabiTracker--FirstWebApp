<template>
  <div>
    <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
            {{ categoryObject.categoryType.typeName }}
        <b-badge variant="primary" pill>{{ categoryObject.categoryType.typeExperience }}exp</b-badge>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: 'user-category-item',
  props: ['categoryObject']
}
</script>
