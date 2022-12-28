<template>
  <base-card>
    <h2>Find your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="toggleFilter" />
      <label for="frontend">Frontend</label>
      <input type="checkbox" id="backend" checked @change="toggleFilter" />
      <label for="backend">Backend</label>
      <input type="checkbox" id="career" checked @change="toggleFilter" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  name: 'CoachFilter',
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    }
  },
  methods: {
    toggleFilter(filter) {
      const filterId = filter.target.id
      const isActive = filter.target.checked
      this.filters = {
        ...this.filters,
        [filterId]: isActive,
      }
      this.$emit('change-filter', this.filters)
    },
  },
}
</script>

<style scoped lang="css">
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
