<template>
  <div class="container">
    <h1># Delete Location #</h1>
    <p class="text-danger">Ara You Sure To Delete This Location?</p>
    <p class="text-danger">
      <i
        >/ This Will Cause To Delete All Related Categories And Items Related To
        This Location /</i
      >
    </p>
    <div>
      <p>Name: {{ locInfo.name }}</p>
      <p>Address: {{ locInfo.address }}</p>
      <p>Phone: {{ locInfo.phone }}</p>
    </div>
    <button class="btn btn-danger me-3" @click="deleteLocation(locId)">
      Delete Now
    </button>

    <button class="btn btn-link me-3" type="button" @click="goBack()">
      Cancel
    </button>
  </div>
  <div class="user-message">
    {{ getUserInfo.userMessage }}
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "DeleteLocation",
  data() {
    return {
      locId: this.$route.params.locationId,
    };
  },
  setup() {},
  computed: {
    ...mapGetters(["getUserInfo"]),
    ...mapState(["locInfo"]),
  },
  mounted() {
    this.isUserLoggedIn();
    this.canUserAccessThisLocation(this.locId);
    this.setLocInfo(this.locId);
  },
  methods: {
    ...mapActions([
      "isUserLoggedIn",
      "goHome",
      "canUserAccessThisLocation",
      "deleteLocation",
      "setLocInfo",
      "goBack",
    ]),
  },
};
</script>

<style></style>
