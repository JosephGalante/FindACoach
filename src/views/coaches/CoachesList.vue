<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred"
      @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button
            mode="outline"
            @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button
            v-if="!isCoach && !isLoading"
            link
            to="/register"
            >Register</base-button
          >
        </div>
        <div v-if="isLoading"><base-spinner></base-spinner></div>
        <ul v-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"></CoachItem>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
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
      error: null,
      isLoading: true,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    }
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true
        }
        return false
      })
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    },
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          foreRefresh: refresh,
        })
      } catch (error) {
        this.error = error.message || 'Something went wrong'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    },
  },
  created() {
    this.loadCoaches()
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
