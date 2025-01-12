<template>
  <h1># Delete All Locations #</h1>
  <p class="text-danger">Are You Sure To Delete All Locations</p>
  <p class="text-danger">
    <i>
      /This Will Cause To Delete All Categories And All Items related To This
      Account/
    </i>
  </p>
  <div class="user-message my-3">
    {{ getUserInfo.userMessage }}
  </div>
  <div class="controls">
    <button class="btn btn-danger me-3" @click="delAllLocationsNow()">
      Delete All
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteAllLocations",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
  },
  methods: {
    ...mapActions(["goHome", "goBack", "isUserLoggedIn", "delAllLocations"]),
    async delAllLocationsNow() {
      this.delAllLocations();
    },
  },
};
</script>

<style></style>
