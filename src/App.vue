<template>
  <TheNavbar></TheNavbar>
  <router-view></router-view>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
  },
}
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
