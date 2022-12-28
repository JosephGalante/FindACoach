<template>
  <section>
    <coach-filter @change-filter="setFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register</base-button>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :areas="coach.areas"
          :rate="coach.hourlyRate"
        ></CoachItem>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '@/components/coaches/CoachItem.vue'
import CoachFilter from '@/components/coaches/CoachFilter.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

export default {
  name: 'CoachesList',
  components: {
    CoachItem,
    BaseButton,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    }
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      const filterKeys = ['frontend', 'backend', 'career']
      return coaches.filter((coach) => {
        return filterKeys.some((key) => {
          return this.activeFilters[key] && coach.areas.includes(key)
        })
      })
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches']
    },
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters
    },
  },
}
</script>

<style scoped lang="css">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
