<template>
  <nav>
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'Login' }" @click="isUserLogOut()">
      Logout
    </router-link>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Navbar",
  methods: {
    ...mapActions(["isUserLogOut"]),
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
