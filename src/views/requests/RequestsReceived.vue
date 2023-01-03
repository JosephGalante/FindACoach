<template>
  <base-dialog
    :show="!!error"
    title="An error occurred"
    @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <div v-if="isLoading"><base-spinner></base-spinner></div>
      <ul v-else-if="hasRequests && !isLoading">
        <RequestItem
          v-for="req in receivedRequests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message">
        </RequestItem>
      </ul>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue'

export default {
  name: 'RequestsReceived',
  components: {
    RequestItem,
  },
  data() {
    return {
      error: null,
      isLoading: true,
    }
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['requests/requests']
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests']
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true
      try {
        await this.$store.dispatch('requests/fetchRequests')
      } catch (error) {
        this.error = error.message || 'Failed to fetch requests'
      }
      this.isLoading = false
    },
    handleError() {
      this.error = null
    },
  },
  created() {
    this.loadRequests()
  },
}
</script>

<style scoped lang="css">
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
