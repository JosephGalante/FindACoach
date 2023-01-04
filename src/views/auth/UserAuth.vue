<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred"
      @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog
      title="Authenticating..."
      fixed
      :show="isLoading">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form
        action=""
        @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button
          type="button"
          mode="flat"
          @click="switchAuthMode"
          >{{ switchModeButtonCaption }}</base-button
        >
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  name: 'UserAuth',
  data() {
    return {
      email: null,
      password: null,
      formIsValid: false,
      mode: 'Login',
      isLoading: false,
      error: null,
    }
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'Login') {
        return 'Login'
      } else {
        return 'Sign Up'
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'Login') {
        return 'Sign Up instead'
      } else {
        return 'Login instead'
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false
        return
      }
      this.isLoading = true
      try {
        if (this.mode === 'Login') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          })
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          })
        }
      } catch (error) {
        this.error = error.message || 'Failed to authenticate'
      }
      this.isLoading = false
    },
    switchAuthMode() {
      if (this.mode === 'Login') {
        this.mode = 'Sign Up'
      } else {
        this.mode = 'Login'
      }
    },
    handleError() {
      this.error = null
    },
  },
}
</script>

<style scoped lang="css">
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
