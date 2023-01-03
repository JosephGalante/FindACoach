<template>
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
      <p v-if="formIsValid">
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
    submitForm() {
      this.formIsValid = true
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false
        return
      }
      // send request to server...
    },
    switchAuthMode() {
      if (this.mode === 'Login') {
        this.mode = 'Sign Up'
      } else {
        this.mode = 'Login'
      }
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
