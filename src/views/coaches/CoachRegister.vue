<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <CoachForm></CoachForm>
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
}
</script>

<style></style>
