<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData"></CoachForm>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue'

export default {
  name: 'RegisterCoach',
  components: {
    CoachForm,
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    },
  },
  methods: {
    saveData(coachData) {
      this.$store.dispatch('coaches/registerCoach', coachData)
      this.$router.push('/coaches')
    },
  },
}
</script>

<style></style>
