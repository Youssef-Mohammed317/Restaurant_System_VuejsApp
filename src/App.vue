<template>
  <Navbar v-if="$route.name !== 'Login' && $route.name !== 'Signup'" />
  <router-view />
</template>

<script>
import Navbar from "./components/global/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.inputsWidth,
input {
  max-width: 350px;
}
textarea.inputsWidth {
  min-height: 150px !important;
}
.error-message {
  color: rgb(186, 2, 2);
  margin-top: 5px;
}
.user-message {
  text-align: center;
  color: rgb(43, 113, 193);
}
</style>
