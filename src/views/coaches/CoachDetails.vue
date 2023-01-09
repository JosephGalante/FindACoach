<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button
            link
            :to="contactLink"
            v-if="shouldShowContactButton">
            Contact
          </base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CoachDetails',
  data() {
    return {
      selectedCoach: null,
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
    },
    rate() {
      return this.selectedCoach.hourlyRate
    },
    areas() {
      return this.selectedCoach.areas
    },
    description() {
      return this.selectedCoach.description
    },
    contactLink() {
      return `${this.$route.path}/contact`
    },
    shouldShowContactButton() {
      return this.$route.path !== `/coaches/${this.id}/contact`
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    )
  },
}
</script>

<style></style>
